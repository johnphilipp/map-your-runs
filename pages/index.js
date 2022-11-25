import { Header as HeaderComp } from "../components/header/Header";
import { Home as HomeComp } from "../components/home/Home";

export default function Home() {
  return (
    <>
      <main>
        <div>
          <HeaderComp />
          <HomeComp />
        </div>
      </main>
    </>
  );
}
