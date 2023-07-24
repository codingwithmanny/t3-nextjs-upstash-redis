// Imports
// ========================================================
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';

// Layout
// ========================================================
const MainLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
};

// Exports
// ========================================================
export default MainLayout;