import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    setBlogs(getBlogs());
  }, []);
  
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Blog Yazıları</h2>
        <Link to="/new-blog" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i> Yeni Blog Ekle
        </Link>
      </div>
      
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.id}>
              <div className="card h-100">
                {blog.imageUrl && (
                  <img 
                    src={blog.imageUrl} 
                    className="card-img-top" 
                    alt={blog.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Resim+Yok';
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">
                    {blog.content.length > 100 
                      ? blog.content.substring(0, 100) + '...' 
                      : blog.content}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <Link to={`/blog/${blog.id}`} className="btn btn-primary">
                    Devamını Oku
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              Henüz blog yazısı eklenmemiş. İlk blog yazınızı eklemek için 
              <Link to="/new-blog" className="alert-link ms-1">
                tıklayın
              </Link>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList; 