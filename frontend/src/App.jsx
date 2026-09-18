import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PredictionSection from "./components/PredictionSection";
import ModelInfo from "./components/ModelInfo";
import HowItWorks from "./components/HowItWorks";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <PredictionSection />
        <ModelInfo />
        <HowItWorks />
        <Statistics />
      </main>
      <Footer />
    </div>
  );
}
