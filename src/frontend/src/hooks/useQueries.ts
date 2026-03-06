import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Certification, Project } from "../backend.d.ts";
import { useActor } from "./useActor";

export type { Certification, Project };

const SEED_KEY = "portfolio_seeded_v1";

export function useSeedData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.seedData();
      localStorage.setItem(SEED_KEY, "true");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certifications"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useGetAllCertifications() {
  const { actor, isFetching } = useActor();
  return useQuery<Certification[]>({
    queryKey: ["certifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCertifications();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export { SEED_KEY };
