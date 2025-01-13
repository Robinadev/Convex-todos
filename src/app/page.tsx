"use client";

import { NewToDoForm } from "./_components/new-todo-form";
import { useState } from "react";

type ToDoItem = {
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { title: "Example", description: "This is an example", completed: false },
  ]);

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800">To-Do List</h1>
      <div className="grid gap-4">
        {todos.map(({ title, description, completed }, index) => (
          <ToDoItem
            key={index}
            title={title}
            description={description}
            completed={completed}
            onCompleteChanged={(newValue) => {
              setTodos((prev) => {
                const newTodos = [...prev];
                newTodos[index].completed = newValue;
                return newTodos;
              });
            }}
            onRemove={() => {
              setTodos((prev) => {
                const newTodos = [...prev].filter((_, i) => i !== index);
                return newTodos;
              });
            }}
          />
        ))}
      </div>

      <div className="p-4 bg-white rounded-lg shadow-md">
        <NewToDoForm
          onCreate={(title, description) => {
            setTodos((prev) => {
              const newTodos = [...prev];
              newTodos.push({ title, description, completed: false });
              return newTodos;
            });
          }}
        />
      </div>
    </div>
  );
}

function ToDoItem({
  title,
  description,
  completed,
  onCompleteChanged,
  onRemove,
}: {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChanged(e.target.checked)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400"
      />
      <div className="flex-1">
        <p className={`font-semibold ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        type="button"
        className="text-red-500 hover:text-red-700"
        onClick={() => onRemove()}
      >
        Remove
      </button>
    </div>
  );
}