/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ListGroup } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";
import ZustandTodoForm from "./ZustandTodoForm";
import ZustandTodoItem from "./ZustandTodoItem";

export default function ZustandTodoList() {
  const todos = useTodoStore((state) => (state as any).todos);

  return (
    <div id="wd-zustand-todo-list" className="w-50">
      <h2>Zustand Todo List</h2>

      <ListGroup>
        <ZustandTodoForm />
        {todos.map((t: any) => (
          <ZustandTodoItem key={t.id} todo={t} />
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
