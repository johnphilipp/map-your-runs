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
    <div className="mt-4">
      <div className="title">Select years to visualize:</div>

      <div className="mb-4 flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
        <input
          value="useAllYears"
          type="checkbox"
          checked={useAllYears}
          onChange={handleCheckUseAllYears}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
        />
        <span className="py-4 ml-4 w-full text-sm font-medium text-gray-900">
          Select All
        </span>
      </div>

      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {allYears.map((item, index) => (
          <div
            key={index}
            className="flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100"
          >
            <input
              value={item}
              type="checkbox"
              checked={isCheckedYear(item)}
              onChange={handleCheckYear}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <span className="py-4 ml-4 w-full text-sm font-medium text-gray-900">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
