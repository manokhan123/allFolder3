import React from 'react'
import  {useDispatch} from 'react-redux'
import { actionCREATOR } from '../actions/actionCREATOR'

const Shop = () => {
  let dispatch = useDispatch()
  return (
   <>
   <div className="main">
    <button  onClick={()=> dispatch(actionCREATOR.depositMONEY(500))} >+</button>
    <h1>DEPOSIT / WITHDRAWL MONEY</h1>
    <button  onClick={()=> dispatch(actionCREATOR.withdrawlMONEY(100))} >-</button>
   </div>
   </>
  )
}

export default Shop
