import './App.css';
import Home from './Home';
import Login from './Login';
import Landing from './Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  // const [user, setUser] = useState(getUserFromLocalStorage());
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="landing" element={<Landing />} />
        <Route path="*" element={<h1>Page not found...</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
