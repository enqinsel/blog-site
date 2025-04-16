import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, updateBlog } from '../services/api';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchBlog = () => {
      setLoading(true);
      const blogData = getBlogById(id);
      
      if (blogData) {
        setFormData({
          title: blogData.title,
          content: blogData.content,
          imageUrl: blogData.imageUrl || ''
        });
      } else {
        // If blog not found, redirect to blogs list
        navigate('/blog');
      }
      
      setLoading(false);
    };
    
    fetchBlog();
  }, [id, navigate]);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Başlık gereklidir';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'İçerik gereklidir';
    }
    
    // Image URL validation is optional
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Geçerli bir URL giriniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      updateBlog(id, formData);
      navigate(`/blog/${id}`);
    }
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
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Blog Düzenle</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Başlık</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Blog başlığı"
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">Görsel URL (İsteğe bağlı)</label>
                  <input
                    type="text"
                    className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageUrl && (
                    <div className="invalid-feedback">{errors.imageUrl}</div>
                  )}
                  {formData.imageUrl && isValidUrl(formData.imageUrl) && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="img-thumbnail" 
                        style={{ maxHeight: '200px' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Görsel+Yüklenemedi';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">İçerik</label>
                  <textarea
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="10"
                    placeholder="Blog içeriği"
                  ></textarea>
                  {errors.content && (
                    <div className="invalid-feedback">{errors.content}</div>
                  )}
                </div>
                
                <div className="d-flex justify-content-between">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => navigate(`/blog/${id}`)}
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog; 