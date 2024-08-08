import { IProduct } from '@/app';
import { create } from 'zustand';


interface CartItem extends IProduct {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  products: IProduct[];
  productsFiltered: IProduct[];
  setProducts: (products: IProduct[]) => void;
  setProductsFiltered: (productsFiltered: IProduct[]) => void;
  addToCart: (item: IProduct) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const useStore = create<StoreState>((set) => ({
  cart: [],
  products: [],
  productsFiltered:[],
  setProducts: (products) => set({ products,productsFiltered: products }),
  setProductsFiltered: (productsFiltered) => set({ productsFiltered }),
  addToCart: (item) => set((state) => {
    const existingItemIndex = state.cart.findIndex(
      (i) => i.name.toLowerCase() === item.name.toLowerCase()
    );

    if (existingItemIndex !== -1) {
      return {
        cart: state.cart.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }

    return {
      cart: [...state.cart, { ...item, quantity: 1 }],
    };
  }),
  updateQuantity: (itemIndex, quantity) => set((state) => ({
    cart: state.cart.map((item, index) =>
      index === itemIndex ? { ...item, quantity } : item
    ),
  })),
  removeFromCart: (idx) => set((state) => ({
    cart: state.cart.filter((_, index) => index !== idx),
  })),
  clearCart: () => set(() => ({
    cart: [],
  })),
}));

export default useStore;
