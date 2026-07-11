import type { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>Software Delivery Planner</h1>
        <p>Planning, tracking and KPI analysis for software delivery projects.</p>
      </header>

      <main>{children}</main>
    </div>
  );
}