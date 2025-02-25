// src/components/HeroSlider.jsx
import { useState, useEffect } from 'react';

const images = [
  '/images/slide6.jpg',
  '/images/slide5.gif',
  '/images/slide1.jpg',
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % images.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative  rounded-3xl mx-5 h-[32rem] max-sm:max-h-52 overflow-hidden mt-0.5 ">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute inset-0 object-cover w-full transition-opacity duration-3000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default HeroSlider;
