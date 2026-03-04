"use client";

import { ListGroup } from "react-bootstrap";
import { useTodos } from "./context";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function ReactContextTodoList() {
  const { todos } = useTodos()!;

  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
