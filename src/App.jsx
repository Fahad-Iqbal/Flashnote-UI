import { useState } from 'react';
import './App.css';
import Document from './Document';
import Header from './Header';
import Sidebar from './Sidebar';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <main>
      <Sidebar
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
