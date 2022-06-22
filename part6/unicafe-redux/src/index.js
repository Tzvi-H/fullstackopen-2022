import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const dispatchTypeOf = (type) => () => store.dispatch({ type });

  const { good, ok, bad } = store.getState();

  return (
    <div>
      <button onClick={dispatchTypeOf("GOOD")}>good</button>
      <button onClick={dispatchTypeOf("OK")}>ok</button>
      <button onClick={dispatchTypeOf("BAD")}>bad</button>
      <button onClick={dispatchTypeOf("ZERO")}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
