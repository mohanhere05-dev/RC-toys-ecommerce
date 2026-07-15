import { useSelector } from "react-redux";
import "./OrderSummary.css";
import { MdOutlineVerifiedUser } from "react-icons/md";


const OrderSummary = () => {

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const subtotal = cartItems.reduce(

        (total, item) =>

            total + item.price * item.quantity,

        0

    );

    const shipping = subtotal > 0 ? 0 : 0;

    const total = subtotal + shipping;

    return (

        <div className="summary-card">

            <h2>Order Summary</h2>

            <div className="summary-products">

                {

                    cartItems.length === 0 ?

                        (

                            <p>Your cart is empty.</p>

                        )

                        :

                        (

                            cartItems.map((item) => (

                                <div
                                    key={item._id}
                                    className="summary-item"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div>

                                        <h4>{item.name}</h4>

                                        <p>

                                            Qty : {item.quantity}

                                        </p>

                                    </div>

                                    <span>

                                        ₹

                                        {

                                            item.price *

                                            item.quantity

                                        }

                                    </span>

                                </div>

                            ))

                        )

                }

            </div>

            <div className="summary-total">

                <div>

                    <span>Subtotal</span>

                    <span>₹{subtotal}</span>

                </div>

                <div>

                    <span>Shipping</span>

                    <span>

                        {

                            shipping === 0

                                ?

                                "FREE"

                                :

                                `₹${shipping}`

                        }

                    </span>


                </div>
                <div>
                    <span>GST</span>
                    <span>15%</span>
                </div>
                <hr />

                <div className="grand-total">

                    <span>Total</span>

                    <span>₹{total}</span>

                </div>

            </div>

            <div className="warenty">
                <div><MdOutlineVerifiedUser /></div>
                <div>
                    <h4>Precision Guarantee</h4>
                    <p>1-year limited warranty and 30-day no-hassle returns included.</p>
                </div>
            </div>

        </div>

    );

};

export default OrderSummary;