import React, { useEffect, useRef, useState } from 'react';

// We will load Leaflet dynamically from a CDN, so we don't import it here.

export default function Map() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const routesRef = useRef({});
  const [activeRoute, setActiveRoute] = useState('air');
  const [leafletLoaded, setLeafletLoaded] = useState(!!window.L);

  // Effect to load Leaflet script and CSS from CDN
  useEffect(() => {
    // If Leaflet is already loaded, just update the state and exit.
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    // Check if the script is already in the document to prevent duplicates
    const existingScript = document.querySelector('script[src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"]');
    if (existingScript) {
        // If it exists, it might be loading; wait for it to finish.
        existingScript.addEventListener('load', () => setLeafletLoaded(true));
        return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.head.appendChild(script);

    // We don't return a cleanup function here to remove the script and CSS.
    // This makes it more stable in development environments with React.StrictMode.
  }, []);

  // Effect for initializing the map and drawing elements
  useEffect(() => {
    // Wait until leaflet is loaded, the container is ready, and the map isn't already initialized.
    if (!leafletLoaded || !mapContainerRef.current || mapRef.current) return;

    const L = window.L;
    
    // Defensive check to ensure Leaflet and its properties are available.
    if (!L || !L.Icon || !L.Icon.Default) {
      return;
    }

    // Fix for default icon paths that can break in React/webpack environments.
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    // Initialize the map.
    mapRef.current = L.map(mapContainerRef.current).setView([15.0, 85.0], 4);
    
    // Use a reliable tile layer from CartoDB.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: ''
    }).addTo(mapRef.current);
    const indiaCoords = {
      delhi: [28.6139, 77.2090],
      chennai: [13.0827, 80.2707],
      kolkata: [22.5726, 88.3639],
      imphal: [24.8170, 93.9368]
    };
    const singaporeCoords = [1.3521, 103.8198];

    // Add markers for key locations.
    const indiaMarker = L.marker(indiaCoords.delhi).addTo(mapRef.current)
        .bindPopup('<b>New Delhi, India</b><br>Major international airport.', {className: 'custom-popup'});
    const chennaiMarker = L.marker(indiaCoords.chennai).addTo(mapRef.current)
        .bindPopup('<b>Chennai, India</b><br>Key seaport on the Bay of Bengal.', {className: 'custom-popup'});
    const kolkataMarker = L.marker(indiaCoords.kolkata).addTo(mapRef.current)
         .bindPopup('<b>Kolkata, India</b><br>Starting point for the land journey.', {className: 'custom-popup'});
    const singaporeMarker = L.marker(singaporeCoords).addTo(mapRef.current)
        .bindPopup('<b>Singapore</b><br>A global air and sea hub.', {className: 'custom-popup'});

    // Define the different routes.
    const airRoute = L.polyline([indiaCoords.delhi, singaporeCoords], {
        color: '#3B82F6', weight: 3, opacity: 0.8, dashArray: '1, 8',
    }).bindPopup('Air Route: Approx. 5-6 hours flight.', {className: 'custom-popup'});

        const seaRoute = L.polyline([
        indiaCoords.chennai,
       
        [6.2, 88.0],    // Mid-point in Bay of Bengal
        [5.8, 97.0],    // Approaching the northern entrance of the Strait of Malacca
        [4.5, 99.0],    // Entering the strait
        [2.5, 101.5],   
        singaporeCoords
    ], {
        color: '#10B981', weight: 3, opacity: 0.8,
    }).bindPopup('Sea Route: Major shipping lane.', {className: 'custom-popup'});
    const roadRoute = L.polyline([
        indiaCoords.kolkata, indiaCoords.imphal, [22.0, 96.0], [16.8, 97.6], [13.75, 100.5], [7.0, 100.5], singaporeCoords
    ], {
        color: '#22C55E', weight: 3, opacity: 0.8, dashArray: '10, 5'
    }).bindPopup('Road Route: India-Myanmar-Thailand Highway.', {className: 'custom-popup'});

    routesRef.current = { air: airRoute, sea: seaRoute, road: roadRoute };

    // Fit the map view to the markers.
    const group = new L.featureGroup([indiaMarker, chennaiMarker, kolkataMarker, singaporeMarker]);
    mapRef.current.fitBounds(group.getBounds().pad(0.2));

    // Cleanup function to destroy the map instance when the component unmounts.
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Effect for switching the displayed route when the activeRoute state changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || Object.keys(routesRef.current).length === 0) return;

    // Remove all existing routes from the map.
    Object.values(routesRef.current).forEach(route => {
        if (map.hasLayer(route)) {
            map.removeLayer(route);
        }
    });

    // Add the currently active route to the map.
    if (routesRef.current[activeRoute]) {
        routesRef.current[activeRoute].addTo(map);
    }
  }, [activeRoute, leafletLoaded]);

  // Helper function to get button styles based on the active route.
  const getButtonClasses = (route) => {
    let classes = `route-button ${route}`;
    if (activeRoute === route) {
      classes += " active";
    }
    return classes;
  };

  // Show a loading message until the map library is ready.
  if (!leafletLoaded) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div style={{fontSize: '1.25rem', fontWeight: '600'}}>Loading Map...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Original Component Styles */
        .leaflet-container { height: 400px; width: 100%; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
        .custom-popup .leaflet-popup-content-wrapper { background-color: #1f2937; color: #f3f4f6; border-radius: 8px; box-shadow: 0 0 15px rgba(0,0,0,0.5); }
        .custom-popup .leaflet-popup-tip-container { display: none; }
        .custom-popup .leaflet-popup-content { margin: 15px; font-size: 14px; line-height: 1.6; }
        
        /* Integrated Styles from Tailwind */
        .app-wrapper {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          background-color: transparent;
          color: #1f2937;
          
        }
        .main-container {
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;    
        }
       
        .map-card {
          
          border-radius: 10px;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          padding: 1rem;
        }
        .buttons-container {
          margin-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .button-icon {
          height: 1.25rem;
          width: 1.25rem;
          margin-right: 0.5rem;
        }

        /* Button Styles */
        .route-button {
          color: #ffffff;
          font-weight: 700;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }
        .route-button.active {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        /* Button Color Variants */
        .route-button.air { background-color: #92a7c9ff; }
        .route-button.air:hover { background-color: #92a7c9ff; }
        .route-button.air.active { outline: 2px solid #92a7c9ff; outline-offset: 2px; }

        .route-button.sea { background-color: #008cffff; }
        .route-button.sea:hover { background-color: #008cffff; }
        .route-button.sea.active { outline: 2px solid #008cffff; outline-offset: 2px; }

        .route-button.road { background-color: #000000ff; }
        .route-button.road:hover { background-color: #000000ff; }
        .route-button.road.active { outline: 2px solid #000000ff; outline-offset: 2px; }

        @media (max-width: 480px) {
         .main-container {
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 2.5rem;
          }
          .route-button {
          
          padding: 0.2rem 1rem;
          
          }
        }
        }
      `}</style>
      <div className="app-wrapper">
        <div className="main-container">
          <div className="map-card">
            <div ref={mapContainerRef} className="leaflet-container" />
            <div className="buttons-container">
              <button onClick={() => setActiveRoute('air')} className={getButtonClasses('air')}>
                Air Route
              </button>
              <button onClick={() => setActiveRoute('sea')} className={getButtonClasses('sea')}>
                Sea Route
              </button>
              <button onClick={() => setActiveRoute('road')} className={getButtonClasses('road')}>
                Road Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


