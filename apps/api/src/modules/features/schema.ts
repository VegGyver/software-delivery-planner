import {
  FEATURE_PRIORITIES,
  FEATURE_STATUSES
} from "@software-delivery-planner/shared";

const featurePriorityValues = [...FEATURE_PRIORITIES];
const featureStatusValues = [...FEATURE_STATUSES];

export const featureParamsSchema = {
  type: "object",
  required: ["featureId"],
  additionalProperties: false,
  properties: {
    featureId: {
      type: "string",
      minLength: 1
    }
  }
} as const;

export const featureSchema = {
  type: "object",
  required: [
    "id",
    "projectId",
    "title",
    "description",
    "businessValue",
    "priority",
    "status",
    "isMvp",
    "createdAt",
    "updatedAt"
  ],
  additionalProperties: false,
  properties: {
    id: {
      type: "string"
    },
    projectId: {
      type: "string"
    },
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    businessValue: {
      type: "string"
    },
    priority: {
      type: "string",
      enum: featurePriorityValues
    },
    status: {
      type: "string",
      enum: featureStatusValues
    },
    isMvp: {
      type: "boolean"
    },
    createdAt: {
      type: "string",
      format: "date-time"
    },
    updatedAt: {
      type: "string",
      format: "date-time"
    }
  }
} as const;

export const createFeatureBodySchema = {
  type: "object",
  required: [
    "title",
    "description",
    "businessValue",
    "priority",
    "status",
    "isMvp"
  ],
  additionalProperties: false,
  properties: {
    title: {
      type: "string",
      minLength: 1
    },
    description: {
      type: "string",
      minLength: 1
    },
    businessValue: {
      type: "string",
      minLength: 1
    },
    priority: {
      type: "string",
      enum: featurePriorityValues
    },
    status: {
      type: "string",
      enum: featureStatusValues
    },
    isMvp: {
      type: "boolean"
    }
  }
} as const;

export const updateFeatureBodySchema = {
  type: "object",
  minProperties: 1,
  additionalProperties: false,
  properties: {
    priority: {
      type: "string",
      enum: featurePriorityValues
    },
    status: {
      type: "string",
      enum: featureStatusValues
    }
  }
} as const;

export const featureListResponseSchema = {
  type: "object",
  required: ["features"],
  additionalProperties: false,
  properties: {
    features: {
      type: "array",
      items: featureSchema
    }
  }
} as const;
