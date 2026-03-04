"use client";

import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./context";

export default function TodoForm() {
  const { todo, setTodo, addTodo, updateTodo } = useTodos()!;

  return (
    <ListGroupItem>
      <Button
        onClick={() => addTodo(todo)}
        id="wd-add-todo-click"
        className="me-2"
        disabled={!todo.title.trim()}
      >
        Add
      </Button>

      <Button
        onClick={() => updateTodo(todo)}
        id="wd-update-todo-click"
        className="me-2"
        disabled={todo.id === "-1" || !todo.title.trim()}
      >
        Update
      </Button>

      <FormControl
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
    </ListGroupItem>
  );
}
