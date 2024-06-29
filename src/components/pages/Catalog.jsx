import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Product from "../ui/Product";
import FilterComponent from "../layout/FilterComponent";
import items from './products.json'; // Adjust the path as per your folder structure
import LoadingSpinner from '../ui/LoadingSpinner'; // Import the LoadingSpinner component
import './Catalog.css';

// Helper function to dynamically import images
const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
};

// Import all images in the specified directory
const images = importAll(require.context('./liquors', true, /\.(png|jpe?g|svg)$/));

function Catalog( ) {
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Simulate a delay to demonstrate the loading spinner
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleFilterChange = (newType, newBrand, newPrice, newOrderBy) => {
        setSelectedType(newType);
        setSelectedBrand(newBrand);
        setSelectedPrice(newPrice);
        setOrderBy(newOrderBy);
    };

    const getAllProducts = () => {
        let allProducts = [];
        items.types.forEach(type => {
            if (selectedType === 'others') {
                if (!['whiskey', 'tequila', 'vodka', 'rum', 'wine'].includes(type.type)) {
                    type.subtypes.forEach(subtype => {
                        subtype.products.forEach(brand => {
                            if (!selectedBrand || brand.brand === selectedBrand) {
                                allProducts = [...allProducts, ...brand.products];
                            }
                        });
                    });
                }
            } else if (!selectedType || type.type === selectedType) {
                type.subtypes.forEach(subtype => {
                    subtype.products.forEach(brand => {
                        if (!selectedBrand || brand.brand === selectedBrand) {
                            allProducts = [...allProducts, ...brand.products];
                        }
                    });
                });
            }
        });
        return allProducts;
    };
    
    

    const sortProducts = (products) => {
        return products.slice().sort((a, b) => {
            const sizeA = a.sizes.find(size => size.size === "750ml");
            const sizeB = b.sizes.find(size => size.size === "750ml");
            const priceA = sizeA ? sizeA.price : 0;
            const priceB = sizeB ? sizeB.price : 0;
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (orderBy === 'price-asc') {
                return priceA - priceB;
            } else if (orderBy === 'price-desc') {
                return priceB - priceA;
            } else if (orderBy === 'name-asc') {
                return nameA.localeCompare(nameB);
            } else if (orderBy === 'name-desc') {
                return nameB.localeCompare(nameA);
            }
            return 0;
        });
    };

    const renderProducts = (products) => {
        products = sortProducts(products);

        return products.map(product => {
            const preferredSize = product.sizes.find(size => size.size === "750ml") || product.sizes[0];

            if (selectedPrice) {
                const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
                if (preferredSize.price < minPrice || preferredSize.price > maxPrice) {
                    return null; // Skip products outside the selected price range
                }
            }

            return (
                <Product
                    key={product.route}
                    route={product.route}
                    name={product.name}
                    price={preferredSize.price}
                    size={preferredSize.size}
                    img={images[preferredSize.img.replace('liquors/', '')]} // Adjust the path
                />
            );
        });
    };

    const allProducts = getAllProducts();

    return (
        <>
            <Header />
            <FilterComponent onFilterChange={handleFilterChange} />
            <div className="Catalog">
                {loading ? (
                    <LoadingSpinner /> // Show loading spinner while loading
                ) : (
                    <section>
                        <div className="card-container">
                            {renderProducts(allProducts)}
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Catalog;
