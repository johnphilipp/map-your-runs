export function Header() {
  // Header with project name, home link, and heatmap link
  return (
    <div className="mx-auto px-4 sm:px-6 border-b-2">
      <div className="flex items-center justify-between border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <div className="flex items-center">
              <img
                className="h-8 w-auto sm:h-10"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/person-running_1f3c3.png"
                alt=""
              />
              <img
                className="h-8 w-auto sm:h-10"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/world-map_1f5fa-fe0f.png"
                alt=""
              />
              <span className="ml-4 text-xl text-base font-medium text-gray-900 hover:text-gray-500">
                MapYourRuns
              </span>
            </div>
          </a>
        </div>
        <div className="-my-2 -mr-2 md:hidden"></div>

        <a
          href="/"
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          Home
        </a>
        <a
          href="/dashboard"
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          Dashboard
        </a>
        <a
          href="/heatmap"
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          Heatmap
        </a>
      </div>
    </div>
  );
}
