import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Project, ProjectListResponse } from "@software-delivery-planner/shared";
import { ProjectsPage } from "./ProjectsPage";

const projectFixture: Project = {
  id: "project-1",
  name: "Customer Portal Rebuild",
  description: "Rebuild the legacy customer portal with a cleaner MVP scope.",
  businessGoal: "Improve maintainability and delivery predictability.",
  startDate: "2026-01-01",
  targetEndDate: "2026-03-31",
  teamSize: 4,
  estimatedTotalEffort: 240,
  status: "draft",
  createdAt: "2026-01-01T10:00:00.000Z",
  updatedAt: "2026-01-01T10:00:00.000Z"
};

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: init?.status ?? 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

describe("ProjectsPage", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads and displays existing projects", async () => {
    const listResponse: ProjectListResponse = {
      projects: [projectFixture]
    };

    fetchMock.mockResolvedValueOnce(jsonResponse(listResponse));

    render(<ProjectsPage />);

    expect(screen.getByText("Loading projects...")).toBeInTheDocument();

    const projectHeading = await screen.findByRole("heading", {
        name: projectFixture.name
    });

    expect(projectHeading).toBeInTheDocument();

    const projectArticle = projectHeading.closest("article");

    expect(projectArticle).not.toBeNull();

    const projectCard = within(projectArticle as HTMLElement);

    expect(projectCard.getByText(projectFixture.description)).toBeInTheDocument();
    expect(projectCard.getByText(projectFixture.businessGoal)).toBeInTheDocument();
    expect(projectCard.getByText("draft")).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledWith("http://127.0.0.1:3001/projects");
  });

  it("creates a project and displays it in the list", async () => {
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({
          projects: []
        } satisfies ProjectListResponse)
      )
      .mockResolvedValueOnce(jsonResponse(projectFixture, { status: 201 }));

    render(<ProjectsPage />);

    expect(await screen.findByText("No projects created yet.")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create project"
      })
    );

    expect(
      await screen.findByRole("heading", {
        name: projectFixture.name
      })
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(2);

    expect(fetchMock).toHaveBeenLastCalledWith(
      "http://127.0.0.1:3001/projects",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Customer Portal Rebuild",
          description: "Rebuild the legacy customer portal with a cleaner MVP scope.",
          businessGoal: "Improve maintainability and delivery predictability.",
          startDate: "2026-01-01",
          targetEndDate: "2026-03-31",
          teamSize: 4,
          estimatedTotalEffort: 240,
          status: "draft"
        })
      })
    );
  });

  it("shows an error message when project loading fails", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse(
        {
          message: "Unable to load projects"
        },
        {
          status: 500
        }
      )
    );

    render(<ProjectsPage />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to load projects"
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading projects...")).not.toBeInTheDocument();
    });
  });
});