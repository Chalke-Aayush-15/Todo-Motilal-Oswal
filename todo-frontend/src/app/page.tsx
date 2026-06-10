"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "Build Next.js Todo App",
      completed: false,
    },
  ]);

  const addTodo = () => {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedTasks = todos.filter((todo) => todo.completed).length;

  return (
    <>
      <main className="container">
        <div className="todo-card">
          <div className="header">
            <h1>📝 Todo App</h1>
            <p>Stay organized and productive</p>
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />

            <button onClick={addTodo}>Add</button>
          </div>

          <div className="stats">
            <span>Total: {todos.length}</span>
            <span>Completed: {completedTasks}</span>
          </div>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />

                  <span
                    className={
                      todo.completed ? "completed task-text" : "task-text"
                    }
                  >
                    {todo.text}
                  </span>
                </label>

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
