"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";

interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const userId = user?.id;

  useEffect(() => {
  if (userId) {
    fetchTodos();
  }
}, [userId]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:5156/api/Todo/user/${userId}`
      );

      const data = await response.json();

      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5156/api/users/${userId}/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      );

      if (response.ok) {
        setNewTodo({
          title: "",
          description: "",
        });

        fetchTodos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:5156/api/Todo/${id}`, {
        method: "DELETE",
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (todo: Todo) => {
    try {
      await fetch(`http://localhost:5156/api/Todo/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          isCompleted: !todo.isCompleted,
        }),
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <p>Stay organized and productive.</p>
      </div>

      {/* CREATE TODO */}

      <div className="create-card">
        <h2>Create Todo</h2>

        <form onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Todo Title"
            value={newTodo.title}
            onChange={(e) =>
              setNewTodo({
                ...newTodo,
                title: e.target.value,
              })
            }
            required
          />

          <textarea
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({
                ...newTodo,
                description: e.target.value,
              })
            }
            required
          />

          <button type="submit" className="primary-btn">
            Add Todo
          </button>
        </form>
      </div>

      {/* TODO LIST */}

      <div className="todo-grid">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-card ${
              todo.isCompleted ? "completed-card" : ""
            }`}
          >
            <h3>{todo.title}</h3>

            <p>{todo.description}</p>

            <div className="status">
              {todo.isCompleted ? "Completed" : "Pending"}
            </div>

            <div className="actions">
              <button
                className="complete-btn"
                onClick={() => toggleComplete(todo)}
              >
                {todo.isCompleted
                  ? "Mark Pending"
                  : "Mark Complete"}
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}