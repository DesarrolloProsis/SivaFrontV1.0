import React from "react";
import "./Footer.css";
function Footer() {
    const info = "©2019 Proyectos y Sistemas Informáticos S.A. de C.V."
    return (
        <footer className="footer">
            <div className="container">
                <span >{info}</span>
            </div>
        </footer>
    )
}
export default Footer;