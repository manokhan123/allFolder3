let istate = 1000

const amountReducer  = (state = istate ,action)=>{
  if(action.type == 'DEPOSIT'){
    return state + action.payload
  }
  else if(action.type =='WITHDRAWL'){
    return state - action.payload
  }
else{
  return state
}

}
export default amountReducer
