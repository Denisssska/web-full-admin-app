import { StateAppType } from '../redux-store';

export const currentProductSelector =(state:StateAppType)=>state.product.currentProduct;


