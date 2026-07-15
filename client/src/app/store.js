import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import { saveCart } from "../utils/localStorage";
import { saveWishlist } from "../utils/localStorage";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
});

store.subscribe(() => {

    saveCart(store.getState().cart.cartItems);
    saveWishlist(store.getState().wishlist.wishlistItems);

});