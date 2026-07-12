import { useEffect, useState } from "react";
import type { HealthResponse } from "@software-delivery-planner/shared";
import { getApiHealth } from "../shared/api/healthApi";

export function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApiHealth()
      .then((data) => {
        setHealth(data);
      })
      .catch((unknownError) => {
        const message =
          unknownError instanceof Error
            ? unknownError.message
            : "Unexpected error while checking API health";

        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section>
      <h2>Technical Walking Skeleton</h2>

      <p>
        The frontend is running and checks the backend health endpoint through
        the API layer.
      </p>

      {isLoading && <p>Checking API status...</p>}

      {error && (
        <p role="alert" style={{ color: "crimson" }}>
          API status check failed: {error}
        </p>
      )}

      {health && (
        <div>
          <h3>API Status</h3>
          <dl>
            <dt>Status</dt>
            <dd>{health.status}</dd>

            <dt>Service</dt>
            <dd>{health.service}</dd>
          </dl>
        </div>
      )}
    </section>
  );
}