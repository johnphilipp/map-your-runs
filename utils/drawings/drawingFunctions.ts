import { IPosterMaker, IToConvertCanvas } from "./drawingFunctions.types";
import polyline from "@mapbox/polyline";

export const decodePolyline = (encodedString: string): [number, number][] => {
  if (!encodedString) return [];
  const decoded = polyline.decode(encodedString);
  return decoded;
};

export const convertToCanvasCoordinates = ({
  coordinates,
  canvas,
  _scale,
}: IToConvertCanvas): [number, number][][] => {
  const newCanvasValues: [number, number][][] = [];
  for (const coordinate of coordinates) {
    const currentCoordinatesValues: [number, number][] = [];
    let minX: number = Infinity,
      minY: number = Infinity,
      maxX: number = -Infinity,
      maxY: number = -Infinity;
    coordinate.forEach((p, i) => {
      if (i === 0) {
        // if first point
        minX = maxX = p[0];
        minY = maxY = p[1];
      } else {
        minX = Math.min(p[0], minX);
        minY = Math.min(p[1], minY);
        maxX = Math.max(p[0], maxX);
        maxY = Math.max(p[1], maxY);
      }
    });
    const mapWidth = maxX - minX;
    const mapHeight = maxY - minY;
    const mapCenterX = (maxX + minX) / 2;
    const mapCenterY = (maxY + minY) / 2;
    const scale =
      _scale || Math.min(canvas.width / mapWidth, canvas.height / mapHeight);

    coordinate.forEach((p) => {
      const x = p[0];
      const y = p[1];
      currentCoordinatesValues.push([
        (x - mapCenterX) * scale + canvas.width / 2,
        (y - mapCenterY) * scale + canvas.height / 2,
      ]);
    });
    newCanvasValues.push(currentCoordinatesValues);
  }

  return newCanvasValues;
};

export const posterMaker = ({
  allDrawings,
  width,
  length,
  cols,
  rows,
  border,
}: IPosterMaker): [number, number][][] => {
  if (
    !allDrawings.length ||
    allDrawings.length === 0 ||
    allDrawings.length > 1000
  )
    return [];
  const rowLen = width / cols;
  const colLen = length / rows;
  const rowColRatio = rowLen / colLen;
  const colRowRatio = colLen / rowLen;
  // Diving by 200, because that is the original generation of canvas
  const xOffsetFromOrigin = colLen / 200;
  const YOffsetFromOrigin = rowLen / 200;
  const posterArr = [];
  let rowOffset = 0;
  let colOffset = 0;
  // all drawings
  for (let i = 0; i < allDrawings.length; i++) {
    const scaledDrawing = convertToCanvasCoordinates({
      coordinates: [allDrawings[i] as [number, number][]],
      canvas: {
        height: 200,
        width: 200,
      },
      _scale: border,
    });
    let newArr = [];
    // one drawing
    // [[x,y] [x,y] [x,y]]
    const oneDrawing = scaledDrawing[0] as [number, number][];
    for (const [x, y] of oneDrawing) {
      // drawing points
      const newCords: [number, number] = [
        rowColRatio * (x * xOffsetFromOrigin + colOffset),
        colRowRatio * (y * YOffsetFromOrigin + rowOffset),
      ];
      newArr.push(newCords);
    }
    if (
      (rows !== cols && colOffset + colLen > length) ||
      (rows === cols && colOffset + colLen >= length)
    ) {
      colOffset = 0;
      rowOffset += rowLen;
    } else {
      colOffset += colLen;
    }
    posterArr.push(newArr);
  }
  return posterArr;
  // Output :      [ [ [ 1,2 ], [ 3,4 ] ], [ [ 1,5 ] ] ]
};

export const getPolylines = (obj: any): string[] => {
  const allCoordinates = [];
  console.log({ obj });
  for (let i = 0; i < obj.runArray.length; i++) {
    const poly = obj?.runArray[i]?.map?.summary_polyline;
    if (poly) allCoordinates.push(poly);
  }
  return allCoordinates;
};

export const createPixelCoords = (
  stravaStrings: string[]
): [number, number][][] => {
  const coordinatesArray = [];
  for (const stravaString of stravaStrings) {
    coordinatesArray.push(decodePolyline(stravaString));
  }
  return coordinatesArray;
};

export const decideShape = (totalItems: number): [number, number] => {
  let cols = Math.ceil(Math.sqrt(totalItems));
  let rows = Math.ceil(totalItems / cols);
  return [rows, cols];
};

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  imagesCoordinates: [number, number][][],
  rows: number,
  cols: number,
  w: number,
  l: number,
  draw = false
) => {
  const colors = ["black"];
  const drawGrid = (rows: number, cols: number) => {
    let startX = w / cols;
    let startY = l / rows;
    for (let i = 0; i < cols; i++) {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "grey";
      ctx.moveTo(startX / 2, 0);
      ctx.lineTo(startX / 2, l);
      ctx.stroke();
      startX += (w / cols) * 2;
    }
    for (let i = 0; i < rows; i++) {
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.strokeStyle = "grey";
      ctx.moveTo(0, startY / 2);
      ctx.lineTo(w, startY / 2);
      ctx.stroke();
      startY += (l / rows) * 2;
    }
    startX = w / cols;
    startY = l / rows;

    for (let i = 0; i < cols - 1; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.moveTo(startX, 0);
      ctx.lineTo(startX, l);
      ctx.stroke();
      startX += w / cols;
    }

    for (let i = 0; i < rows - 1; i++) {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.moveTo(0, startY);
      ctx.lineTo(w, startY);
      ctx.stroke();
      startY += l / rows;
    }
  };
  draw && drawGrid(rows, cols);
  for (const canvaArr of imagesCoordinates) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors[
      Math.floor(Math.random() * colors.length)
    ] as string;
    ctx.beginPath();
    canvaArr.forEach((p) => {
      ctx.lineTo(p[0], p[1]);
    });
    ctx.stroke();
  }
};
