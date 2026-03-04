"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Todo = { id: string; title: string };

interface TodosContextState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" });

  const addTodo = (todo: Todo) => {
    const newTodos = [
      ...todos,
      { ...todo, id: new Date().getTime().toString() },
    ];
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
    if (todo.id === id) setTodo({ id: "-1", title: "" });
  };

  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    setTodo({ id: "-1", title: "" });
  };

  const value: TodosContextState = {
    todos,
    todo,
    setTodo,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};
