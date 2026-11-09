export const depositMONEY = (money)=>{
  return{
    type :'DEPOSIT',
    payload : money
  }
}

export const withdrawlMONEY = (money)=>{
  return{
    type :'WITHDRAWL',
    payload : money
  }
}
