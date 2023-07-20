import { useState } from 'react';
import './App.css';
import Document from './Document';
import Header from './Header';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <main>
      <Sidebar2
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="main-container">
        <Header />
        <Document />
      </div>
    </main>
  );
}
