import type {
  CreateFeatureRequest,
  Feature,
  FeaturePriority,
  FeatureStatus
} from "@software-delivery-planner/shared";
import { getProjectById } from "../projects/service.js";
import { featureRepository } from "./repository.js";

type CreateFeatureFields = Omit<CreateFeatureRequest, "projectId">;

type UpdateFeatureFields = {
  priority?: FeaturePriority;
  status?: FeatureStatus;
};

export class FeatureNotFoundError extends Error {
  constructor(featureId: string) {
    super(`Feature with id "${featureId}" was not found`);
    this.name = "FeatureNotFoundError";
  }
}

export function listFeaturesByProjectId(projectId: string): Feature[] {
  getProjectById(projectId);

  return featureRepository.listByProjectId(projectId);
}

export function createFeature(
  projectId: string,
  input: CreateFeatureFields
): Feature {
  getProjectById(projectId);

  return featureRepository.create({
    ...input,
    projectId
  });
}

export function updateFeature(
  featureId: string,
  input: UpdateFeatureFields
): Feature {
  const updatedFeature = featureRepository.update(featureId, input);

  if (!updatedFeature) {
    throw new FeatureNotFoundError(featureId);
  }

  return updatedFeature;
}
