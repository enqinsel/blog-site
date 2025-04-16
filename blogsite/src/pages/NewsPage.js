import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../services/api';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await getNews();
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        setError('Haberler yüklenirken bir hata oluştu');
        setLoading(false);
        console.error(error);
      }
    };
    
    fetchNews();
  }, []);
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Haberler</h2>
      
      <div className="row">
        {news && news.length > 0 ? (
          news.map((item) => (
            <div className="col-md-4 mb-4" key={item.key}>
              <div className="card h-100">
                {item.image && (
                  <img 
                    src={item.image} 
                    className="card-img-top" 
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Resim+Yok';
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    {item.description ? (
                      item.description.length > 100 
                        ? item.description.substring(0, 100) + '...' 
                        : item.description
                    ) : 'Açıklama yok'}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Kaynak: {item.source}</small>
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <a 
                    href={item.url} 
                    className="btn btn-primary" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Habere Git
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <p>Gösterilecek haber bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage; 