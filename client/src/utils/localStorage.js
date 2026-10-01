export const loadCart = (userId) => {
    try {
        if (!userId) return [];

        const data = localStorage.getItem(`cartItems_${userId}`);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const saveCart = (userId, cartItems) => {
    try {
        if (!userId) return;

        localStorage.setItem(
            `cartItems_${userId}`,
            JSON.stringify(cartItems)
        );
    } catch (error) {
        console.log(error);
    }
};

export const loadWishlist = (userId) => {
    try {
        if (!userId) return [];

        const data = localStorage.getItem(`wishlist_${userId}`);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const saveWishlist = (userId, wishlist) => {
    try {
        if (!userId) return;

        localStorage.setItem(
            `wishlist_${userId}`,
            JSON.stringify(wishlist)
        );
    } catch (error) {
        console.log(error);
    }
};