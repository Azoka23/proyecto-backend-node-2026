import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    return (
        <header className="main-header">
            {/* 🔑 NUEVO TÍTULO DE BIENVENIDA */}
            <div className="welcome-title-container">
                <h1>Tienda de Café</h1>
                <p>El aroma de la calidad, el sabor de lo auténtico.</p>
            </div>
            <div className="logo-container">
                <Link to="/">
                    <img 
                        src="/images/logoCafe.png" 
                        className="logo-img" 
                    />
                </Link>
                
            </div>

            <div className="nav-container">
                <Nav />
            </div>
        </header>
    );
};
