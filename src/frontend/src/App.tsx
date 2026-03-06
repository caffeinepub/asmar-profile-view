import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import CertificationsSection from "./components/CertificationsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import { useActor } from "./hooks/useActor";

const CERTS_SEEDED_KEY = "asmar_certs_seeded_v1";

function CertificationsInit() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const seeded = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || seeded.current) return;
    if (localStorage.getItem(CERTS_SEEDED_KEY)) return;

    seeded.current = true;
    actor
      .addCertification("Data Analytics with AI", "", "27 June, 2025", null)
      .then(() => {
        localStorage.setItem(CERTS_SEEDED_KEY, "true");
        queryClient.invalidateQueries({ queryKey: ["certifications"] });
      })
      .catch(() => {
        seeded.current = false;
      });
  }, [actor, isFetching, queryClient]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" theme="dark" />
      <CertificationsInit />
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
