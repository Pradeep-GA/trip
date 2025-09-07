import "./accomadation.css";
import { Topbar } from './components/topbar';

const Accomadation = () => {
const accommodationData = [
  {
    image: "https://gos3.ibcdn.com/91ce115ccc3f11e887650a7510c9dcdc.jpg",
    title: "Grand Park City Hall",
    link: "https://www.parkhotelgroup.com/grand-park-city-hall"
  },
  {
    image: "https://digital.ihg.com/is/image/ihg/holiday-inn-express-singapore-6154135794-2x1",
    title: "Holiday Inn",
    link: "https://www.ihg.com/holidayinn/hotels/us/en/reservation"
  },
  {
    image: "https://gos3.ibcdn.com/23da04de287411ea9a7c0242ac110003.jpg",
    title: "Grand Copthorne Waterfront",
    link: "https://www.millenniumhotels.com/en/singapore/grand-copthorne-waterfront/"
  },
  {
    image: "https://www.marinabaysands.com/content/dam/marinabaysands/more/more-masthead-desktop-1920x1080.jpg",
    title: "Marina Bay Sands",
    link: "https://www.marinabaysands.com/"
  },
  {
    image: "https://gos3.ibcdn.com/0bd84a5a3fea11ecb57e0a58a9feac02.jpg",
    title: "ST Signature Chinatown",
    link: "https://stsignature.com/chinatown/"
  },
  {
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/1f/f4/5d/facade.jpg?w=900&h=500&s=1",
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
