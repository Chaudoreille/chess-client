import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/pages/Layout/Layout'
import { Chessboard } from './components/Chessboard/Chessboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path='' element={<Chessboard/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
