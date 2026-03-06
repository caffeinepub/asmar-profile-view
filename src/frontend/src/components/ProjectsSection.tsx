import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Code2, ExternalLink, Github, Layers } from "lucide-react";
import { motion } from "motion/react";
import { useGetAllProjects } from "../hooks/useQueries";
import type { Project } from "../hooks/useQueries";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ocidIndex = index + 1;
  return (
    <motion.div
      variants={cardVariants}
      data-ocid={`projects.item.${ocidIndex}`}
      className="group relative bg-card border border-border rounded-xl p-6 card-hover gradient-border flex flex-col cursor-default"
    >
      {/* Card number watermark */}
      <span className="absolute top-3 right-4 font-display font-bold text-4xl text-primary/8 select-none pointer-events-none leading-none">
        {String(ocidIndex).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center mb-4">
          <Code2 className="w-5 h-5 text-primary" />
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-foreground mb-2 pr-8 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          {project.liveUrl && (
            <Button
              variant="default"
              size="sm"
              data-ocid="project.live_demo.button"
              asChild
              className="gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button
              variant="outline"
              size="sm"
              data-ocid="project.repo.button"
              asChild
              className="gap-1.5 text-xs border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5"
            >
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3">
      <Skeleton className="w-10 h-10 rounded-lg bg-muted" />
      <Skeleton className="h-5 w-3/4 bg-muted" />
      <Skeleton className="h-4 w-full bg-muted" />
      <Skeleton className="h-4 w-5/6 bg-muted" />
      <div className="flex gap-1.5 mt-1">
        <Skeleton className="h-5 w-16 rounded-full bg-muted" />
        <Skeleton className="h-5 w-14 rounded-full bg-muted" />
        <Skeleton className="h-5 w-12 rounded-full bg-muted" />
      </div>
      <div className="flex gap-2 mt-1">
        <Skeleton className="h-8 w-24 rounded-md bg-muted" />
        <Skeleton className="h-8 w-20 rounded-md bg-muted" />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { data: projects, isLoading, isError } = useGetAllProjects();

  return (
    <section
      id="projects"
      data-ocid="projects.section"
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Subtle bg variation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0.01_260)] via-background to-[oklch(0.14_0.01_260)] pointer-events-none" />

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
            02
          </span>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/15 text-primary border border-primary/25">
              <Code2 className="w-3 h-3" />
              Work
            </span>
          </div>
          <h2
            className="font-display font-bold text-foreground gold-line"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Projects
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl">
            A collection of projects built with modern technologies — from
            full-stack web apps to experimental side projects.
          </p>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div
            data-ocid="projects.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
              <ProjectSkeleton key={id} />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            data-ocid="projects.error_state"
            className="text-center py-16 text-muted-foreground"
          >
            <Layers className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">
              Failed to load projects. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && (!projects || projects.length === 0) && (
          <div
            data-ocid="projects.empty_state"
            className="text-center py-20 border border-dashed border-border rounded-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground/60 mb-1">
              No projects yet
            </p>
            <p className="text-sm text-muted-foreground">
              Projects will appear here soon.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && projects && projects.length > 0 && (
          <motion.div
            data-ocid="projects.list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={String(project.id)}
                project={project}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
