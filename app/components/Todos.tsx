"use client";

import { useEffect, useState } from "react";
import { Trash, CheckCircle, Circle } from "lucide-react";
import AddTodo from "./AddTodo";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos"); // Adjust API route as needed
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT", // Changed to PUT method
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Your Todos</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos found.</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-3 bg-gray-100 rounded-lg flex items-center justify-between hover:bg-gray-200 transition-all"
            >
              <button onClick={() => toggleTodo(todo.id, todo.completed)}>
                {todo.completed ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <Circle className="text-gray-500 w-6 h-6" />
                )}
              </button>

              <p className="text-gray-700">{todo.title}</p>

              <button className="text-red-500" onClick={() => deleteTodo(todo.id)}>
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AddTodo addTodo={addTodo} />
    </div>
  );
}
