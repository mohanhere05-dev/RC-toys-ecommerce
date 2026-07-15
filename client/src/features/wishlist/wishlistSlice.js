import { createSlice } from "@reduxjs/toolkit";
import { loadWishlist } from "../../utils/localStorage";

const initialState = {
    wishlistItems: loadWishlist(),
};

const wishlistSlice = createSlice({
    name: "wishlist",

    initialState,

    reducers: {

        addToWishlist: (state, action) => {

            const exists = state.wishlistItems.find(
                (item) => item._id === action.payload._id
            );

            if (!exists) {
                state.wishlistItems.push(action.payload);
            }

        },

        removeFromWishlist: (state, action) => {

            state.wishlistItems = state.wishlistItems.filter(
                (item) => item._id !== action.payload
            );

        },

    },
});

export const {
    addToWishlist,
    removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;