import React from 'react';
// import Spline from '@splinetool/react-spline';
import frontimg from '../assets/frontimg.jpg';
import './Homepage.css';
import Footer from './Footer';

const Homepage = () => {
    return (
        <div className='mainContainer'>
            <h1 className='heading'>Welcome to Fuel Delivery</h1>
            <p className='subheading'>Your convenient solution for fuel delivery.</p>
            <h1 className='order'>Order Now</h1>
            <div className="animiContainer">
                {/* Uncomment the Spline component if needed */}
                {/* <Spline
                    scene="https://prod.spline.design/Q7FkZTSPbAqwmBkt/scene.splinecode" 
                    width={1920}
                    height={1080}
                /> */}
                <img src={frontimg} alt="Front Image" className='frontimg' />
            </div>
            <div className='footContainer'>
                <Footer className='foot' />
            </div>
        </div>
    );
};

export default Homepage;
