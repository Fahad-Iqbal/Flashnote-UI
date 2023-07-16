import { useState } from 'react';
import './App.css';
import Document from './Document';
import Header from './Header';
import Navbar from './Navbar';

export default function App() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  return (
    <main>
      <Navbar
        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
      />

      <div className="document-area">
        <Header />
        <Document
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
        />
      </div>
    </main>
  );
}
