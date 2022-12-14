import { Switch } from "@headlessui/react";
interface IToggle {
  value: any;
  setValue: (value: any) => void;
  title: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Toggle({ value, setValue, title }: IToggle) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={value}
        onChange={setValue}
        className={classNames(
          value ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">{title}</span>
      </Switch.Label>
    </Switch.Group>
  );
}
