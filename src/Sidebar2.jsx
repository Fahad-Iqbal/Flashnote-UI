import React, { useState } from 'react';

const Sidebar2 = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside className="sidebar-container">
      <button
        className="open-navigation"
        onClick={(e) => {
          setIsSidebarOpen((current) => !current);
        }}
      >
        <span>O</span>
        <span>p</span>
        <span>e</span>
        <span>n</span>
      </button>

      <nav className={isSidebarOpen ? 'sidebar' : 'sidebar close'}>
        <div className="sidebar-top">
          <button className="user btn">
            <img
              className="user-icon"
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_aibzke.svg"
              alt="User"
            />
            <p>fahad_i</p>
            <img
              className="user-options-icon"
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048304/Vector_5_xa7gd4.svg"
              alt="Ellipsis"
            />
          </button>
          <button className="search btn">
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048711/Vector_6_fpgans.svg"
              alt="Search Logo"
              className="search-icon"
            />
            <p>Search</p>
          </button>
          <button className="practice-flashcards btn">
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_1_ibhk9b.svg"
              alt="Flashcards"
            />
            <p>
              Practice <span>F</span>lashcards
            </p>
          </button>
          <button className="all btn">
            {' '}
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_2_yvljzo.svg"
              alt="Documents logo"
            />
            <p>All Documents</p>
          </button>
          <button className="draft btn">
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
              alt="Caret symbol"
            />
            <p>Draft</p>
          </button>
          <button className="finished btn">
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
              alt="Caret symbol"
            />
            <p>Finished</p>
          </button>
        </div>
        <div className="sidebar-bottom">
          <button
            className="darkmode btn"
            onClick={() => {
              const HTMLElement = document.querySelector('html');
              HTMLElement.classList.toggle('darkmode');
            }}
          >
            Dark mode
          </button>
          <button className="create btn">
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_4_hzjlkw.svg"
              alt="Plus Icon"
            />
            <p>
              <span>C</span>reate
            </p>
          </button>
        </div>
      </nav>
    </aside>
  );
  // <!-- Side Nav -->
};

export default Sidebar2;
