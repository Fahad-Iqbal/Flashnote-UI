import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  return (
    // <!-- Side Nav -->
    <nav class="side-nav">
      <button className="hamburger">
        <GiHamburgerMenu />
      </button>
      {/* <!-- Side Bar Contents --> */}
      <div class="side-nav__contents">
        {/* <!-- Top part of side bar --> */}
        <div class="side-nav__contents--top">
          {/* <!-- User Section --> */}
          <div class="user">
            <div class="user-name__user-icon__container">
              <img
                class="user-icon"
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_aibzke.svg"
                alt="User"
              />
              <div class="user-name">
                <p>fahad_i</p>
              </div>
            </div>
            <img
              class="user-options-icon"
              src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048304/Vector_5_xa7gd4.svg"
              alt="Ellipsis"
            />
          </div>

          {/* <!-- Search Section --> */}
          <div class="search">
            <button class="search-button">
              <img
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675048711/Vector_6_fpgans.svg"
                alt="Search Logo"
                class="search-icon"
              />
              <p>Search</p>
            </button>
          </div>
          <div class="documents-section">
            {/* <!-- Practice Flashcards Button --> */}
            <a href="image-card-front.html" class="practice primary-button">
              <img
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_1_ibhk9b.svg"
                alt="Flashcards"
              />
              <p>
                Practice <span>F</span>lashcards
              </p>
            </a>

            {/* <!-- All Documents Button --> */}
            <button class=".all-documents secondary-button">
              <img
                src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_2_yvljzo.svg"
                alt="Documents logo"
              />
              <p>All Documents</p>
            </button>
            <div class="draft-finished-container">
              {/* <!-- Draft --> */}
              <div class="docs-dropdown-section">
                {/* <!-- Draft Button --> */}
                <label class="docs-dropdown-button">
                  <input type="checkbox" />
                  <img
                    src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
                    alt="Caret symbol"
                  />
                  <p>Draft</p>
                </label>
                {/* <!-- Draft Documents Dropdown Section --> */}
                <div class="draft-docs docs">
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Chemistry</p>
                  </a>
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Spanish 101</p>
                  </a>
                  <a href="#" class="docs--links selected">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>General Biology</p>
                  </a>
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Psy 101</p>
                  </a>
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document Icon"
                    />
                    <p>Anatomy</p>
                  </a>
                </div>
              </div>
              {/* <!-- Finished --> */}
              <div class="docs-dropdown-section">
                {/* <!-- Finished Documents Button --> */}
                <label class="docs-dropdown-button">
                  <input type="checkbox" />
                  <img
                    src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047823/Vector_3_drymhl.svg"
                    alt="Caret symbol"
                  />
                  <p>Finished</p>
                </label>
                {/* <!-- Finished Documents Dropdown Menu --> */}
                <div class="docs">
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>Calc 1</p>
                  </a>
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>World Geography</p>
                  </a>
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>Linear algebra</p>
                  </a>
                  <a href="#" class="docs--links">
                    <img
                      src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675123118/Vector_7_lk07mc.svg"
                      alt="Document icon"
                    />
                    <p>Essay Project</p>
                  </a>
                  <a href="#" class="docs--links">
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
        <div class="side-nav__contents--bottom">
          {/* <!-- Dark mode Checkbox --> */}

          <label class="docs-dropdown-button darkmode">
            <input type="checkbox" />
          </label>

          {/* <!-- Create Button --> */}
          <button class="create primary-button">
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

export default Navbar;
