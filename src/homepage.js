import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Map from "./components/map";
import { Topbar } from "./components/topbar";


// --- Improvement 1: Content is separated from logic for easier management ---
const destinationContent = {
  title: "Singapore",
  paragraphs: [
    "Officially the Republic of Singapore, it is a sovereign island country and city-state in maritime Southeast Asia. It lies about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula.",
    "The country's territory is composed of one main island, 63 satellite islands and islets, and one outlying islet. The combined area of these has increased by 25% since the country's independence as a result of extensive land reclamation projects.",
    "With a multicultural population and recognising the need to respect cultural identities, Singapore has four official languages: English, Mandarin, Malay, and Tamil. English is the lingua franca and the main language used in business, education, and government."
  ],
  ctaText: "Explore Places"
};


const Homepage = () => {
  const navigate = useNavigate();

  const redirect22 = () => {
    navigate("/places");
  };

  return (
    <div className="home">
      <Topbar />
      <main className="home-container">
        <div className="home-content">
          {/* --- Improvement 2: Using semantic HTML (h1) and mapping content --- */}
          <h1 className="home-title">{destinationContent.title}</h1>
          {destinationContent.paragraphs.map((text, index) => (
            <p key={index} className="home-text">
              {text}
            </p>
          ))}
          {/* --- Improvement 3: Added a clear Call to Action button --- */}
          <button className="home-cta-button" onClick={redirect22}>
            {destinationContent.ctaText}
          </button>
        </div>
        <div className="home-map-container">
            <Map />
        </div>
      </main>
    </div>
  );
};

export default Homepage;