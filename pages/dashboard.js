import { Dashboard as DashboardComp } from "../components/dashboard/Dashboard";
import { Header as HeaderComp } from "../components/header/Header";

export default function Dashboard() {
  return (
    <>
      <main>
        <div>
          <HeaderComp />
          <DashboardComp />
        </div>
      </main>
    </>
  );
}
