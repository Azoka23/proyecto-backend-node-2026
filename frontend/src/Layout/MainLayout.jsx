import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { HomeButton } from "../components/HomeButton/HomeButton";
import { Outlet } from "react-router-dom"; 
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <>
    <div className="main-layout-container">
      <Header />
        <Outlet />
      <Footer />
      <HomeButton />
    </div>
    </>
  );
};
