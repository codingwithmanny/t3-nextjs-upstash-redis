// Imports
// ========================================================
import { createBrowserRouter, RouterProvider as BrowserProvider, createRoutesFromElements, Route } from 'react-router-dom';
// Routes
// - Layouts
import MainLayout from '../../layouts/Main';
// - Pages
import Home from '../../pages/Home';



// Config
// ========================================================
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
    </Route>
  )
);

// Provider
// ========================================================
const RouterProvider = () => {
  return <BrowserProvider router={router} />
};

// Exports
// ========================================================
export default RouterProvider;
