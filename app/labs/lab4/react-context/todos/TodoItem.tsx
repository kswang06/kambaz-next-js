"use client";

import { Button, ListGroupItem } from "react-bootstrap";
import { Todo, useTodos } from "./context";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { deleteTodo, setTodo } = useTodos()!;

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
