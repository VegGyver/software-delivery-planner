import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { healthRoutes } from "./modules/health/routes.js";
import { featureRoutes } from "./modules/features/routes.js";
import { projectRoutes } from "./modules/projects/routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: true
  });

  await app.register(cors, {
    origin: true
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "Software Delivery Planner API",
        description: "API for planning and tracking software delivery projects.",
        version: "0.1.0"
      }
    }
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs"
  });

  await app.register(healthRoutes);
  await app.register(projectRoutes);
  await app.register(featureRoutes);

  return app;
}
