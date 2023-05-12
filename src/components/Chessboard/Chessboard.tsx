import { useState, MouseEvent} from 'react'
import './Chessboard.css'

enum PieceType {
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn
}

enum Color {
  white= "white",
  black= "black",
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

  toString() {
    return `${this.color[0]}${PieceType[this.type][0]}`;
  }
}

class Square {
  piece: Piece | null;

  constructor(piece:Piece | null = null) {
    this.piece = piece;
  }

  isEmpty() {
    return this.piece === null;
  }

  empty() {
    const removed = this.piece;
    this.piece = null;
    return removed;
  }
  toString() {
    return this.piece?.toString() || "-";
  }
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

const startingBoard = (): Square[] => {
  const board = Array(64).fill(0).map(() => new Square());
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

  const insertRow = (board: Square[], row: PieceType[], color:Color, start:number) => {
    row.forEach((type, index) => {
      board[start + index].piece = new Piece(color, type, [])
    });
  };

  insertRow(board, backRow, Color.black, 0);
  insertRow(board, pawnRow, Color.black, 8);
  insertRow(board, pawnRow, Color.white, 48);
  insertRow(board, backRow, Color.white, 56);

  return board;
}

export const Chessboard = () => {
  const [squares, setSquares] = useState(startingBoard());
  const [selectedPieceIndex, setSelectedPieceIndex] = useState(-1); // selectedPieceIndex is -1 if no piece is currently selected.
  const movePiece = (originIndex:number, destinationIndex:number) => {
    const update = [...squares];
    const movedPiece  = update[originIndex].empty();
    update[destinationIndex].piece = movedPiece;

    setSquares(update);
  }

  const handleSquareClicked = (event: MouseEvent<HTMLElement>) => {
    const indexAttribute = event?.currentTarget?.dataset?.index;
    if (typeof indexAttribute !== "string") {
      throw new Error(`${event.currentTarget} does not have an index property`);
    }

    const targetIndex = Number(indexAttribute);

    if (targetIndex < 0 || targetIndex >= squares.length) {
      throw new Error(`${targetIndex} is not a valid square index`);
    } else {
      if (selectedPieceIndex === -1) { // no piece selected
        if (!squares[targetIndex].isEmpty()) { 
          setSelectedPieceIndex(targetIndex);
        }
        return;
      } else { // a piece is selected
        movePiece(selectedPieceIndex, targetIndex);
        setSelectedPieceIndex(-1);
      }
    }
  }

  return (
    <div className='Chessboard'>
      {squares.map((square, index) => (
        <div key={algabreicNotation(index)} className={`square ${squareColor(index)}`} data-index={index} onClick={handleSquareClicked}>
          {square.piece !== null && <div className={`piece ${square.piece.color} ${PieceType[square.piece.type]}`}></div> }
        </div>
      ))}
    </div>
  )
}
