import React, { useRef, useState, useLayoutEffect, ReactNode } from "react";
import { Container } from "../utils/Container";
import { PosterControlForm } from "./PosterControlForm";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

export function Collage() {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  return (
    <Container>
      <h1 className="text-gray-600 text-3xl font-medium">Collage</h1>
      <h2 className="text-red-400 text-lg md:text-xl font-light mb-8 mt-2">
        * This feature is WIP *
      </h2>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div
          ref={ref}
          className="col-span-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <Canvas parentWidth={width} parentLength={height} />
        </div>
        <div className="mt-8 md:mt-0 p-6 text-gray-600 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <h2 className="title text-lg md:text-xl mb-4">Edit Collage</h2>
          <PosterControlForm />
        </div>
      </div>
      {/* Width: {width}
      Height: {height} */}
      <br />
      <br />
    </Container>
  );
}
