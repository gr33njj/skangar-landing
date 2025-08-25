import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AdvantagesSection } from "./components/AdvantagesSection"; 
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactsSection } from "./components/ContactsSection";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <HeroSection />
          <AdvantagesSection />
          <ServicesSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactsSection />
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;