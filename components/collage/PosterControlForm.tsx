import { usePosterContext } from "../../providers/PosterProvider";
import Toggle from "./Toggle";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { useMemo } from "react";
import debounce from "lodash.debounce";

function InputForm({ text, onTypeFn }: any) {
  const buttonHandler = (event: any) => {
    console.log("target", event.target.value);
    onTypeFn(Number(event.target.value));
  };

  const debouncedEventHandler = useMemo(() => debounce(buttonHandler, 300), []);

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {text}
      </label>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          id="email"
          className="block h-8 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={debouncedEventHandler}
        />
      </div>
    </div>
  );
}

function DoubleButton({ leftOnClick, rightOnClick }: any) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        onClick={leftOnClick}
      >
        <span className="sr-only">Previous</span>
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        onClick={rightOnClick}
      >
        <span className="sr-only">Next</span>
        <MinusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </span>
  );
}

export function PosterControlForm() {
  const {
    setGrid,
    grid,
    setScale,
    scale,
    runs,
    setRuns,
    randomRun,
    setRandomRun,
  } = usePosterContext();
  const increaseScale = () => setScale(0.1);
  const decreaseScale = () => setScale(-0.1);
  const handleFormSubmit = (value: number) => {
    setRuns(value);
  };
  const items = [
    <Toggle key="hello" value={grid} setValue={setGrid} title={"Grid"} />,
    <div key="whatsup">
      <InputForm
        text={"Enter number of runs (e.g., 100"}
        onTypeFn={handleFormSubmit}
      />
    </div>,
    <div key="ciop" className="flex items-center">
      <DoubleButton leftOnClick={increaseScale} rightOnClick={decreaseScale} />
      <span className="ml-3 text-sm font-medium text-gray-900">
        Scale: {scale}
      </span>
    </div>,
  ];
  return (
    <ul role="list" className="space-y-3">
      {items.map((item) => (
        <li
          key={item.key}
          className="overflow-hidden rounded-md bg-white px-6 py-4 shadow hover:bg-gray-50"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
