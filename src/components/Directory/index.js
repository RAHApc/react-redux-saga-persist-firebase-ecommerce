import React from 'react';
import { Link } from 'react-router-dom';
import shopMen from './../../assets/shopMen.jpg';
import shopWomen from './../../assets/shopWomen.jpg';
import './styles.scss';

const Directory = () => {
    return ( 
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${shopWomen})`
                    }}
                >
                    <Link to="/search/womens">Shop Womens</Link>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${shopMen})`
                    }}
                >
                    <Link to="/search/mens">Shop Mens</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Directory;