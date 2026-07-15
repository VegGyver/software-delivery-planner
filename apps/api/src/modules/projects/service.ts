import type {
  CreateProjectRequest,
  Project,
  UpdateProjectRequest
} from "@software-delivery-planner/shared";
import { projectRepository } from "./repository.js";

export class ProjectValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProjectValidationError";
  }
}

export class ProjectNotFoundError extends Error {
  constructor(projectId: string) {
    super(`Project with id "${projectId}" was not found`);
    this.name = "ProjectNotFoundError";
  }
}

function validateProjectDateRange(input: {
  startDate: string;
  targetEndDate: string;
}): void {
  if (input.targetEndDate < input.startDate) {
    throw new ProjectValidationError(
      "Target end date cannot be before start date"
    );
  }
}

export function listProjects(): Project[] {
  return projectRepository.list();
}

export function getProjectById(projectId: string): Project {
  const project = projectRepository.findById(projectId);

  if (!project) {
    throw new ProjectNotFoundError(projectId);
  }

  return project;
}

export function createProject(input: CreateProjectRequest): Project {
  validateProjectDateRange({
    startDate: input.startDate,
    targetEndDate: input.targetEndDate
  });

  return projectRepository.create(input);
}

export function updateProject(
  projectId: string,
  input: UpdateProjectRequest
): Project {
  const existingProject = projectRepository.findById(projectId);

  if (!existingProject) {
    throw new ProjectNotFoundError(projectId);
  }

  const nextStartDate = input.startDate ?? existingProject.startDate;
  const nextTargetEndDate =
    input.targetEndDate ?? existingProject.targetEndDate;

  validateProjectDateRange({
    startDate: nextStartDate,
    targetEndDate: nextTargetEndDate
  });

  const updatedProject = projectRepository.update(projectId, input);

  if (!updatedProject) {
    throw new ProjectNotFoundError(projectId);
  }

  return updatedProject;
}