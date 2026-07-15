import type { FastifyInstance } from "fastify";
import type {
  CreateProjectRequest,
  UpdateProjectRequest
} from "@software-delivery-planner/shared";
import {
  createProjectBodySchema,
  errorResponseSchema,
  projectListResponseSchema,
  projectParamsSchema,
  projectSchema,
  updateProjectBodySchema
} from "./schema.js";
import {
  createProject,
  getProjectById,
  listProjects,
  ProjectNotFoundError,
  ProjectValidationError,
  updateProject
} from "./service.js";

type ProjectParams = {
  projectId: string;
};

export async function projectRoutes(app: FastifyInstance) {
  app.get(
    "/projects",
    {
      schema: {
        tags: ["Projects"],
        summary: "List projects",
        response: {
          200: projectListResponseSchema
        }
      }
    },
    async (_request, reply) => {
      const projects = listProjects();

      return reply.code(200).send({
        projects
      });
    }
  );

  app.post<{ Body: CreateProjectRequest }>(
    "/projects",
    {
      schema: {
        tags: ["Projects"],
        summary: "Create project",
        body: createProjectBodySchema,
        response: {
          201: projectSchema,
          400: errorResponseSchema
        }
      }
    },
    async (request, reply) => {
      try {
        const project = createProject(request.body);

        return reply.code(201).send(project);
      } catch (error) {
        if (error instanceof ProjectValidationError) {
          return reply.code(400).send({
            message: error.message
          });
        }

        throw error;
      }
    }
  );

  app.get<{ Params: ProjectParams }>(
    "/projects/:projectId",
    {
      schema: {
        tags: ["Projects"],
        summary: "Get project by ID",
        params: projectParamsSchema,
        response: {
          200: projectSchema,
          404: errorResponseSchema
        }
      }
    },
    async (request, reply) => {
      try {
        const project = getProjectById(request.params.projectId);

        return reply.code(200).send(project);
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
    Params: ProjectParams;
    Body: UpdateProjectRequest;
  }>(
    "/projects/:projectId",
    {
      schema: {
        tags: ["Projects"],
        summary: "Update project",
        params: projectParamsSchema,
        body: updateProjectBodySchema,
        response: {
          200: projectSchema,
          400: errorResponseSchema,
          404: errorResponseSchema
        }
      }
    },
    async (request, reply) => {
      try {
        const project = updateProject(request.params.projectId, request.body);

        return reply.code(200).send(project);
      } catch (error) {
        if (error instanceof ProjectValidationError) {
          return reply.code(400).send({
            message: error.message
          });
        }

        if (error instanceof ProjectNotFoundError) {
          return reply.code(404).send({
            message: error.message
          });
        }

        throw error;
      }
    }
  );
}