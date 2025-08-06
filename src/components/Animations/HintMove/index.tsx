import "./animation.css";
import { useState, useEffect } from "react";

const AnimateHint = () => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 2000);
        return () => clearTimeout(timer); 
    }, []);
    return (
        show && (
            <div className="lightning-strike-container">
                <div className="lightning-strike bg-blue-700 px-4 py-3 text-yellow-500 rounded-sm font-semibold shadow-xl transition-all duration-300">
                    <i className="bi bi-lightbulb-fill text-2xl"></i>
                </div>
            </div>
        )
    )
}
export default AnimateHint;