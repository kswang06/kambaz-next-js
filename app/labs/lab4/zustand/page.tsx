"use client";

import ZustandTodoList from "./todos/ZustandTodoList";
import ZustandCounter from "./counter";

export default function ZustandExamples() {
  return (
    <div>
      <h1>Zustand Examples</h1>
      <ZustandCounter />
      <ZustandTodoList />
    </div>
  );
}
