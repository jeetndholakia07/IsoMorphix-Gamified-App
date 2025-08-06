import { useEffect, useState } from "react";
import "./animation.css"; 

const AnimateSolution = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 2000);
        return () => clearTimeout(timer); 
    }, []);

    return (
        show && (
            <div className="solution-animation">
                <i className="bi bi-check-circle-fill text-4xl"></i>
            </div>
        )
    );
};

export default AnimateSolution;
