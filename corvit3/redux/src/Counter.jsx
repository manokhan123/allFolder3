import { useReducer } from "react";

// ye code yaho0baba ka hai useReducer topic
// aur iss counter.jsx ka sir k redux sy iska  koi taaluq nahi hai 

function Counter() {
  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      case "reset":
        return { count: 0 };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>Count : {state.count}</h2>

      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

export default Counter;
