import { createSlice } from "@reduxjs/toolkit";
import { loadCart } from "../../utils/localStorage";

const initialState = {
    cartItems: loadCart(),
}
const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {

        addToCart: (state, action) => {

            const item = action.payload;

            const existingItem = state.cartItems.find(
                (product) => product._id === item._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {

                state.cartItems.push({
                    ...item,
                    quantity: 1,
                });

            }
        },

        increaseQuantity: (state, action) => {

            const item = state.cartItems.find(
                (product) => product._id === action.payload
            );

            if (item) {
                item.quantity++;
            }

        },

        decreaseQuantity: (state, action) => {

            const item = state.cartItems.find(
                (product) => product._id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity--;
            }

        },

        removeFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );

        },

        clearCart: (state) => {

            state.cartItems = [];

        },
    }
});
export const {
    addToCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} = cartSlice.actions;


export default cartSlice.reducer;