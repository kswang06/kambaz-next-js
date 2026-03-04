/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoForm() {
  const todo = useTodoStore((state) => (state as any).todo);
  const setTodo = useTodoStore((state) => (state as any).setTodo);
  const addTodo = useTodoStore((state) => (state as any).addTodo);
  const updateTodo = useTodoStore((state) => (state as any).updateTodo);

  return (
    <ListGroupItem>
      <Button
        onClick={addTodo}
        id="wd-add-todo-click"
        className="me-2"
        disabled={!todo.title?.trim()}
      >
        Add
      </Button>

      <Button
        onClick={updateTodo}
        id="wd-update-todo-click"
        className="me-2"
        disabled={todo.id === "-1" || !todo.title?.trim()}
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
