import { CartProvider } from '@/components/cart-provider';
import Navbar from '@/components/navbar';
import Hero from '@/components/sections/hero';
import FeaturedDishes from '@/components/sections/featured-dishes';
import MenuSection from '@/components/sections/menu-section';
import SpecialOffer from '@/components/sections/special-offer';
import About from '@/components/sections/about';
import WhyChooseUs from '@/components/sections/why-choose-us';
import Reviews from '@/components/sections/reviews';
import Location from '@/components/sections/location';
import OpeningHours from '@/components/sections/opening-hours';
import Footer from '@/components/sections/footer';
import ItemModal from '@/components/item-modal';
import CartDrawer from '@/components/cart-drawer';

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <FeaturedDishes />
        <MenuSection />
        <SpecialOffer />
        <About />
        <WhyChooseUs />
        <Reviews />
        <Location />
        <OpeningHours />
      </main>
      <Footer />
      <ItemModal />
      <CartDrawer />
    </CartProvider>
  );
}
