
import React from 'react';
import 'antd/dist/antd.css';
import './Homepage.css';
import { Carousel } from 'antd';
import caro1 from '../../assets/Images/caro1.png';
import caro2 from '../../assets/Images/caro2.jpg';
import caro3 from '../../assets/Images/caro3.jpg';

const HomePage = () => (
  <Carousel autoplay>
    <div>
      <img style={{ height: '450px' }} alt="imgage caro" src={caro1} />
      <h2>Hello, You</h2>
    </div>
    <div>
      <img style={{ height: '450px' }} alt="imgage caro" src={caro2} />
      <h2>This is </h2>
    </div>
    <div>
      <img style={{ height: '450px' }} alt="imgage caro" src={caro3} />
      <h2>Caro</h2>
    </div>
    <div>
      <img style={{ height: '450px' }} alt="imgage caro" src={caro1} />
      <h2>World</h2>
    </div>
  </Carousel>
);
export default HomePage;
