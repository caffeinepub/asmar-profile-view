import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Building2, Calendar, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useGetAllCertifications } from "../hooks/useQueries";
import type { Certification } from "../hooks/useQueries";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const ocidIndex = index + 1;
  return (
    <motion.div
      variants={cardVariants}
      data-ocid={`certifications.item.${ocidIndex}`}
      className="group relative bg-card border border-border rounded-xl p-6 card-hover gradient-border cursor-default"
    >
      {/* Card number watermark */}
      <span className="absolute top-3 right-4 font-display font-bold text-4xl text-primary/8 select-none pointer-events-none leading-none">
        {String(ocidIndex).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center mb-4">
          <Award className="w-5 h-5 text-primary" />
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-foreground mb-1 pr-8 leading-snug">
          {cert.title}
        </h3>

        {/* Issuer */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
          <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{cert.issuer}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mb-4">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span>{cert.date}</span>
        </div>

        {/* Credential button */}
        {cert.credentialUrl && (
          <Button
            variant="outline"
            size="sm"
            data-ocid="certification.credential.button"
            asChild
            className="gap-1.5 text-xs border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
          >
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Credential
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function CertSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <Skeleton className="w-10 h-10 rounded-lg mb-4 bg-muted" />
      <Skeleton className="h-5 w-4/5 mb-2 bg-muted" />
      <Skeleton className="h-4 w-3/5 mb-2 bg-muted" />
      <Skeleton className="h-3 w-2/5 mb-4 bg-muted" />
      <Skeleton className="h-8 w-32 bg-muted rounded-md" />
    </div>
  );
}

export default function CertificationsSection() {
  const { data: certs, isLoading, isError } = useGetAllCertifications();

  return (
    <section
      id="certifications"
      data-ocid="certifications.section"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Decorative bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[oklch(0.14_0.01_260)] to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="relative mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Watermark number */}
          <span
            className="absolute -top-4 right-0 font-display font-bold select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(5rem, 13vw, 10rem)",
              color: "oklch(var(--primary) / 0.06)",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            01
          </span>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/15 text-primary border border-primary/25">
              <Award className="w-3 h-3" />
              Credentials
            </span>
          </div>
          <h2
            className="font-display font-bold text-foreground gold-line"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Certifications
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl">
            Professional certifications and credentials earned through
            dedication to continuous learning and skill development.
          </p>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div
            data-ocid="certifications.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
              <CertSkeleton key={id} />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            data-ocid="certifications.error_state"
            className="text-center py-16 text-muted-foreground"
          >
            <Award className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">
              Failed to load certifications. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && (!certs || certs.length === 0) && (
          <div
            data-ocid="certifications.empty_state"
            className="text-center py-20 border border-dashed border-border rounded-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground/60 mb-1">
              No certifications yet
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon for credentials.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && certs && certs.length > 0 && (
          <motion.div
            data-ocid="certifications.list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {certs.map((cert, i) => (
              <CertCard key={String(cert.id)} cert={cert} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
