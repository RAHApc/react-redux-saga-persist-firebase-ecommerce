import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducers';
import cartReducer from './Cart/cart.reducers';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer
});

const configStorage = {
    key:'root',
    storage,
    whiteList: ['cartData']
};

export default persistReducer(configStorage, rootReducer);