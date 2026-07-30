import type { FastifyInstance } from "fastify";
import type {
  CreateFeatureRequest,
  FeaturePriority,
  FeatureStatus
} from "@software-delivery-planner/shared";
import {
  errorResponseSchema,
  projectParamsSchema
} from "../projects/schema.js";
import { ProjectNotFoundError } from "../projects/service.js";
import {
  createFeatureBodySchema,
  featureListResponseSchema,
  featureParamsSchema,
  featureSchema,
  updateFeatureBodySchema
} from "./schema.js";
import {
  createFeature,
  FeatureNotFoundError,
  listFeaturesByProjectId,
  updateFeature
} from "./service.js";

type ProjectParams = {
  projectId: string;
};

type FeatureParams = {
  featureId: string;
};

type CreateFeatureBody = Omit<CreateFeatureRequest, "projectId">;

type UpdateFeatureBody = {
  priority?: FeaturePriority;
  status?: FeatureStatus;
};

export async function featureRoutes(app: FastifyInstance) {
  app.get<{ Params: ProjectParams }>(
    "/projects/:projectId/features",
    {
      schema: {
        tags: ["Features"],
        summary: "List features by project",
        params: projectParamsSchema,
        response: {
          200: featureListResponseSchema,
          404: errorResponseSchema
        }
      }
    },
    async (request, reply) => {
      try {
        const features = listFeaturesByProjectId(
          request.params.projectId
        );

        return reply.code(200).send({
          features
        });
      } catch (error) {
        if (error instanceof ProjectNotFoundError) {
          return reply.code(404).send({
            message: error.message
          });
        }

        throw error;
      }
    }
  );

  app.post<{
    Params: ProjectParams;
    Body: CreateFeatureBody;
  }>(
    "/projects/:projectId/features",
    {
      schema: {
        tags: ["Features"],
        summary: "Create feature for project",
        params: projectParamsSchema,
        body: createFeatureBodySchema,
        response: {
          201: featureSchema,
          400: errorResponseSchema,
          404: errorResponseSchema
        }
      }
    },
    async (request, reply) => {
      try {
        const feature = createFeature(
          request.params.projectId,
          request.body
        );

        return reply.code(201).send(feature);
      } catch (error) {
        if (error instanceof ProjectNotFoundError) {
          return reply.code(404).send({
            message: error.message
          });
        }

        throw error;
      }
    }
  );

  app.patch<{
    Params: FeatureParams;
    Body: UpdateFeatureBody;
  }>(
    "/features/:featureId",
    {
      schema: {
        tags: ["Features"],
        summary: "Update feature priority or status",
        params: featureParamsSchema,
        body: updateFeatureBodySchema,
        response: {
          200: featureSchema,
          400: errorResponseSchema,
          404: errorResponseSchema
        }
      }
    },
    async (request, reply) => {
      try {
        const feature = updateFeature(
          request.params.featureId,
          request.body
        );

        return reply.code(200).send(feature);
      } catch (error) {
        if (error instanceof FeatureNotFoundError) {
          return reply.code(404).send({
            message: error.message
          });
        }

        throw error;
      }
    }
  );
}
