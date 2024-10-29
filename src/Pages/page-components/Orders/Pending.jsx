import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Pending = () => {
  const items = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1yhlTpkCnujnhzP-xioiy9RdDQkKLMnMSg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1yhlTpkCnujnhzP-xioiy9RdDQkKLMnMSg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1yhlTpkCnujnhzP-xioiy9RdDQkKLMnMSg&s"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [items.length]);

  return (
    <div style={{ overflow: 'hidden', width: '300px', height: '200px' }}>
      <motion.div
        style={{
          display: 'flex',
          width: `${items.length * 100}%`,
          height: '100%',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
        }}
      >
        {items.map((item, index) => (
          <motion.img
            key={index}
            src={item}
            alt={`Slide ${index}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Pending;
