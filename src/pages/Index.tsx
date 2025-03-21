
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedShow from "@/components/FeaturedShow";
import TourDates from "@/components/TourDates";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedShow />
      <TourDates />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
