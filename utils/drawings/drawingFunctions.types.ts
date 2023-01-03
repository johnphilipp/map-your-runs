export interface IToConvertCanvas {
  coordinates: [number, number][][];
  _scale?: number;
  canvas: {
    width: number;
    height: number;
  };
}
export interface IPosterMaker {
  allDrawings: [number, number][][];
  width: number;
  length: number;
  cols: number;
  rows: number;
  border: number;
}
