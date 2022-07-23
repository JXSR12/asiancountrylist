import React, { useEffect, useState } from "react";
import './ScrollToTop.css';

export default function ScrollToTop() {
const [isVisible, setIsVisible] = useState(false);

const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
        setIsVisible(true);
    } else {
        setIsVisible(false);
    }
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
}, []);

return (
    <div className="scroll-to-top mb-6 ml-2 fixed-bottom">
        {isVisible && 
        <div onClick={scrollToTop}>
            <img className="arrow-icon" src='https://iconvulture.com/wp-content/uploads/2017/12/up-chevron-button.svg' alt='Back to Top'/>
        </div>}
    </div>
    );
}