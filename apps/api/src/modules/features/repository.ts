import { randomUUID } from "node:crypto";
import type {
  CreateFeatureRequest,
  Feature,
  FeaturePriority,
  FeatureStatus
} from "@software-delivery-planner/shared";

const features = new Map<string, Feature>();

type UpdateFeatureFields = {
  priority?: FeaturePriority;
  status?: FeatureStatus;
};

function cloneFeature(feature: Feature): Feature {
  return { ...feature };
}

export const featureRepository = {
  listByProjectId(projectId: string): Feature[] {
    return [...features.values()]
      .filter((feature) => feature.projectId === projectId)
      .map(cloneFeature);
  },

  findById(featureId: string): Feature | undefined {
    const feature = features.get(featureId);

    if (!feature) {
      return undefined;
    }

    return cloneFeature(feature);
  },

  create(input: CreateFeatureRequest): Feature {
    const now = new Date().toISOString();

    const feature: Feature = {
      id: randomUUID(),
      projectId: input.projectId,
      title: input.title,
      description: input.description,
      businessValue: input.businessValue,
      priority: input.priority,
      status: input.status,
      isMvp: input.isMvp,
      createdAt: now,
      updatedAt: now
    };

    features.set(feature.id, feature);

    return cloneFeature(feature);
  },

  update(
    featureId: string,
    input: UpdateFeatureFields
  ): Feature | undefined {
    const existingFeature = features.get(featureId);

    if (!existingFeature) {
      return undefined;
    }

    const updatedFeature: Feature = {
      ...existingFeature,
      ...input,
      id: existingFeature.id,
      projectId: existingFeature.projectId,
      createdAt: existingFeature.createdAt,
      updatedAt: new Date().toISOString()
    };

    features.set(featureId, updatedFeature);

    return cloneFeature(updatedFeature);
  },

  clear(): void {
    features.clear();
  }
};
