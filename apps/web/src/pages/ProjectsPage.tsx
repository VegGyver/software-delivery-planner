import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type {
  CreateProjectRequest,
  Project,
  ProjectStatus
} from "@software-delivery-planner/shared";
import { PROJECT_STATUSES } from "@software-delivery-planner/shared";
import { createProject, fetchProjects } from "../shared/api/projectsApi";

type ProjectFormState = {
  name: string;
  description: string;
  businessGoal: string;
  startDate: string;
  targetEndDate: string;
  teamSize: string;
  estimatedTotalEffort: string;
  status: ProjectStatus;
};

const initialFormState: ProjectFormState = {
  name: "Customer Portal Rebuild",
  description: "Rebuild the legacy customer portal with a cleaner MVP scope.",
  businessGoal: "Improve maintainability and delivery predictability.",
  startDate: "2026-01-01",
  targetEndDate: "2026-03-31",
  teamSize: "4",
  estimatedTotalEffort: "240",
  status: "draft"
};

function formatStatus(status: ProjectStatus): string {
  return status.replaceAll("_", " ");
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formState, setFormState] =
    useState<ProjectFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadProjects() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetchProjects();

      setProjects(response.projects);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load projects"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  function updateField<FieldName extends keyof ProjectFormState>(
    fieldName: FieldName,
    value: ProjectFormState[FieldName]
  ) {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [fieldName]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CreateProjectRequest = {
      name: formState.name,
      description: formState.description,
      businessGoal: formState.businessGoal,
      startDate: formState.startDate,
      targetEndDate: formState.targetEndDate,
      teamSize: Number(formState.teamSize),
      estimatedTotalEffort: Number(formState.estimatedTotalEffort),
      status: formState.status
    };

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const createdProject = await createProject(payload);

      setProjects((currentProjects) => [...currentProjects, createdProject]);
      setFormState(initialFormState);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to create project"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section>
        <h1>Projects</h1>
        <p>
          Create and monitor software delivery projects using shared contracts
          between frontend and backend.
        </p>
      </section>

      {errorMessage ? (
        <section role="alert">
          <strong>Error:</strong> {errorMessage}
        </section>
      ) : null}

      <section>
        <h2>Create project</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="project-name">Name</label>
            <input
              id="project-name"
              name="name"
              required
              value={formState.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              name="description"
              required
              value={formState.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="project-business-goal">Business goal</label>
            <textarea
              id="project-business-goal"
              name="businessGoal"
              required
              value={formState.businessGoal}
              onChange={(event) =>
                updateField("businessGoal", event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="project-start-date">Start date</label>
            <input
              id="project-start-date"
              name="startDate"
              required
              type="date"
              value={formState.startDate}
              onChange={(event) => updateField("startDate", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="project-target-end-date">Target end date</label>
            <input
              id="project-target-end-date"
              name="targetEndDate"
              required
              type="date"
              value={formState.targetEndDate}
              onChange={(event) =>
                updateField("targetEndDate", event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="project-team-size">Team size</label>
            <input
              id="project-team-size"
              name="teamSize"
              min="1"
              required
              type="number"
              value={formState.teamSize}
              onChange={(event) => updateField("teamSize", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="project-estimated-effort">
              Estimated total effort
            </label>
            <input
              id="project-estimated-effort"
              name="estimatedTotalEffort"
              min="0"
              required
              type="number"
              value={formState.estimatedTotalEffort}
              onChange={(event) =>
                updateField("estimatedTotalEffort", event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="project-status">Status</label>
            <select
              id="project-status"
              name="status"
              value={formState.status}
              onChange={(event) =>
                updateField("status", event.target.value as ProjectStatus)
              }
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </div>

          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating..." : "Create project"}
          </button>
        </form>
      </section>

      <section>
        <h2>Project list</h2>

        {isLoading ? <p>Loading projects...</p> : null}

        {!isLoading && projects.length === 0 ? (
          <p>No projects created yet.</p>
        ) : null}

        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <article>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <dl>
                    <dt>Business goal</dt>
                    <dd>{project.businessGoal}</dd>

                    <dt>Status</dt>
                    <dd>{formatStatus(project.status)}</dd>

                    <dt>Timeline</dt>
                    <dd>
                      {project.startDate} → {project.targetEndDate}
                    </dd>

                    <dt>Team size</dt>
                    <dd>{project.teamSize}</dd>

                    <dt>Estimated effort</dt>
                    <dd>{project.estimatedTotalEffort} hours</dd>
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}