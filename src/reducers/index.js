import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import products from './products';
import cart from './cart';
import wishlist from './wishlist';
import order from './order';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['order']
};
const rootReducer = combineReducers({
    products,
    cart,
    wishlist,
    order
});
export default persistReducer(persistConfig, rootReducer);
