import { Button } from "@/components/ui/button";
import { ArrowDown, Award, Briefcase } from "lucide-react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden gradient-mesh"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/portfolio-hero-bg.dim_1200x600.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.93 0.01 80) 1px, transparent 1px), linear-gradient(90deg, oklch(0.93 0.01 80) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating decorative orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/6 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-foreground mb-4"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
            }}
          >
            Hi, I'm{" "}
            <span className="text-primary relative inline-block">
              Asmar Rashik
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/30 rounded-full" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-display text-xl md:text-2xl font-semibold text-muted-foreground mb-6"
          >
            Business Analytics Professional{" "}
            <span className="text-foreground/60 font-normal">|</span>{" "}
            Data-Driven Decision Maker
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            I transform complex data into actionable insights that drive
            business growth. Passionate about analytics, strategy, and
            continuously expanding expertise through certifications and hands-on
            projects.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button
              size="lg"
              data-ocid="hero.projects.button"
              onClick={() => scrollTo("#projects")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 px-6"
            >
              <Briefcase className="w-4 h-4" />
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.certifications.button"
              onClick={() => scrollTo("#certifications")}
              className="border-border text-foreground hover:bg-secondary hover:border-primary/50 font-semibold gap-2 px-6"
            >
              <Award className="w-4 h-4" />
              View Certifications
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 mt-12"
          >
            {[
              { value: "10+", label: "Projects Built", icon: "▲" },
              { value: "8+", label: "Certifications", icon: "◆" },
              { value: "3+", label: "Years Exp.", icon: "●" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.155 65 / 0.07) 0%, oklch(0.16 0.012 260 / 0.8) 100%)",
                }}
              >
                <span className="text-primary/50 text-xs leading-none">
                  {stat.icon}
                </span>
                <div>
                  <div className="font-display font-bold text-xl leading-none text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
