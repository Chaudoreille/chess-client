import { useState} from 'react'
import './Chessboard.css'

enum PieceType {
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn
}

type Piece = {
  color: string,
  type: PieceType,
  moves: number[]
} | undefined;

enum Color {
  white= "white",
  black= "black",
}

function squareColor(index: number): string {
  const evenRow: boolean = (Math.floor(index / 8) % 2) === 0;
  const evenColumn: boolean = index % 2 === 0;
  const isDark: boolean = (evenRow && !evenColumn) || (!evenRow && evenColumn)

  return isDark ? "dark" : "light";
}

function algabreicNotation(index: number): string {
  const aCode = 97;
  const column: string = String.fromCharCode(aCode + 7 - Math.floor(index / 8));
  const row: number = (index % 8) + 1;

  return `${column}${row}`;
}

const startingBoard = (): Piece[] => {
  const board = Array<Piece>(64).fill(undefined);
  const insertRow = (board: Piece[], row: PieceType[], color:Color, start:number) => {
    board.splice(start, row.length, ...row.map(type => ({
      color,
      type,
      moves: []
    })))
  };
  const backRow = [
    PieceType.rook,
    PieceType.knight,
    PieceType.bishop,
    PieceType.queen,
    PieceType.king,
    PieceType.bishop,
    PieceType.knight,
    PieceType.rook
  ];
  const pawnRow = Array<PieceType>(8).fill(PieceType.pawn);
  insertRow(board, backRow, Color.black, 0);
  insertRow(board, pawnRow, Color.black, 8);
  insertRow(board, pawnRow, Color.white, 48);
  insertRow(board, backRow, Color.white, 56);
  return board;
}

export const Chessboard = () => {
  const [squares, setSquares] = useState(startingBoard());

  return (
    <div className='Chessboard'>
      {squares.map((piece, index) => (
        <div key={algabreicNotation(index)} className={`square ${squareColor(index)} ${algabreicNotation(index)}`}>
          {piece && <div className={`piece ${piece.color} ${PieceType[piece.type]}`}></div> }
        </div>
      ))}
    </div>
  )
}
