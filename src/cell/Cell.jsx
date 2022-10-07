import React from 'react'
import "./cell.scss"
const REC_AREA= 100


function Cell({isAlive}) {
  return (
    <div className={`single-cell ${isAlive && "alive"}`}>
    </div>
  )
}

export default React.memo(Cell)