import React from 'react'
import { useSelector } from 'react-redux'
const Nav = () => {
  let amount = useSelector(hamza => hamza.amount)
  return (
    <>
    <nav>
      <h1>STATE BANK OF MANO</h1>
      <button>Balance : {amount}$</button>
    </nav>
    </>
  )
}

export default Nav
