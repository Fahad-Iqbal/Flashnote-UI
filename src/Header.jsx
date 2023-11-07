import React from 'react';
import { useGlobalContext } from './context';
import logout from './utils/logout';

const Header = () => {
  const { setUser, user } = useGlobalContext();
  return (
    // <!-- Header section -->
    <header className="header">
      {/* <!-- Flashnote Logo --> */}
      <div className="logo-container">
        <img
          className="logo-icon"
          src="https://res.cloudinary.com/drbpsxnln/image/upload/v1675047201/Icon_rkfp37.png"
          alt="icon"
        />
        <div className="logo-text-container">
          <div className="logo-text">
            Flash<span>N</span>ote
          </div>
        </div>
      </div>
      {/* <!-- Log Out Button --> */}
      <button
        className="log-out"
        onClick={async () => {
          await logout(setUser, user.token);
        }}
      >
        Log out
      </button>
    </header>
  );
};

export default React.memo(Header);
