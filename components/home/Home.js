import { ChartBarIcon } from "@heroicons/react/24/outline";

const solutions = [
  {
    name: "Heatmap",
    description: "Visualize your activities on a heatmap.",
    href: "/heatmap",
    icon: ChartBarIcon,
  },
];

export function Home() {
  return (
    <div className="">
      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
          {solutions.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
            >
              <item.icon
                className="h-6 w-6 flex-shrink-0 text-indigo-600"
                aria-hidden="true"
              />
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}