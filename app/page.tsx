
import Hero from "@/components/Hero";
import FeaturedShow from "@/components/FeaturedShow";
import TourDates from "@/components/TourDates";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import SponsorsCarousel from "@/components/SponsorsCarousel";
import Link from "next/link";
import TourTable from "@/components/TourTable";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedShow />
      <TourTable />
      <TourDates />
      <About />
      <SponsorsCarousel />
      <Newsletter />
    </div>
  );
}
