import CheckoutButton from "./components/checkoutButton";
import ContactSection from "./components/contact";
import Footer from "./components/footer";
import HeroSection from "./components/hero";
import InfoSection1 from "./components/info";
import InfoSection2 from "./components/info2";
import MainSection from "./components/main";
import Navbar from "./components/nav";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <CheckoutButton />
    <MainSection />
    <InfoSection1 />
    <InfoSection2 />
    <ContactSection />
    <Footer />
  </>
  );
}
