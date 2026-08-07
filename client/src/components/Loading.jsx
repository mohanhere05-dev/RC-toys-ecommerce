import React from "react";
import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="car-loader-wrapper">
                {/* Clean Animated SVG Car Spinner */}
                <div className="highway"></div>
                <div className="car">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="car-icon">
                        <path d="M5 11L7 6H17L19 11M3 13H21V17C21 17.5523 20.5523 18 20 18H19C18.4477 18 18 17.5523 18 17V16H6V17C6 17.5523 5.5523 18 5 18H4C3.44772 18 3 17.5523 3 17V13ZM6.5 14.5C7.05228 14.5 7.5 14.0523 7.5 13.5C7.5 12.9477 7.05228 12.5 6.5 12.5C5.94772 12.5 5.5 12.9477 5.5 13.5C5.5 14.0523 5.94772 14.5 6.5 14.5ZM17.5 14.5C18.0523 14.5 18.5 14.0523 18.5 13.5C18.5 12.9477 18.0523 12.5 17.5 12.5C16.9477 12.5 16.5 12.9477 16.5 13.5C16.5 14.0523 16.9477 14.5 17.5 14.5Z" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <h2>Loading Products...</h2>
        </div>
    );
};

export default Loading;