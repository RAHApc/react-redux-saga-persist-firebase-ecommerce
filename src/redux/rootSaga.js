import { all, call } from 'redux-saga/effects';


import userSagas from './User/user.sagas';
import productsSagas from './Products/products.sagas';
import ordersSagas from './Order/orders.sagas';

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(productsSagas),
        call(ordersSagas),
    ])
}