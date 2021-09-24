import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducers';
import cartReducer from './Cart/cart.reducers';
import ordersReducer from './Order/orders.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer
});

const configStorage = {
    key:'root',
    storage,
    whiteList: ['cartData']
};

export default persistReducer(configStorage, rootReducer);