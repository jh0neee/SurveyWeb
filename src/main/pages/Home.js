import React from 'react';
//import { Link } from 'react-router-dom';

import Banner from '../../asset/image/MainBanner.png';
import BannerText from '../../asset/image/Banner_Text.svg';
import '../styles/Home.css';

const Home = (props) => {
    return ( 
        <div className='home-img'>
            <img src={Banner} alt='banner' className='home-img__bn'/>
            <img src={BannerText} alt='text' className='home-img__text' />
        </div>

     );
}
 
export default Home;