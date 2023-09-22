import { useGlobalContext } from '../context';

const HamburgerButton = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext();
  return (
    <button
      className={isSidebarOpen ? 'hamburger-button close' : 'hamburger-button'}
      onClick={() => {
        setIsSidebarOpen((current) => !current);
      }}
    >
      <div className="hamburger-button__top"></div>
      <div className="hamburger-button__middle"></div>
      <div className="hamburger-button__bottom"></div>
    </button>
  );
};

export default HamburgerButton;
