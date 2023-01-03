import { Collage as CollageComp } from "../components/collage/Collage";
import { Header as HeaderComp } from "../components/header/Header";

export default function Collage() {
  return (
    <>
      <main>
        <div>
          <HeaderComp />
          <CollageComp />
        </div>
      </main>
    </>
  );
}
