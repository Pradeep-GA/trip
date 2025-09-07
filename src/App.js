import './App.css';
import {Route,Routes} from 'react-router-dom';
import Intropage from './intropage';
import Homepage from './homepage';
import {Topbar} from './components/topbar';
import Map from './components/map';
import Place from './places';
import Food from './food';
import Accomadation from './accomadation';
function App() {
  return (
    <Routes>
     <Route path="/" element={<Intropage/>}></Route>
     <Route path="/homepage" element={<Homepage/>}></Route>
     <Route path="/topbar" element={<Topbar/>}></Route>
     <Route path="/map" element={<Map/>}></Route>
     <Route path="/places" element={<Place/>}></Route>
     <Route path="/food" element={<Food/>}></Route>
     <Route path="/accomadation" element={<Accomadation/>}></Route>   
    </Routes>
  );
}

export default App;
