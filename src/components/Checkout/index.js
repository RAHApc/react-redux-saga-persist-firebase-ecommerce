import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from './../../redux/Cart/cart.selectors'
import Button from './../forms/Button/index';
import Item from './Item';
    
const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});    

const Checkout = () => {
    const history = useHistory();
    const { cartItems, total } = useSelector(mapState);
    const errMsg = 'You have no items in your cart.';

    return ( 
        <div className="checkout">
            <h1>checkout</h1>
            <div className="cart">
                {cartItems.length > 0 ? (
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>

                        <tr>
                            <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <th>Product</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </tbody>
                            </table>
                        </tr>

                        <tr>
                            <table border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                   {cartItems.map((cartItem, pos) => {
                                       return(
                                        <tr key={pos}>
                                            <td>
                                                <Item {...cartItem}/>
                                            </td>
                                        </tr>
                                       )
                                   })}
                                </tbody>
                            </table>
                        </tr>

                        <tr>
                            <table algin="left" border="0" cellPadding="10" cellSpacing="0">
                                <tr algin="right">
                                    <td>
                                        <h3>Total: { total }</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <table border="0" cellPadding="10" cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Button onClick={() => history.goBack()}>
                                                        Continue Shopping
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button>
                                                        Checkout
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </tr>
                            </table>
                        </tr>

                    </tbody>
                </table>
                ) : (
                    <p>{ errMsg }</p>
                )}
           </div>
        </div>
     );
}
 
export default Checkout;