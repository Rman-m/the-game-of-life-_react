import React from 'react'
import "./cell.scss"
const REC_AREA= 100


function Cell({isAlive}) {
  console.log(isAlive)
  return (
    <div className={`single-cell ${isAlive && "alive"}`}>
    </div>
  )
}

export default Cell