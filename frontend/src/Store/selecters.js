import { createSelector } from '@reduxjs/toolkit';

const cartItemSeclector = (state) => state.cart.cartItem;

export const cartItemCount = createSelector(cartItemSeclector, (cartItem) =>
  cartItem.reduce((count, item) => count + item.soluong, 0)
);

export const cartItemTotal = createSelector(cartItemSeclector, (cartItem) =>
  cartItem.reduce((total, item) => total + item.soluong * item.gia, 0)
);
