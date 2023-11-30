import { StateAppType } from '../redux-store';

export const currentProductSelector =(state:StateAppType)=>state.product.currentProduct;
export const allProductsSelector =(state:StateAppType)=>state.product.allProducts;


