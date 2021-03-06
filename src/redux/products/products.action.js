import getProductsTypes from './products.types.js';
import { firestore } from '../../firebase/firebse.utils';



export const action_fetchProductsStart = () => ({
    type: getProductsTypes.FETCH_PRODUCTS_START,
})
export const action_fetchProductsSuccess = (fetchedItems) => ({
    type: getProductsTypes.FETCH_PRODUCTS_SUCCESS,
    payload: fetchedItems
})
export const action_fetchProductsFailure = () => ({
    type: getProductsTypes.FETCH_PRODUCTS_FAILURE,
})

export const action_fetchProductsAsync = productName => {
    return async dispatch => {
        const itemsFromFireStore = [];
        const theCategory = { [`${productName}`]: itemsFromFireStore }
        let fetchProducts = firestore.collection(`${productName}`)
        dispatch(action_fetchProductsStart())
        await fetchProducts.get()
            .then(snapshot => snapshot.docs.forEach(item => itemsFromFireStore.push(item.data())))
            .catch(err => dispatch(action_fetchProductsFailure(err.message)))
        dispatch(action_fetchProductsSuccess(theCategory))
    }
}

