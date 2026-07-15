import { randomUUID } from "node:crypto";
import type {
  CreateProjectRequest,
  Project,
  UpdateProjectRequest
} from "@software-delivery-planner/shared";

const projects = new Map<string, Project>();

function cloneProject(project: Project): Project {
  return { ...project };
}

export const projectRepository = {
  list(): Project[] {
    return [...projects.values()].map(cloneProject);
  },

  findById(projectId: string): Project | undefined {
    const project = projects.get(projectId);

    if (!project) {
      return undefined;
    }

    return cloneProject(project);
  },

  create(input: CreateProjectRequest): Project {
    const now = new Date().toISOString();

    const project: Project = {
      id: randomUUID(),
      name: input.name,
      description: input.description,
      businessGoal: input.businessGoal,
      startDate: input.startDate,
      targetEndDate: input.targetEndDate,
      teamSize: input.teamSize,
      estimatedTotalEffort: input.estimatedTotalEffort,
      status: input.status ?? "draft",
      createdAt: now,
      updatedAt: now
    };

    projects.set(project.id, project);

    return cloneProject(project);
  },

  update(projectId: string, input: UpdateProjectRequest): Project | undefined {
    const existingProject = projects.get(projectId);

    if (!existingProject) {
      return undefined;
    }

    const updatedProject: Project = {
      ...existingProject,
      ...input,
      id: existingProject.id,
      createdAt: existingProject.createdAt,
      updatedAt: new Date().toISOString()
    };

    projects.set(projectId, updatedProject);

    return cloneProject(updatedProject);
  },

  clear(): void {
    projects.clear();
  }
};