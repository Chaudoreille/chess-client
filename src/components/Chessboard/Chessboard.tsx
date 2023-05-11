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

class Piece {
  color: string;
  type: PieceType;
  moves: number[];

  constructor(color:string, type:PieceType, legalMoves:number[]) {
    this.color = color;
    this.type = type;
    this.moves = legalMoves;
  }
}

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
  const column: string = String.fromCharCode(aCode + (index % 8));
  const row: number = 7 - Math.floor(index / 8) + 1;

  return `${column}${row}`;
}

const startingBoard = (): Array<Piece|undefined> => {
  const board = Array<Piece|undefined>(64).fill(undefined);
  const pawnRow = Array<PieceType>(8).fill(PieceType.pawn);
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

  const insertRow = (board: Array<Piece|undefined>, row: PieceType[], color:Color, start:number) => {
    board.splice(start, row.length, ...row.map(type => new Piece(color, type, [])));
  };

  insertRow(board, backRow, Color.black, 0);
  insertRow(board, pawnRow, Color.black, 8);
  insertRow(board, pawnRow, Color.white, 48);
  insertRow(board, backRow, Color.white, 56);
  return board;
}

export const Chessboard = () => {
  const [squares, setSquares] = useState(startingBoard());
  const [selectedPieceIndex, setSelectedPieceIndex] = useState(-1);

  const handleClick = (event: Event) => {
    const target = event.currentTarget;

    if (target instanceof Element && target.hasAttribute("data-index")) {
      const targetIndex = Number(target.getAttribute("data-index"));

      console.log(selectedPieceIndex, algabreicNotation(selectedPieceIndex));
      console.log(targetIndex, algabreicNotation(targetIndex));
      console.log(squares)
      console.log(squares.length)

      if (selectedPieceIndex === -1) {
        if (squares[targetIndex] instanceof Piece) {
          setSelectedPieceIndex(targetIndex);
        } else {
          setSelectedPieceIndex(-1);
        }
        return;
      }

      movePiece(selectedPieceIndex, targetIndex);
      setSelectedPieceIndex(-1);
      return
    }
  }

  const movePiece = (origin:number, destination:number) => {
    setSquares(old => {
      const update = [...old];
      update[destination] = update[origin];
      update[origin] = undefined;

      return update;
    })
  }

  return (
    <div className='Chessboard'>
      {squares.map((piece, index) => (
        <div key={algabreicNotation(index)} className={`square ${squareColor(index)}`} data-index={index} onClick={handleClick}>
          {piece && <div className={`piece ${piece.color} ${PieceType[piece.type]}`}></div> }
        </div>
      ))}
    </div>
  )
}
