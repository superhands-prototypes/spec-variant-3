import { useState, useEffect } from 'react';
import './RecentlySoldTractors.css';

const LocationPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const tractors = [
  {
    id: 1,
    model: 'John Deere 6155R',
    timeAgo: '1 day ago',
    location: 'Matera',
    image: '/john-tractor-1.jpg'
  },
  {
    id: 2,
    model: 'Massey Ferguson 7718s',
    timeAgo: '6 hours ago',
    location: 'Gdańsk',
    image: '/massey-tractor-1.jpg'
  },
  {
    id: 3,
    model: 'Claas Arion 430',
    timeAgo: '22 hours ago',
    location: 'Llandudno',
    image: '/arion-tractor-1.jpg'
  }
];

export default function RecentlySoldTractors() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % tractors.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="recently-sold-section">
      <div className="recently-sold-content">
        <div className="recently-sold-header">
          <h3 className="recently-sold-title">
            <span className="pulsing-dot"></span>
            Recently Sold on Spectinga
          </h3>
        </div>

        {/* Carousel View */}
        <div 
          className="recently-sold-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {tractors.map((tractor) => (
            <div key={tractor.id} className="carousel-slide">
              <div className="tractor-card">
                <div className="tractor-image-wrapper">
                  <img 
                    src={tractor.image} 
                    alt={tractor.model}
                    className="tractor-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(tractor.model);
                    }}
                  />
                </div>
                <div className="tractor-info">
                  <h3 className="tractor-model">{tractor.model}</h3>
                  <div className="tractor-details">
                    <div className="tractor-location-time">
                      <span className="tractor-location">
                        <LocationPinIcon />
                        {tractor.location}
                      </span>
                      <span className="tractor-bullet">•</span>
                      <span className="tractor-time">{tractor.timeAgo}</span>
                    </div>
                    <div className="tractor-price-placeholder">
                      <span className="price-symbol">£</span>
                      <span className="price-block"></span>
                      <span className="price-block"></span>
                      <span className="price-block"></span>
                      <span className="price-comma">,</span>
                      <span className="price-block"></span>
                      <span className="price-block"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {tractors.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

