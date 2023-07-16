import './App.css';
import Document from './Document';
import Header from './Header';
import Navbar from './Navbar';

export default function App() {
  return (
    <main>
      <Navbar />

      <div className="document-area">
        <Header />
        <Document />
      </div>
    </main>
  );
}
