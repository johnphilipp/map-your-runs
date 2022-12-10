import { ChartBarIcon } from "@heroicons/react/24/outline";
import { MapIcon } from "@heroicons/react/24/outline";
import { Container } from "../utils/Container";

export function Home() {
  // Save all features which are implemented in a list (currently only one feature)
  const features = [
    {
      name: "Dashboard",
      description: "View sports activity analysis dashboard",
      href: "/dashboard",
      icon: ChartBarIcon,
    },
    {
      name: "Heatmap",
      description: "Display sports activities on a heatmap",
      href: "/heatmap",
      icon: MapIcon,
    },
  ];

  return (
    <div>
      <Container>
        <h1 className="text-gray-600 text-3xl font-medium">Home</h1>
        <h2 className="text-slate-400 text-lg md:text-xl font-light mb-2 mt-2 mb-8">
          Welcome to MapYourRuns
        </h2>
        <div className="mt-6 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            {features.map((item, index) => (
              <div>
                <a
                  key={item.name}
                  href={item.href}
                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                >
                  <item.icon
                    className="mt-2 mr-2 h-10 w-10 flex-shrink-0 text-orange-400"
                    aria-hidden="true"
                  />
                  <div className="ml-4">
                    <p className="text-lg md:text-xl font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-md md:text-lg text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
      </Container>
    </div>
  );
}
