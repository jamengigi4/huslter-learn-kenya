import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseCatalog from "@/components/CourseCatalog";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import FloatingCertificateButton from "@/components/FloatingCertificateButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CourseCatalog />
      <Testimonials />
      <Partners />
      <Pricing />
      <Footer />
      <FloatingCertificateButton />
    </div>
  );
};

export default Index;
