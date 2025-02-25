// src/pages/Home.jsx
import HeroSlider from '../components/HeroSlider';
import Navbar from '../components/Navbar';
import SongList from '../components/SongList';

const Home = () => {
  return (
    <div className=''>
       <Navbar/>
            
       <HeroSlider  />
      <SongList />
    
    </div>
  );
};

export default Home;
