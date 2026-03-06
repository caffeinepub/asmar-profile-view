import { Heart, Mail } from "lucide-react";
import { motion } from "motion/react";
import { SiGithub, SiLinkedin } from "react-icons/si";

const socialLinks = [
  {
    icon: SiGithub,
    label: "GitHub",
    href: "https://github.com",
    ocid: "footer.github.link",
  },
  {
    icon: SiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    ocid: "footer.linkedin.link",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-border bg-[oklch(0.11_0.008_260)] overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.93 0.01 80) 1px, transparent 1px), linear-gradient(90deg, oklch(0.93 0.01 80) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold font-display">
                P
              </div>
              <span className="font-display font-bold text-foreground">
                Asmar Rashik
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Business Analytics Professional turning data into decisions that
              matter, one insight at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map(({ icon: Icon, label, href, ocid }) => (
                <motion.a
                  key={label}
                  href={href}
                  data-ocid={ocid}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
              <motion.a
                href="mailto:yourname@example.com"
                aria-label="Email"
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
            <p className="text-xs text-muted-foreground">
              Open to opportunities & collaborations.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with{" "}
            <Heart className="w-3 h-3 inline text-primary" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground/50">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
