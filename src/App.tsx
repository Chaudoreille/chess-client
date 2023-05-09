import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/pages/Layout/Layout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path='' element="Hello world"/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
