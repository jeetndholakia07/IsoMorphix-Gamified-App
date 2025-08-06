import  { useEffect, useState } from "react";
import "./animation.css";

const AnimateSuperPower = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 2000);
        return () => clearTimeout(timer); 
    }, []);

    return (
        show && (
            <div className="super-power-animation">
                <i className="bi bi-lightning-fill text-4xl"></i>
            </div>
        )
    );
};

export default AnimateSuperPower;
