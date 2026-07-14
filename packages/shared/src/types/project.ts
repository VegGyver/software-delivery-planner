export const PROJECT_STATUSES = [
  "draft",
  "planned",
  "in_progress",
  "completed",
  "paused"
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type Project = {
  id: string;
  name: string;
  description: string;
  businessGoal: string;
  startDate: string;
  targetEndDate: string;
  teamSize: number;
  estimatedTotalEffort: number;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectRequest = {
  name: string;
  description: string;
  businessGoal: string;
  startDate: string;
  targetEndDate: string;
  teamSize: number;
  estimatedTotalEffort: number;
  status?: ProjectStatus;
};

export type UpdateProjectRequest = Partial<CreateProjectRequest>;

export type ProjectResponse = Project;

export type ProjectListResponse = {
  projects: Project[];
};