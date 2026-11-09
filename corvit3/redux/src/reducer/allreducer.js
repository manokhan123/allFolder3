import { combineReducers } from "redux";
import amountReducer from "./amountreducer";

const allreducer = combineReducers({
  amount: amountReducer,
});

export default allreducer;
