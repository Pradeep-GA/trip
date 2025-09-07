import vedio1 from "./vedio/SentosaIsland.mp4";
import vedio2 from "./vedio/singaporetownvedio.mp4";
import vedio3 from "./vedio/JewelchanjiAirportvedio.mp4";
import vedio4 from "./vedio/SEA.Aquariumvedio.mp4";
import vedio5 from "./vedio/Marinabaysvedio.mp4";
import vedio6 from "./vedio/Merlionparkvedio.mp4";
import { Topbar } from "./components/topbar";
import "./places.css";

// Data for the places. This makes the component cleaner and easier to update.
const placesData = [
  {
    video: vedio1,
    title: "Sentosa Island",
    description:
      "Sentosa Island, known mononymously as Sentosa, and formerly Pulau Belakang Mati, is an island located off the southern coast of Singapore's main island. The island is separated from the main island of Singapore by a channel of water, the Keppel Harbour, and is adjacent to Pulau Brani, a smaller island wedged between Sentosa and the main island. Formerly used as a British military base and afterwards as a Japanese prisoner-of-war camp, the island was renamed Sentosa and was planned to be a popular tourist destination. It is now home to a popular resort that receives more than twenty million visitors per year.",
  },
  {
    video: vedio2,
    title: "Chinatown",
    description:
      "Chinatown's maze of narrow roads includes Chinatown Food Street, with its restaurants serving traditional fare like Hainanese chicken rice, noodles and satay. Souvenir shops and indie boutiques dot the area, offering clothes, crafts and antiques, while Club Street is full of trendy wine bars.Chinatown is a subzone and ethnic enclave located within the Outram district in the Central Area of Singapore. Featuring distinctly Chinese cultural elements, Chinatown has had a historically concentrated ethnic Chinese population. Chinatown is considerably less of an enclave than it once was."
  },
  {
    video: vedio3,
    title: "Jewel Changi Airport",
    description:
      "Jewel Changi Airport is a nature-themed entertainment and retail complex surrounded by and linked to Changi Airport, Singapore, linked to one of its passenger terminals. Its centrepiece is the world's tallest indoor waterfall, the Rain Vortex, that is surrounded by a terraced forest setting. Jewel includes gardens, attractions, a hotel, about 300 retail and dining outlets, as well as early baggage check-in aviation facilities. It covers a total gross floor area of 135,700 m2 (1,461,000 sq ft), spanning 10 storeys – five above-ground and five basement levels.",
  },
  {
    video: vedio4,
    title: "S.E.A. Aquarium",
    description:
      "The S.E.A. Aquarium (South East Asia Aquarium) was the world's largest aquarium by total water volume until overtaken by Chimelong Ocean Kingdom in Hengqin, China. It contains a total of 45,000,000 litres (9,900,000 imp gal; 12,000,000 US gal) of water for more than 100,000 marine animals of over 800 species. The centerpiece of the aquarium is the Open Ocean tank with more than 18,000,000 L (4,000,000 imp gal; 4,800,000 US gal) and 50,000 animals. Until 2014 when eclipsed by China's Chimelong Ocean Kingdom, it had the world's largest viewing panel, 36-metre (118 ft) wide and 8.3-metre (27 ft) tall, which is intended to give visitors the feeling of being on the ocean floor.",
  },
  {
    video: vedio5,
    title: "Marina Bay Sands",
    description:
      "Luxuriate in the ultimate lifestyle with unparalleled views and unforgettable experiences. Indulge in the best at Marina Bay Sands – home to the world’s largest Infinity Pool. Marina Bay Sands was originally set to open in 2009, but its construction faced delays caused by escalating costs of material and labour shortages from the outset. The global financial crisis also pressured the owners, Las Vegas Sands, to delay its projects elsewhere to complete the integrated resort. Its owner decided to open the integrated resort in stages, and it was approved by the Singapore authorities. World-Class Dining. High-Speed Wi-Fi. Access to Infinity Pool.",
  },
  {
    video: vedio6,
    title: "Merlion Park",
    description:
      "Merlion Park is a famous Singapore landmark and a major tourist attraction, located at One Fullerton, Singapore, near the Central Business District (CBD). The Merlion is a mythical creature with a lion's head and the body of a fish that is widely used as a mascot and national personification of Singapore. Two Merlion statues are located at the park. The original Merlion structure measures 8.6 meters tall and spouts water from its mouth. It has subsequently been joined by a Merlion cub, which is located near the original statue and measures just 2 metres tall.",
  },
];

const Place = () => {
  return (
    <div className="places-page-container">
      <Topbar />
          <main className="places-grid">
          {placesData.map((place, index) => (
            // I've updated the card structure to better manage the styling
            <div className="place-card" key={index}>
              <div className="place-video-container">
                <video
                  src={place.video}
                  autoPlay
                  loop
                  muted
                  playsInline // Important for autoplay on mobile
                  className="place-video"
                />
                <div className="place-overlay">
                  <p className="place-description">{place.description}</p>
                </div>
              </div>
              <h3 className="place-title">{place.title}</h3>
            </div>
          ))}
        </main>
    </div>
  );
};

export default Place;
