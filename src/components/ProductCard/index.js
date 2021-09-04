import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addProduct } from './../../redux/Cart/cart.actions';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions';
import Button from './../forms/Button/index';
import './styles.scss';

const mapState = (state) => ({
    product: state.productsData.product
});

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const { product } = useSelector(mapState);
    const { productID } = useParams();
    const history = useHistory();

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        );

        return () => {
            dispatch(
                setProduct({})
            );
        }    
    }, []);


    const handleAddToCart = (product) => {
        if(!product) return;
        dispatch(
            addProduct(product)
        );
        history.push('/cart');
    }

    const configAddToCartBtn = {
        type: 'button'
    };

    return ( 
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} alt={productName}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>{productName}</h1>
                    </li>
                    <li>
                        <span>
                            {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCard">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)} >
                                Add To Cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span 
                            className="desc"
                            dangerouslySetInnerHTML={{__html: productDesc}}
                        />
                    </li>
                </ul>
            </div>
        </div>
     );
}
 
export default ProductCard;