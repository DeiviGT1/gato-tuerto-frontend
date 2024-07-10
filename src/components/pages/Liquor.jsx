import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Modal from '../ui/Modal';
import items from './products.json';
import "./Liquor.css";

function Liquor() {
    const { item } = useParams();
    const defaultSize = '750ml';
    const [currentLogo, setCurrentLogo] = useState(null);
    const [logos, setLogos] = useState({});
    const [selectedSize, setSelectedSize] = useState(defaultSize); 
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const findProduct = (data, productRoute) => {
        for (let type of data.types) {
            for (let subtype of type.subtypes) {
                for (let brand of subtype.products) {
                    for (let product of brand.products) {
                        if (product.route === productRoute) {
                            return product;
                        }
                    }
                }
            }
        }
        return null;
    };

    const product = findProduct(items, item);

    useEffect(() => {
        const loadImages = async () => {
            if (product) {
                const importedLogos = {};
                for (const size of product.sizes) {
                    try {
                        const image = await import(`./${size.img}`);
                        importedLogos[size.size] = image.default;
                    } catch (error) {
                        console.error(`Error loading image for size ${size.size}:`, error);
                    }
                }
                setLogos(importedLogos);
                setCurrentLogo(importedLogos[defaultSize]);
                const defaultPrice = product.sizes.find(size => size.size === defaultSize)?.price;
                setSelectedPrice(defaultPrice);

                // Mostrar el modal si el producto tiene modal: true

                if (product.modal === true) {
                    console.log('show modal');
                    setShowModal(true);
                }
            }
        };

        loadImages();
    }, [product, defaultSize]);

    const toggleLogo = (size) => {
        setCurrentLogo(logos[size]);
        setSelectedSize(size); 
        const newPrice = product.sizes.find(s => s.size === size)?.price;
        setSelectedPrice(newPrice); 
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Header />
            <div className="app-screen">
            <div className="liquor">
                <div className="liquor-container">
                    <div className="liquor-image">
                        {currentLogo && <img src={currentLogo} className="App-logo" alt="logo" />}
                    </div>
                    <div className="liquor-content">
                        <div className="liquor-sizes">
                            {Object.keys(logos).map((size) => (
                                <button
                                    className={'liquor-size' + (selectedSize === size ? ' clicked' : '')}
                                    id={selectedSize === size ? 'clicked' : ''}
                                    key={size}
                                    onClick={() => toggleLogo(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <div className="liquor-info">
                            <h1 className='liquor-title'>{product?.name}</h1>
                            <br/>
                            <br/>
                            <p className='liquor-description'>{product?.description}</p>
                            <br/>
                            
                            <p className='liquor-size'></p> <p className='liquor-price'>Size: {selectedSize} - Price: ${selectedPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal show={showModal} onClose={closeModal}>
                <h2 className='modal-title'>{product?.name}</h2>
                <p className='modal-info'>We also have {product?.name} with this box gift for you!
                            You can have it with the gift for the same price!
                            click on the image to get it instead of the single bottle.
                </p>
                <br/>
                <p className='close-modal-info'>*Click on the "X" if you want a different size or only the bottle</p>
                <img className='modal-img' src="" alt="" />

            </Modal>
            </div>
        </>
    );
}

export default Liquor;
