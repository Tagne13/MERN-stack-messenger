import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Chatpage from './pages/chatpage';

function App() {
  return (
    <div className="App">
      <Route path='/' element={Homepage} exact />
      <Route path='/chats' element={Chatpage} />
    </div>
  );
}

export default App;