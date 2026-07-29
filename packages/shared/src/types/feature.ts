export const FEATURE_PRIORITIES = [
  "low",
  "medium",
  "high"
] as const;

export type FeaturePriority = (typeof FEATURE_PRIORITIES)[number];

export const FEATURE_STATUSES = [
  "proposed",
  "planned",
  "in_progress",
  "done",
  "deferred"
] as const;

export type FeatureStatus = (typeof FEATURE_STATUSES)[number];

export type Feature = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  businessValue: string;
  priority: FeaturePriority;
  status: FeatureStatus;
  isMvp: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateFeatureRequest = {
  projectId: string;
  title: string;
  description: string;
  businessValue: string;
  priority: FeaturePriority;
  status: FeatureStatus;
  isMvp: boolean;
};

export type UpdateFeatureRequest = Partial<CreateFeatureRequest>;

export type FeatureResponse = Feature;

export type FeatureListResponse = {
  features: Feature[];
};
