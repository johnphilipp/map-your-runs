import { createContext, useContext, useState } from "react";
import { runs as stravaRuns } from "../data/runner";
import { bigrunner as bigRunner } from "../data/bigrunner";

interface IPosterContext {
  grid: boolean;
  setGrid: (grid: boolean) => void;
  scale: number;
  setScale: (scale: number) => void;
  runs: any;
  setRuns: (runs: any) => void;
  randomRun: boolean;
  setRandomRun: (randomRun: boolean) => void;
}

export const PosterContext = createContext<IPosterContext>({
  grid: false,
  setGrid: () => {},
  scale: 1,
  setScale: () => {},
  runs: [{}],
  setRuns: () => {},
  randomRun: false,
  setRandomRun: () => {},
});

export const usePosterContext = () => useContext(PosterContext);

export const PosterProvider = ({ children }: { children: React.ReactNode }) => {
  const [grid, setGrid] = useState(false);
  const [scale, setScale] = useState(0.8);
  const [runs, setRuns] = useState(stravaRuns);
  console.log("BOOM");
  console.log({ runs });
  const [randomRun, setRandomRun] = useState(false);
  const [randomRunCount, setRandomRunCount] = useState(10);

  const handleScale = (scaleChange: number) => {
    if (scale + scaleChange > 1 || scale + scaleChange < 0.1) return;
    const newNumber = scale + scaleChange;
    setScale(Math.round(newNumber * 10) / 10);
  };

  const handleRuns = (runs: number) => {
    if (runs) {
      const randomRunsArray = [];
      const filteredRuns = bigRunner.runs.filter(
        (run) => run.map?.summary_polyline
      );
      for (let i = 0; i < runs; i++) {
        // const selectedRandomRun =
        //   stravaRuns.runArray[
        //     Math.floor(Math.random() * stravaRuns.runArray.length)
        //   ]?.map?.summary_polyline

        const selectedRandomRun = filteredRuns[i]?.map?.summary_polyline;
        randomRunsArray.push({
          map: { summary_polyline: selectedRandomRun },
        });
      }

      setRuns({ runArray: randomRunsArray } as any);
      return;
    }
    setRuns(stravaRuns);
  };

  return (
    <PosterContext.Provider
      value={{
        grid,
        setGrid,
        scale,
        setScale: handleScale,
        runs,
        setRuns: handleRuns,
        randomRun,
        setRandomRun,
      }}
    >
      {children}
    </PosterContext.Provider>
  );
};
