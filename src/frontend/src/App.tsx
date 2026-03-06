import { Toaster } from "@/components/ui/sonner";
import CertificationsSection from "./components/CertificationsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" theme="dark" />
      <Navbar />
      <main>
        <HeroSection />
        <CertificationsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
