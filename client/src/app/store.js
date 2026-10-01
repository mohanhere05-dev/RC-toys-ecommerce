import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import {
    saveCart,
    saveWishlist,
} from "../utils/localStorage";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
});

store.subscribe(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?._id) return;

    const state = store.getState();

    saveCart(user._id, state.cart.cartItems);
    saveWishlist(user._id, state.wishlist.wishlistItems);
});