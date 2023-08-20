import './App.css';
import Home from './Home';
import Login from './Login';
import Landing from './Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  else return null;
};

export default function App() {
  const [user, setUser] = useState(getUserFromLocalStorage());
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
        <Route path="landing" element={<Landing user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}
