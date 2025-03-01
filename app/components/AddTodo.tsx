"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddTodo({ addTodo }: { addTodo: (title: string) => void }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Add a New Task</h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all duration-300"
          onClick={handleAdd}
        >
          <PlusCircle size={20} />
          Add
        </button>
      </div>
    </div>
  );
}
