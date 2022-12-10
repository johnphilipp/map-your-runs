import React from "react";

export default function ControlYears({
  allYears,
  checkedYears,
  setCheckedYears,
  useAllYears,
  setUseAllYears,
}) {
  // Add/remove checked item from checkedYears list
  const handleCheckYear = (event) => {
    var updatedList = [...checkedYears];
    if (event.target.checked) {
      if (useAllYears == true) {
        setUseAllYears(false);
      }
      updatedList = [...checkedYears, event.target.value];
    } else {
      updatedList.splice(checkedYears.indexOf(event.target.value), 1);
    }
    setCheckedYears(updatedList.sort());
  };

  // Update states if all years should be used
  const handleCheckUseAllYears = (event) => {
    if (event.target.checked) {
      setUseAllYears(true);
      setCheckedYears([]);
    } else {
      setUseAllYears(false);
    }
  };

  // Return css classes based on whether item is checked
  var isCheckedYear = (item) => (checkedYears.includes(item) ? true : false);

  return (
    <div className="mt-6">
      <div className="leading-loose text-gray-600 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="m-6">
          <div className="title text-lg md:text-xl mb-4">Select years:</div>

          <div className="mb-4 flex items-center pl-4 overflow-hidden rounded-lg ring-1 ring-black ring-opacity-10 hover:bg-gray-50">
            <input
              value="useAllYears"
              type="checkbox"
              checked={useAllYears}
              onChange={handleCheckUseAllYears}
              className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <span className="py-2 ml-4 w-full font-medium text-gray-900">
              Select all
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {allYears.map((item, index) => (
              <div
                key={index}
                className="flex items-center pl-4 overflow-hidden rounded-lg ring-1 ring-black ring-opacity-10 hover:bg-gray-50"
              >
                <input
                  value={item}
                  type="checkbox"
                  checked={isCheckedYear(item)}
                  onChange={handleCheckYear}
                  className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="py-2 ml-4 w-full font-medium text-gray-900">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
