import { useRef, useEffect } from "react";
interface ICoordinates {
  parentWidth: number;
  parentLength: number;
}
import {
  convertToCanvasCoordinates,
  createPixelCoords,
  decideShape,
  drawImage,
  getPolylines,
  posterMaker,
} from "../../utils/drawings/drawingFunctions";
import { usePosterContext } from "../../providers/PosterProvider";

export default function Canvas({ parentWidth, parentLength }: ICoordinates) {
  const { grid, scale, runs } = usePosterContext();
  console.log({ runs });
  const allPolylines = getPolylines(runs);
  const allPixelCoordinates = createPixelCoords(allPolylines);
  const width = parentWidth || 400; // window.innerWidth;
  const length = parentLength || 400; // parentLength || 400; // window.innerHeight;

  const [rows, cols] = decideShape(allPolylines.length);
  const canvas = {
    width: 200,
    height: 200,
  };
  const allCanvasCoordinates = convertToCanvasCoordinates({
    coordinates: allPixelCoordinates,
    canvas,
  });

  const posterCoordinates = posterMaker({
    allDrawings: allCanvasCoordinates,
    width,
    length,
    rows,
    cols,
    border: scale,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    console.log("drawing image");
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = length;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${length}px`;
    const ctx = canvas.getContext("2d");

    // ctx!.scale(2, 2);
    // ctx!.lineCap = 'round'
    // ctx!.fillStyle = 'white'
    // ctx!.fillRect(0, 0, canvas.width, canvas.height)
    drawImage(ctx!, posterCoordinates, rows, cols, width, length, grid);

    // ctx!.fill();
    contextRef!.current = ctx;
  }, [cols, length, posterCoordinates, rows, width, grid, runs]);

  return <canvas ref={canvasRef} />;
}
