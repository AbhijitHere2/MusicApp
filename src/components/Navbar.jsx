// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import logo from '../naeImg/logo.jpg'


const Navbar = () => {
  return (
    <div className=''>
    <nav className="bg-white p-5 h-20  w-full text-black  flex justify-between items-center   ">
      <h1 className="text-xl w-1/2  flex ml-14 font-bold"><img className='w-15 rounded-lg' src={logo}alt="" /></h1>
      
      <div className="space-x-4 flex justify-center  w-1/2  ">
        <Link to="/" className="bg-purple-400 border-black border-2 py-1 px-2 rounded-2xl text-white text-sm ">Home</Link>
        <Link to="/library" className="bg-purple-400 border-black border-2 py-1 px-2 rounded-2xl text-white text-sm">Library</Link>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
