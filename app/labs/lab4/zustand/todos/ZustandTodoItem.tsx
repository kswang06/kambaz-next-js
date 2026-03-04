/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoItem({ todo }: { todo: any }) {
  const deleteTodo = useTodoStore((state) => (state as any).deleteTodo);
  const setTodo = useTodoStore((state) => (state as any).setTodo);

  return (
    <ListGroupItem>
      <Button
        onClick={() => deleteTodo(todo.id)}
        id="wd-delete-todo-click"
        variant="danger"
        className="me-2"
      >
        Delete
      </Button>

      <Button
        onClick={() => setTodo(todo)}
        id="wd-set-todo-click"
        className="me-2"
      >
        Edit
      </Button>

      {todo.title}
    </ListGroupItem>
  );
}
