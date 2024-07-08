import React from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import './Home.css';
import { Link } from 'react-router-dom';

import wideSelection from '../../assets/wide-selection.jpg';
import exclusiveOffers from '../../assets/exclusive-offers.jpg';
import openHours from '../../assets/open-hours.jpg';

function Home() {
    return (
        <>
            <Header />
            <div className="app-screen">
            <div className="home">
                <section className="home-features">
                    <div className="feature">
                        <Link to="/catalog">
                            <img src={wideSelection} alt="Feature 1" />
                            <h2>Wide Selection</h2>
                            <p>Choose from a vast variety of liquors from around the world.</p>
                        </Link>
                    </div>
                    <div className="feature">
                        <Link to="/gift-boxes">
                            <img src={exclusiveOffers} alt="Feature 2" />
                            <h2>Exclusive Offers</h2>
                            <p>Get access to special deals and promotions.</p>
                        </Link>
                    </div>
                    <div className="feature">
                        <Link to="/contact-us">
                            <img src={openHours} alt="Feature 3" />
                            <h2>Store Hours</h2>
                            <p>Sunday to Thursday: 9:00 AM - 12:00 AM</p>
                            <p>Friday and Saturday: 9:00 AM - 1:00 AM</p>
                        </Link>
                    </div>
                </section>
            </div>
            <Footer />
            </div>
        </>
    );
}

export default Home;
