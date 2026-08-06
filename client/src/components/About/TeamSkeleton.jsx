import React from "react";
import "./TeamSkeleton.css";

const TeamSkeleton = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="team-card team-skeleton-card">
                    <div className="skeleton-avatar"></div>
                    <div className="team-skeleton-body">
                        <div className="skeleton-line skeleton-name"></div>
                        <div className="skeleton-line skeleton-role"></div>
                        <div className="skeleton-line skeleton-text"></div>
                        <div className="skeleton-line skeleton-text short"></div>
                        <div className="social-skeletons">
                            <span className="skeleton-social"></span>
                            <span className="skeleton-social"></span>
                            <span className="skeleton-social"></span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TeamSkeleton;
