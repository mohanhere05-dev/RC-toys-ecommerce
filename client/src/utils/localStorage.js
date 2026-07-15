export const loadCart = () => {
    try {
        const data = localStorage.getItem("cartItems");

        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

export const saveCart = (cartItems) => {
    try {
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );
    } catch (error) {
        console.log(error);
    }
};

export const loadWishlist = () => {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
};

export const saveWishlist = (wishlist) => {
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
};