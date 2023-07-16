import React from 'react';

const Header = () => {
  return (
    // <!-- Header section -->
    <header class="header">
      {/* <!-- Flashnote Logo --> */}
      <div class="logo-container">
        <img
          class="logo-icon"
          src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047201/Icon_rkfp37.png"
          alt="icon"
        />
        <div class="logo-text-container">
          <div class="logo-text">
            Flash<span>N</span>ote
          </div>
        </div>
      </div>
      {/* <!-- Log Out Button --> */}
      <button class="log-out">Log out</button>
    </header>
  );
};

export default Header;
