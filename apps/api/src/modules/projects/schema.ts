import { PROJECT_STATUSES } from "@software-delivery-planner/shared";

const projectStatusValues = [...PROJECT_STATUSES];

export const projectParamsSchema = {
  type: "object",
  required: ["projectId"],
  additionalProperties: false,
  properties: {
    projectId: {
      type: "string",
      minLength: 1
    }
  }
} as const;

export const projectSchema = {
  type: "object",
  required: [
    "id",
    "name",
    "description",
    "businessGoal",
    "startDate",
    "targetEndDate",
    "teamSize",
    "estimatedTotalEffort",
    "status",
    "createdAt",
    "updatedAt"
  ],
  additionalProperties: false,
  properties: {
    id: {
      type: "string"
    },
    name: {
      type: "string"
    },
    description: {
      type: "string"
    },
    businessGoal: {
      type: "string"
    },
    startDate: {
      type: "string",
      format: "date"
    },
    targetEndDate: {
      type: "string",
      format: "date"
    },
    teamSize: {
      type: "number",
      minimum: 1
    },
    estimatedTotalEffort: {
      type: "number",
      minimum: 0
    },
    status: {
      type: "string",
      enum: projectStatusValues
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

export const createProjectBodySchema = {
  type: "object",
  required: [
    "name",
    "description",
    "businessGoal",
    "startDate",
    "targetEndDate",
    "teamSize",
    "estimatedTotalEffort"
  ],
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      minLength: 1
    },
    description: {
      type: "string",
      minLength: 1
    },
    businessGoal: {
      type: "string",
      minLength: 1
    },
    startDate: {
      type: "string",
      format: "date"
    },
    targetEndDate: {
      type: "string",
      format: "date"
    },
    teamSize: {
      type: "number",
      minimum: 1
    },
    estimatedTotalEffort: {
      type: "number",
      minimum: 0
    },
    status: {
      type: "string",
      enum: projectStatusValues
    }
  }
} as const;

export const updateProjectBodySchema = {
  type: "object",
  minProperties: 1,
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      minLength: 1
    },
    description: {
      type: "string",
      minLength: 1
    },
    businessGoal: {
      type: "string",
      minLength: 1
    },
    startDate: {
      type: "string",
      format: "date"
    },
    targetEndDate: {
      type: "string",
      format: "date"
    },
    teamSize: {
      type: "number",
      minimum: 1
    },
    estimatedTotalEffort: {
      type: "number",
      minimum: 0
    },
    status: {
      type: "string",
      enum: projectStatusValues
    }
  }
} as const;

export const projectListResponseSchema = {
  type: "object",
  required: ["projects"],
  additionalProperties: false,
  properties: {
    projects: {
      type: "array",
      items: projectSchema
    }
  }
} as const;

export const errorResponseSchema = {
  type: "object",
  required: ["message"],
  additionalProperties: false,
  properties: {
    message: {
      type: "string"
    }
  }
} as const;