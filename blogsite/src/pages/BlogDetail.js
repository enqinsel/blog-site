import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../services/api';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    const fetchBlog = () => {
      setLoading(true);
      const blogData = getBlogById(id);
      
      if (blogData) {
        setBlog(blogData);
      } else {
        // If blog not found, redirect to blogs list
        navigate('/blog');
      }
      
      setLoading(false);
    };
    
    fetchBlog();
  }, [id, navigate]);
  
  const handleDelete = () => {
    deleteBlog(id);
    navigate('/blog');
  };
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Blog yazısı bulunamadı
        </div>
        <Link to="/blog" className="btn btn-primary">
          Blog Listesine Dön
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-12">
          <h1>{blog.title}</h1>
          <p className="text-muted">
            {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
            {blog.updatedAt && (
              <span> (Düzenlendi: {new Date(blog.updatedAt).toLocaleDateString('tr-TR')})</span>
            )}
          </p>
        </div>
      </div>
      <div className="col-md-12 text-md-end">
          <Link to={`/edit-blog/${blog.id}`} className="btn btn-warning me-2">
            Düzenle
          </Link>
          <button 
            className="btn btn-danger" 
            onClick={() => setShowDeleteConfirm(true)}
          >
            Sil
          </button>
        </div>
      
      {blog.imageUrl && (
        <div className="row mb-4">
          <div className="col-12 m-3">
            <img 
              src={blog.imageUrl} 
              alt={blog.title}
              className="img-fluid rounded"
              style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x400?text=Resim+Yok';
              }}
            />
          </div>
        </div>
      )}
      
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
                {blog.content}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4 mb-4">
        <div className="col-12">
          <Link to="/blog" className="btn btn-secondary">
            Geri Dön
          </Link>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Blog Yazısını Sil</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>"{blog.title}" başlıklı blog yazısını silmek istediğinize emin misiniz?</p>
                <p className="text-danger">Bu işlem geri alınamaz!</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  İptal
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail; 