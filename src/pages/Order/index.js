import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import OrderDetails from './../../components/OrderDetails';
import { getOrderDetailsStart } from './../../redux/Order/orders.actions';


const mapState = ({ ordersData }) => ({
    orderDetails: ordersData.orderDetails
});

const Order = () => {
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(mapState);
    const { orderID } = useParams();
    const { orderTotal } = orderDetails;

    useEffect(() => {
        dispatch(
            getOrderDetailsStart(orderID)
        );
     }, []);

    return ( 
        <div>
            <h1>
                Order ID: #{orderID}
            </h1>

            <OrderDetails order={orderDetails} />

            <h3>
                Total: {orderTotal}
            </h3>
        </div>
     );
}
 
export default Order;