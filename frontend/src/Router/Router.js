import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../pages/HomePage';
import DashBoard from '../pages/DashBoard';
import LoginForm from '../Component/Authentication/Login/LoginForm';
import User from '../pages/User';
import TacGia from '../pages/TacGia';
import NhaCungCap from '../pages/NhaCungCap';
import NhaXuatBan from '../pages/NhaXuatBan';
import NgonNgu from '../pages/NgonNgu';
import NhomTheLoai from '../pages/NhomTheLoai';
import KichThuot from '../pages/KichThuot';
import TheLoai from '../pages/TheLoai';
import Book from '../pages/Book';

export default function Router() {
  const isAdmin = useSelector((state) => state.user.current.role) === 'ADMIN';
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="app" />,
    },
    {
      path: '/dashboard',
      element: isAdmin ? <DashBoard /> : <Navigate to="/" />,
      children: [
        {
          path: 'user',
          element: <User />,
        },
        {
          path: 'book',
          element: <Book />,
        },
        {
          path: 'tacgia',
          element: <TacGia />,
        },
        {
          path: 'nhacungcap',
          element: <NhaCungCap />,
        },
        {
          path: 'nhaxuatban',
          element: <NhaXuatBan />,
        },
        {
          path: 'ngonngu',
          element: <NgonNgu />,
        },
        {
          path: 'nhomtheloai',
          element: <NhomTheLoai />,
        },
        {
          path: 'kichthuot',
          element: <KichThuot />,
        },
        {
          path: 'theloai',
          element: <TheLoai />,
        },
      ],
    },
    {
      path: '/app',
      element: isAdmin ? <Navigate to="/dashboard" /> : <HomePage />,
      children: [
        {
          path: 'login',
          element: <LoginForm />,
        },
      ],
    },
  ]);
}
