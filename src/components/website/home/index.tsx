import Footer from "../../layout/footer";
import Header from "../../layout/header";
import Features from "./features";
import Hero from "./hero";

export default function Home() {
  return (
    <div className="homePage w-full min-h-dvh">
      <Header showNav />
      <div className="px-4">
        <Hero />
        <Features />
      </div>
      <Footer />
    </div>
  );
}
