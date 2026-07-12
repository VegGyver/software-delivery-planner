import type { FastifyInstance } from "fastify";
import type { HealthResponse } from "@software-delivery-planner/shared";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async (): Promise<HealthResponse> => {
    return {
      status: "ok",
      service: "software-delivery-planner-api"
    };
  });
}