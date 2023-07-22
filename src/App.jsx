import { useState } from 'react';
import './App.css';
import Document from './Document';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import { draftDocs, finishedDocs } from './data.js';
const draft = draftDocs;
const finished = finishedDocs;

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [draftDocs, setDraftDocs] = useState(draft);
  const [finishedDocs, setFinishedDocs] = useState(finished);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAllDocsOpen, setIsAllDocsOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <main>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        draftDocs={draftDocs}
        finishedDocs={finishedDocs}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      />

      <div className="main-container">
        <Header />
        <Document document={selectedDoc} />
      </div>
    </main>
  );
}
