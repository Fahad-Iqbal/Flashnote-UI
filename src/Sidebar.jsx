import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    // <!-- Side Nav -->
    <nav className={isSidebarOpen ? 'sidebar' : 'sidebar close'}>
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="hamburger-button"
      >
        ✖
      </button>

      {/* <!-- Side Bar Contents --> */}
      <div className="sidebar__contents">
        {/* <!-- Top part of side bar --> */}
        <div className="sidebar__contents--top">
          {/* <!-- User Section --> */}
          <div className="user">
            <div className="user-name__user-icon__container">
              <img
                className="user-icon"
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_aibzke.svg"
                alt="User"
              />
              <div className="user-name">
                <p>fahad_i</p>
              </div>
            </div>
            <img
              className="user-options-icon"
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048304/Vector_5_xa7gd4.svg"
              alt="Ellipsis"
            />
          </div>

          {/* <!-- Search Section --> */}
          <div className="search">
            <button className="search-button">
              <img
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048711/Vector_6_fpgans.svg"
                alt="Search Logo"
                className="search-icon"
              />
              <p>Search</p>
            </button>
          </div>
          <div className="documents-section">
            {/* <!-- Practice Flashcards Button --> */}
            <a href="image-card-front.html" className="practice primary-button">
              <img
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_1_ibhk9b.svg"
                alt="Flashcards"
              />
              <p>
                Practice <span>F</span>lashcards
              </p>
            </a>

            {/* <!-- All Documents Button --> */}
            <button className=".all-documents secondary-button">
              <img
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_2_yvljzo.svg"
                alt="Documents logo"
              />
              <p>All Documents</p>
            </button>
            <div className="draft-finished-container">
              {/* <!-- Draft --> */}
              <div className="docs-dropdown-section">
                {/* <!-- Draft Button --> */}
                <label className="docs-dropdown-button">
                  <input type="checkbox" />
                  <img
                    src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
                    alt="Caret symbol"
                  />
                  <p>Draft</p>
                </label>
                {/* <!-- Draft Documents Dropdown Section --> */}
                <div className="draft-docs docs">
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Chemistry</p>
                  </a>
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Spanish 101</p>
                  </a>
                  <a href="#" className="docs--links selected">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>General Biology</p>
                  </a>
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Psy 101</p>
                  </a>
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Anatomy</p>
                  </a>
                </div>
              </div>
              {/* <!-- Finished --> */}
              <div className="docs-dropdown-section">
                {/* <!-- Finished Documents Button --> */}
                <label className="docs-dropdown-button">
                  <input type="checkbox" />
                  <img
                    src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
                    alt="Caret symbol"
                  />
                  <p>Finished</p>
                </label>
                {/* <!-- Finished Documents Dropdown Menu --> */}
                <div className="docs">
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>Calc 1</p>
                  </a>
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>World Geography</p>
                  </a>
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>Linear algebra</p>
                  </a>
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>Essay Project</p>
                  </a>
                  <a href="#" className="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>Final project ideas</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Bottom Part of side bar --> */}
        <div className="sidebar__contents--bottom">
          {/* <!-- Dark mode Checkbox --> */}

          <label className="docs-dropdown-button darkmode">
            <input type="checkbox" />
          </label>

          {/* <!-- Create Button --> */}
          <button className="create primary-button">
            <img
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_4_hzjlkw.svg"
              alt="Plus Icon"
            />
            <p>
              <span>C</span>reate
            </p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
