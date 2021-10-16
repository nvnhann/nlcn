import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItem: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hiddenMiniCart(state) {
      state.showMiniCart = false;
    },
    addtoCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItem.findIndex((x) => x.idsach === newItem.idsach);
      if (index >= 0) {
        state.cartItem[index].soluong += newItem.soluong;
        const a = JSON.parse(localStorage.getItem('cart'));
        a[index].soluong += newItem.soluong;
        localStorage.setItem('cart', JSON.stringify(a));
      } else {
        state.cartItem.push(newItem);
        const a = JSON.parse(localStorage.getItem('cart')) || [];
        a.push(newItem);
        localStorage.setItem('cart', JSON.stringify(a));
      }
    },
    setQuantity(state, action) {
      const { idsach, soluong } = action.payload;
      const index = state.cartItem.findIndex((x) => x.idsach === idsach);
      if (index >= 0) {
        state.cartItem[index].soluong = soluong;
        const a = JSON.parse(localStorage.getItem('cart'));
        a[index].soluong = soluong;
        localStorage.setItem('cart', JSON.stringify(a));
      }
    },
    removeFromCart(state, action) {
      const idRemove = action.payload;
      state.cartItem = state.cartItem.filter((x) => x.idsach !== idRemove);
      const a = JSON.parse(localStorage.getItem('cart'));
      localStorage.setItem('cart', JSON.stringify(a.filter((x) => x.idsach !== idRemove)));
    },
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hiddenMiniCart, setQuantity, removeFromCart, addtoCart } = actions;
export default reducer;
