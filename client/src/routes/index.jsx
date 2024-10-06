import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import CheckEmail from '../pages/CheckEmail';
import CheckPassword from '../pages/CheckPassword';
import Home from '../pages/Home';
import Message from '../components/Message';
import App from '../App';
import Authlayout from '../layout/Authlayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'register',
        element: <Authlayout><Register /></Authlayout>,
      },
      {
        path: 'email',
        element: <Authlayout><CheckEmail /></Authlayout>,
      },
      {
        path: 'password',
        element: <Authlayout><CheckPassword /></Authlayout> ,
      },
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: ':userId',
            element: <Message />,
          },
        ],
      },
    ],
  },
]);


export default router;