import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  total: 0,
  totalQuantity: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload.product;
      const isProductExits = state.products.find(
        (item) => item.id === product.id
      );

      // cara panjang
      state.total = state.total + product.price;

      //   shorthand;
      //   state.total += product.price;

      // cara panjang
      state.totalQuantity = state.totalQuantity + 1;

      //   shorthand;
      //   state.totalQuantity++;

      if (isProductExits) {
        isProductExits.quantity++;
        isProductExits.finalPrice += product.price;
      } else {
        state.products.push({
          ...product,
          quantity: 1,
          finalPrice: product.price,
        });
      }
    },
    decrementQuantityOfProduct(state, action) {
      const product = action.payload.product;
      const isProductExits = state.products.find(
        (item) => item.id === product.id
      );

      // decrement intianlState value
      state.total -= product.price;
      state.totalQuantity--;

      if (isProductExits.quantity <= 1) {
        state.products = state.products.filter(
          (item) => item.id !== product.id
        );
      } else {
        // decrement the product isProductExits value
        isProductExits.quantity--;
        isProductExits.finalPrice -= product.price;
      }
    },
    removeProduct(state, action) {
      const product = action.payload.product;
      const isProductExits = state.products.find(
        (item) => item.id === product.id
      );

      state.products = state.products.filter((item) => item.id !== product.id);

      // decrement intianlState value
      state.total -= product.finalPrice;
      state.totalQuantity = state.totalQuantity - product.quantity;
    },
  },
});

export const { addToCart, removeProduct, decrementQuantityOfProduct } =
  cartSlice.actions;

export const useCartSelector = () => {
  const cart = useSelector((state) => state.cart);

  return cart;
};

export default cartSlice.reducer;
