import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Atelier } from "@/components/Atelier";
import { Formations } from "@/components/Formations";
import { InscriptionForm } from "@/components/InscriptionForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Atelier />
        <Formations />
        <InscriptionForm />
      </main>
      <Footer />
    </>
  );
};

export default Index;
