import { actions, NAMESPACE, selectors, reducer } from './duck';

export const ProductDuck = { actions, NAMESPACE, selectors, reducer };
export * from './ProductList';
export * from './ProductForm';
export * from './ProductDetail';
