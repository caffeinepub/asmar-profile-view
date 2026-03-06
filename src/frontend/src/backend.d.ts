import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Project {
    id: bigint;
    title: string;
    description: string;
    repoUrl?: string;
    liveUrl?: string;
    techStack: Array<string>;
}
export interface Certification {
    id: bigint;
    title: string;
    date: string;
    issuer: string;
    credentialUrl?: string;
}
export interface backendInterface {
    addCertification(title: string, issuer: string, date: string, credentialUrl: string | null): Promise<Certification>;
    addProject(title: string, description: string, techStack: Array<string>, liveUrl: string | null, repoUrl: string | null): Promise<Project>;
    getAllCertifications(): Promise<Array<Certification>>;
    getAllProjects(): Promise<Array<Project>>;
    getCertification(id: bigint): Promise<Certification>;
    getProject(id: bigint): Promise<Project>;
    seedData(): Promise<void>;
    updateCertification(id: bigint, title: string, issuer: string, date: string, credentialUrl: string | null): Promise<Certification>;
    updateProject(id: bigint, title: string, description: string, techStack: Array<string>, liveUrl: string | null, repoUrl: string | null): Promise<Project>;
}
