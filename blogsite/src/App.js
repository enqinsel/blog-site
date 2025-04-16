import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';


import Login from './pages/Login';
import Register from './pages/Register';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import NewBlog from './pages/NewBlog';
import EditBlog from './pages/EditBlog';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          
          <Route path="/news" element={
            <PrivateRoute>
              <NewsPage />
            </PrivateRoute>
          } />
          
          <Route path="/blog" element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          } />
          
          <Route path="/blog/:id" element={
            <PrivateRoute>
              <BlogDetail />
            </PrivateRoute>
          } />
          
          <Route path="/new-blog" element={
            <PrivateRoute>
              <NewBlog />
            </PrivateRoute>
          } />
          
          <Route path="/edit-blog/:id" element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          } />
          
         
          <Route path="/" element={<Navigate to="/login" replace />} />
          
       
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
