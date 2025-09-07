import React from 'react';
import './food.css';
import { Topbar } from './components/topbar';


const Food = () => {

const cuisineData = [
  {
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Indian Cuisine",
    restaurants: [
      { name: "Royal Taj", link: "https://www.royaltaj.sg" },
      { name: "Tiffin Room", link: "https://tiffinroom.com.sg/" },
      { name: "Adda", link: "https://www.facebook.com/thespiceadda/" },
      { name: "Anandabhavan", link: "https://www.anandabhavan.com/" },
      { name: "Shikar", link: "https://shikar.sg/" },
    ]
  },
  {
    image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Chinese Cuisine",
    restaurants: [
      { name: "Yan", link: "https://www.yan.com.sg/" },
      { name: "Yellow Pot", link: "https://yellowpot.sg/" },
      { name: "Madame Fan", link: "https://www.madamefan.sg/" },
      { name: "Yi by Jereme Leung", link: "https://www.yi-restaurant.com.sg/" },
      { name: "The Dragon Chamber", link: "https://www.thedragonchamber.com/" },
    ]
  },
  {
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "European Cuisine",
    restaurants: [
      { name: "WURSTHANS Switzerland", link: "https://wursthans.sg/" },
      { name: "Armenor", link: "https://www.facebook.com/armenor.sg/" },
      { name: "EATcetera", link: "https://www.eatcetera.sg/" },
    ]
  },
  {
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Multi-Cuisine",
    restaurants: [
        { name: "Regent Singapore", link: "https://www.hilton.com/en/hotels/sinodci-conrad-singapore-orchard/" },
        { name: "Hotel Indigo", link: "https://www.ihg.com/hotelindigo/hotels/us/en/singapore/sinki/hoteldetail" },
        { name: "InterContinental Singapore", link: "https://www.ihg.com/intercontinental/hotels/us/en/singapore/sinhb/hoteldetail" },
    ]
  },
];

     return (
        <div className='foodhead'>
            <Topbar/>
                  <main className="cuisine-grid">
          {cuisineData.map((cuisine, index) => (
            <div className="cuisine-card" key={index}>
              <div className="cuisine-image-container">
                <img
                  src={cuisine.image}
                  alt={cuisine.title}
                  className="cuisine-image"
                />
                <div className="cuisine-overlay">
                   <div className="restaurant-list">
                      <h4>Top Restaurants</h4>
                      <ul>
                        {cuisine.restaurants.map((restaurant, rIndex) => (
                          <li key={rIndex}>
                            <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
                              {restaurant.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </div>
              <h3 className="cuisine-title">{cuisine.title}</h3>
            </div>
          ))}
        </main>
        </div>


     )
}
export default Food;









