import "./accomadation.css";
import { Topbar } from '../components/topbar';

const Accomadation = () => {
const accommodationData = [
  {
    image: "image/grandparkcitystay.jpg",
    title: "Grand Park City Hall",
    link: "https://www.parkhotelgroup.com/grand-park-city-hall"
  },
  {
    image: "image/holiday inn address singapore.jpg",
    title: "Holiday Inn",
    link: "https://www.ihg.com/holidayinn/hotels/us/en/reservation"
  },
  {
    image: "image/Grand Copthorne Waterfront.webp",
    title: "Grand Copthorne Waterfront",
    link: "https://www.millenniumhotels.com/en/singapore/grand-copthorne-waterfront/"
  },
  {
    image: "image/marinabayhotel.jpg",
    title: "Marina Bay Sands",
    link: "https://www.marinabaysands.com/"
  },
  {
    image: "image/marinabay.avif",
    title: "ST Signature Chinatown",
    link: "https://www.stsignature.com/st-signature-chinatown"
  },
  {
    image: "image/singaporetown.jpg",
    title: "Furama RiverFront",
    link: "https://www.furama.com/riverfront"
  }
];

  return (
    <div className="accomadation">
      <Topbar />
      <div class="Hotels">
 <main className="accommodation-grid">
          {accommodationData.map((item, index) => (
            <article className="accommodation-card" key={index}>
              <div className="accommodation-image-container">
                <img src={item.image} alt={item.title} className="accommodation-image" />
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="info-button">
                  More Info
                </a>
              </div>
              <div className="accommodation-content">
                <h3 className="accommodation-title">{item.title}</h3>
              </div>
            </article>
          ))}
        </main>
        
      </div>
    </div>
  );
};
export default Accomadation;
