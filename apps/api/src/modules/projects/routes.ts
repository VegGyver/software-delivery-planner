import type { FastifyInstance } from "fastify";
import {
  createProjectBodySchema,
  errorResponseSchema,
  projectListResponseSchema,
  projectParamsSchema,
  projectSchema,
  updateProjectBodySchema
} from "./schema.js";

export async function projectRoutes(app: FastifyInstance) {
  app.get(
    "/projects",
    {
      schema: {
        tags: ["Projects"],
        summary: "List projects",
        response: {
          200: projectListResponseSchema,
          501: errorResponseSchema
        }
      }
    },
    async (_request, reply) => {
      return reply.code(501).send({
        message: "Project listing is not implemented yet"
      });
    }
  );

  app.post(
    "/projects",
    {
      schema: {
        tags: ["Projects"],
        summary: "Create project",
        body: createProjectBodySchema,
        response: {
          201: projectSchema,
          501: errorResponseSchema
        }
      }
    },
    async (_request, reply) => {
      return reply.code(501).send({
        message: "Project creation is not implemented yet"
      });
    }
  );

  app.get(
    "/projects/:projectId",
    {
      schema: {
        tags: ["Projects"],
        summary: "Get project by ID",
        params: projectParamsSchema,
        response: {
          200: projectSchema,
          501: errorResponseSchema
        }
      }
    },
    async (_request, reply) => {
      return reply.code(501).send({
        message: "Project detail is not implemented yet"
      });
    }
  );

  app.patch(
    "/projects/:projectId",
    {
      schema: {
        tags: ["Projects"],
        summary: "Update project",
        params: projectParamsSchema,
        body: updateProjectBodySchema,
        response: {
          200: projectSchema,
          501: errorResponseSchema
        }
      }
    },
    async (_request, reply) => {
      return reply.code(501).send({
        message: "Project update is not implemented yet"
      });
    }
  );
}