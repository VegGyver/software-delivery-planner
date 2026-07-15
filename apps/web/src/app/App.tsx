import { Link, Outlet } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";

export function App() {
  return (
    <AppLayout>
      <header>
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/projects">Projects</Link>
        </nav>
      </header>
      <Outlet />
    </AppLayout>
  );
}