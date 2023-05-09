// import React from 'react'
import './Chessboard.css'

function darkSquare(index: number): boolean {
  const evenRow = Math.floor(index / 8) % 2 === 0;
  const evenColumn = index % 2 === 0;
  return (evenRow && !evenColumn) || (!evenRow && evenColumn);
}

export const Chessboard = () => {
  const squares = Array<string>(64).fill("");

  return (
    <div className='Chessboard'>
      {squares.map((piece, index) => (
        <div key={`f${index}`} className={`square ${darkSquare(index) ? "dark" : "light"} ${piece}`}></div>
      ))}
    </div>
  )
}
