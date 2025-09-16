import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './intropage.css';
const backgroundImages = [
  "https://images.pexels.com/photos/5956580/pexels-photo-5956580.jpeg",
  "https://images.pexels.com/photos/1842332/pexels-photo-1842332.jpeg",
  "https://images.pexels.com/photos/2499786/pexels-photo-2499786.jpeg",
  "https://images.pexels.com/photos/3152126/pexels-photo-3152126.jpeg",
  "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg",
];
// HELPER COMPONENT: Icon for the cards
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const Intropage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000); 
      const loaderTimeout = setTimeout(() => {
        setIsLoading(false);
    }, 2500); // Increased duration for the new animation to complete

    // Cleanup timers on component unmount
    return () => {
        clearInterval(intervalId);
        clearTimeout(loaderTimeout);
    };

   }, []);
  const onNavigate = (page) => {
    window.location.href = `/${page}`;
  }

  const planningOptions = [
    {
      title: "Singapore Food",
      text:'food',
      description: "Singaporean cuisine is derived from several ethnic groups.",
      imageUrl: "https://singaporevisaonline.sg/wp-content/uploads/2022/11/Nasi-lemak-1024x683.webp",
    },
    {
      title: "Urban Adventures",
      text:'places',
      description: "Singapore features an array of iconic buildings and city life.",
      imageUrl: "https://images.pexels.com/photos/18488729/pexels-photo-18488729.jpeg?_gl=1*lzl3hk*_ga*MTc4Njc3ODA2My4xNzQ3NTgxMDgy*_ga_8JE65Q40S6*czE3NTgwMjMzNjgkbzQkZzEkdDE3NTgwMjM2ODYkajQ5JGwwJGgw",
    },
    {
      title: "Cultural Hotspots",
      text:'homepage',
      description: "Singapore's key cultural spots immersion in different heritage and traditions.",
      imageUrl: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/203/2024/03/04092851/Sultan-Mosque.jpg",
    },
  ];
    const navigate = useNavigate();
  
    
    const homepage = () => {
      navigate("/homepage");
    }

      if (isLoading) {
    return (
        <>
            <div className="loader-container">
                <h1 className="loader-title">
                    {'triPlanner'.split('').map((letter, index) => (
                        <span key={index}>{letter}</span>
                    ))}
                </h1>
            </div>
        </>
    );
  }

  return (
    <div className="intro-page-container">
      
      {backgroundImages.map((image, index) => (
       <div
          key={index}
          className="intro-page-background-image"
          style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentImageIndex ? 1 : 0,
          }}
       />
      ))}
      <div className="intro-page-content">
        <h1 className="intro-page-title">triPlanner</h1>
        <h3 className="intro-page-subtitle" onClick={homepage}>A Trip To Singapore</h3>
        <div className="planning-grid">
          {planningOptions.map((option, index) => (
            <div
              key={option.title}
              onClick={() => onNavigate(option.text)}
              className="planning-card"
              style={{ animationDelay: `${200 * (index + 1)}ms` }}
            >
              <img
                src={option.imageUrl}
                alt={option.title}
                className="planning-card-image"
              />
              <div className="planning-card-gradient"></div>
              <div className="planning-card-content">
                <h3 className="planning-card-title">{option.title}</h3>
                <p className="planning-card-description">{option.description}</p>
                <div className="planning-card-action">
                  Start Planning <ArrowRightIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Intropage;