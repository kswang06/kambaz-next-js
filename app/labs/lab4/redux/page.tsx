"use client";

import { Provider } from "react-redux";
import store from "../store";
import HelloRedux from "./hello/index";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux/index";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <div>
        <h3>Redux Examples</h3>
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
        <TodoList />
      </div>
    </Provider>
  );
}
