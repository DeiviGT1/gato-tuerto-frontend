import React, { useEffect, useState, useRef } from 'react';
import Carousel from "react-multi-carousel";
import './Carousel.css';
import productsData from '../pages/products.json';
import CarouselItem from './CarouselItem';

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../pages/liquors', true, /\.(png|jpe?g|svg)$/));

const Carousel = ({ routes }) => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const maxNextClicks = 2; // Number of times the next button can be clicked

  useEffect(() => {
    const foundItems = [];
    productsData.types.forEach(type => {
      type.subtypes.forEach(subtype => {
        subtype.products.forEach(productBrand => {
          productBrand.products.forEach(product => {
            if (routes.includes(product.route)) {
              let selectedSize = product.sizes.find(size => size.size === "750ml") || product.sizes[0];
              foundItems.push({ ...product, selectedSize });
            }
          });
        });
      });
    });
    setItems(foundItems);
  }, [routes]);

  useEffect(() => {
    setIsPrevDisabled(currentIndex === 0);
    setIsNextDisabled(currentIndex >= maxNextClicks);
  }, [currentIndex]);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const next = () => {
    if (currentIndex < maxNextClicks) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="carousel">
      <button onClick={prev} className="prev-button" disabled={isPrevDisabled}>
        &#10148;
      </button>
      <div className="carousel-container">
        <div
          className="carousel-items"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              name={item.name}
              imgSrc={images[item.selectedSize.img.replace('liquors/', '')]}
              price={item.selectedSize.price}
            />
          ))}
        </div>
      </div>
      <button onClick={next} className="next-button" disabled={isNextDisabled}>
        &#10148;
      </button>
    </div>
  );
};

export default Carousel;
