import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <>
    <Header />
        <div className="contact-us">
        <h1>Contact Us</h1>
        <p>
            We love hearing from our customers! Whether you have a question, feedback, or need assistance with your order, our team is here to help. Feel free to reach out to us through any of the methods below.
        </p>
        
        <section className="visit-us">
            <h2>Visit Us</h2>
            <address>
            <strong>El Gato Tuerto Liquors #1</strong><br />
            476 SW 8th Street, Miami, FL 33130<br />
            <strong>Phone:</strong> 305-860-9999<br />
            <strong>Email:</strong> <a href="mailto:info@elgatotuerto1.com">info@elgatotuerto1.com</a>
            </address>
        </section>
        
        <section className="store-hours">
            <h2>Store Hours</h2>
            <ul>
            <li><strong>Sunday to Thursday:</strong> 9:00 AM – 12:00 PM</li>
            <li><strong>Friday and Saturday:</strong> 9:00 AM – 1:00 AM</li>
            </ul>
        </section>
        
        <section className="get-in-touch">
            <h2>Get In Touch</h2>
            <p>
            We are committed to providing top-quality service and products to our valued customers. If you have any inquiries or require further assistance, please do not hesitate to contact us.
            </p>
            
            <form className="contact-form">
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Submit</button>
            </form>
        </section>
        
        <section className="social-media">
            <h2>Follow Us on Social Media</h2>
            <ul>
            <li><a href="https://facebook.com/elgatotuertoliquors" target="_blank" rel="noopener noreferrer">Facebook: El Gato Tuerto Liquors</a></li>
            <li><a href="https://instagram.com/elgatotuertoliquors" target="_blank" rel="noopener noreferrer">Instagram: @elgatotuertoliquors</a></li>
            <li><a href="https://twitter.com/elgatotuertomiami" target="_blank" rel="noopener noreferrer">Twitter: @elgatotuertomiami</a></li>
            </ul>
        </section>
        
        {/* <section className="delivery-partners">
            <h2>Delivery Partners</h2>
            <ul>
            <li>UberEats</li>
            <li>DoorDash</li>
            <li>GrubHub</li>
            </ul>
        </section> */}
        
        </div>
        <Footer />
    </>
  );
};

export default ContactUs;
