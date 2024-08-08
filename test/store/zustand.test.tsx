// src/store/zustand.test.ts

import { render, act } from '@testing-library/react';
import React from 'react';
import useStore, { StoreState } from '@/store/zustand';
import { IProduct } from '@/app';

const TestComponent: React.FC<{ callback: (state: StoreState) => void }> = ({ callback }) => {
  const store = useStore();
  React.useEffect(() => {
    callback(store);
  }, [store, callback]);
  return null;
};

describe('useStore', () => {
  test('should initialize with empty cart and products', () => {
    let state: StoreState | undefined;
    render(
      <TestComponent callback={(s) => { state = s; }} />
    );

    expect(state?.cart).toEqual([]);
    expect(state?.products).toEqual([]);
    expect(state?.productsFiltered).toEqual([]);
  });

  test('setProducts should update products and productsFiltered', () => {
    const products: IProduct[] = [{
        id: 1, name: 'Product 1', price: 100,
        image: ''
    }];
    let state: StoreState|undefined;
    render(
      <TestComponent callback={(s) => { state = s; }} />
    );

    act(() => {
      state?.setProducts(products);
    });

    expect(state?.products).toEqual(products);
    expect(state?.productsFiltered).toEqual(products);
  });

  test('addToCart should add a product to the cart', () => {
    const product: IProduct = {
        id: 1, name: 'Product 1', price: 100,
        image: ''
    };
    let state: StoreState| undefined;
    render(
      <TestComponent callback={(s) => { state = s; }} />
    );

    act(() => {
      state?.addToCart(product);
    });

    expect(state?.cart).toContainEqual({ ...product, quantity: 1 });
  });

  test('updateQuantity should update the quantity of a cart item', () => {
    const product: IProduct = {
        id: 1, name: 'Product 1', price: 100,
        image: ''
    };
    let state: StoreState | undefined;
    render(
      <TestComponent callback={(s) => { state = s; }} />
    );

    act(() => {
      state?.addToCart(product);
      state?.updateQuantity(0, 2);
    });

    expect(state?.cart[0].quantity).toBe(2);
  });

  test('removeFromCart should remove a product from the cart', () => {
    const product: IProduct = {
        id: 1, name: 'Product 1', price: 100,
        image: ''
    };
    let state: StoreState| undefined;
    render(
      <TestComponent callback={(s) => { state = s; }} />
    );

    act(() => {
      state?.addToCart(product);
      state?.removeFromCart(0);
    });

    expect(state?.cart).toHaveLength(0);
  });

  test('clearCart should empty the cart', () => {
    const product: IProduct = {
        id: 1, name: 'Product 1', price: 100,
        image: ''
    };
    let state: StoreState| undefined;
    render(
      <TestComponent callback={(s) => { state = s; }} />
    );

    act(() => {
      state?.addToCart(product);
      state?.clearCart();
    });

    expect(state?.cart).toHaveLength(0);
  });
});
