import { BrowserRouter, Routes, Route, Link, Outlet, useRoutes, useNavigate } from 'react-router-dom';


const PrivateRoute = ({ element: Element, isAdmin }) => {
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  return <Element />;
};

export default PrivateRoute