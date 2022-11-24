import { Heatmap as HeatmapComp } from "../components/heatmap/Heatmap";
import { Header as HeaderComp } from "../components/header/Header";

export default function Heatmap() {
  return (
    <>
      <main>
        <div>
          <HeaderComp />
          <HeatmapComp />
        </div>
      </main>
    </>
  );
}
