import  { useEffect, useState } from "react";
import "./animation.css";

const AnimateReverseMove = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Hide the icon after 2 seconds
        const timer = setTimeout(() => setShow(false), 2000);
        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    return (
        show && (
            <div className="reverse-animation">
                <i className="bi bi-arrow-counterclockwise text-3xl"></i>
            </div>
        )
    );
};

export default AnimateReverseMove;
