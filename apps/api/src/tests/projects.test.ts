import { beforeEach, describe, expect, it } from "vitest";
import type {
  CreateProjectRequest,
  ProjectListResponse,
  ProjectResponse,
  UpdateProjectRequest
} from "@software-delivery-planner/shared";
import { buildApp } from "../app.js";
import { projectRepository } from "../modules/projects/repository.js";

const validCreateProjectRequest: CreateProjectRequest = {
  name: "Customer Portal Rebuild",
  description: "Rebuild the legacy customer portal with a cleaner MVP scope.",
  businessGoal: "Improve maintainability and delivery predictability.",
  startDate: "2026-01-01",
  targetEndDate: "2026-03-31",
  teamSize: 4,
  estimatedTotalEffort: 240
};

beforeEach(() => {
  projectRepository.clear();
});

describe("project routes", () => {
  it("creates and lists projects", async () => {
    const app = await buildApp();

    try {
      const createResponse = await app.inject({
        method: "POST",
        url: "/projects",
        payload: validCreateProjectRequest
      });

      expect(createResponse.statusCode).toBe(201);

      const createdProject = JSON.parse(
        createResponse.body
      ) as ProjectResponse;

      expect(createdProject.id).toEqual(expect.any(String));
      expect(createdProject.name).toBe(validCreateProjectRequest.name);
      expect(createdProject.status).toBe("draft");
      expect(createdProject.createdAt).toEqual(expect.any(String));
      expect(createdProject.updatedAt).toEqual(expect.any(String));

      const listResponse = await app.inject({
        method: "GET",
        url: "/projects"
      });

      expect(listResponse.statusCode).toBe(200);

      const listBody = JSON.parse(listResponse.body) as ProjectListResponse;

      expect(listBody.projects).toHaveLength(1);
      expect(listBody.projects[0]?.id).toBe(createdProject.id);
    } finally {
      await app.close();
    }
  });

  it("returns a project by id", async () => {
    const app = await buildApp();

    try {
      const createResponse = await app.inject({
        method: "POST",
        url: "/projects",
        payload: validCreateProjectRequest
      });

      const createdProject = JSON.parse(
        createResponse.body
      ) as ProjectResponse;

      const detailResponse = await app.inject({
        method: "GET",
        url: `/projects/${createdProject.id}`
      });

      expect(detailResponse.statusCode).toBe(200);

      const project = JSON.parse(detailResponse.body) as ProjectResponse;

      expect(project.id).toBe(createdProject.id);
      expect(project.name).toBe(validCreateProjectRequest.name);
    } finally {
      await app.close();
    }
  });

  it("updates a project", async () => {
    const app = await buildApp();

    try {
      const createResponse = await app.inject({
        method: "POST",
        url: "/projects",
        payload: validCreateProjectRequest
      });

      const createdProject = JSON.parse(
        createResponse.body
      ) as ProjectResponse;

      const updatePayload: UpdateProjectRequest = {
        status: "in_progress",
        estimatedTotalEffort: 260
      };

      const updateResponse = await app.inject({
        method: "PATCH",
        url: `/projects/${createdProject.id}`,
        payload: updatePayload
      });

      expect(updateResponse.statusCode).toBe(200);

      const updatedProject = JSON.parse(
        updateResponse.body
      ) as ProjectResponse;

      expect(updatedProject.id).toBe(createdProject.id);
      expect(updatedProject.status).toBe("in_progress");
      expect(updatedProject.estimatedTotalEffort).toBe(260);
      expect(updatedProject.createdAt).toBe(createdProject.createdAt);
      expect(updatedProject.updatedAt).not.toBe(createdProject.updatedAt);
    } finally {
      await app.close();
    }
  });

  it("returns 404 when project does not exist", async () => {
    const app = await buildApp();

    try {
      const response = await app.inject({
        method: "GET",
        url: "/projects/missing-project-id"
      });

      expect(response.statusCode).toBe(404);

      const body = JSON.parse(response.body) as { message: string };

      expect(body.message).toContain("missing-project-id");
    } finally {
      await app.close();
    }
  });

  it("returns 400 when target end date is before start date", async () => {
    const app = await buildApp();

    try {
      const response = await app.inject({
        method: "POST",
        url: "/projects",
        payload: {
          ...validCreateProjectRequest,
          startDate: "2026-04-01",
          targetEndDate: "2026-03-31"
        }
      });

      expect(response.statusCode).toBe(400);

      const body = JSON.parse(response.body) as { message: string };

      expect(body.message).toBe(
        "Target end date cannot be before start date"
      );
    } finally {
      await app.close();
    }
  });
});