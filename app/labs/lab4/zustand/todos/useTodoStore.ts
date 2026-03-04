/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useTodoStore = create((set, get) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "" },

  setTodo: (todo: any) => set({ todo }),

  addTodo: () =>
    set((state: any) => ({
      todos: [
        ...state.todos,
        { ...state.todo, id: new Date().getTime().toString() },
      ],
      todo: { id: "-1", title: "" },
    })),

  updateTodo: () =>
    set((state: any) => ({
      todos: state.todos.map((t: any) =>
        t.id === state.todo.id ? state.todo : t
      ),
      todo: { id: "-1", title: "" },
    })),

  deleteTodo: (id: string) =>
    set((state: any) => ({
      todos: state.todos.filter((t: any) => t.id !== id),
    })),
}));