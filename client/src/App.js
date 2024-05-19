
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Chats from './Pages/Chats';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
