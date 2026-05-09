import React from "react";
import Navbar from "../components/navbars/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/footers/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <Footer />
    </>
  );
}

export default HomePage;
