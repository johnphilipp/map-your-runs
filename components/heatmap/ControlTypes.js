import React from "react";

export default function ControlTypes({
  allTypes,
  checkedTypes,
  setCheckedTypes,
  useAllTypes,
  setUseAllTypes,
}) {
  // Add/remove checked item from checkedTypes list
  const handleCheckType = (event) => {
    var updatedList = [...checkedTypes];
    if (event.target.checked) {
      updatedList = [...checkedTypes, event.target.value];
    } else {
      updatedList.splice(checkedTypes.indexOf(event.target.value), 1);
    }
    setCheckedTypes(updatedList.sort());
  };

  // Update states if all types should be used
  const handleCheckUseAllTypes = (event) => {
    if (event.target.checked) {
      setUseAllTypes(true);
      setCheckedTypes([]);
    } else {
      setUseAllTypes(false);
    }
  };

  // Return css classes based on whether item is checked
  var isCheckedType = (item) => (checkedTypes.includes(item) ? true : false);

  return (
    <div className="mt-4">
      <div className="title">Select activities to visualize:</div>

      <div className="mb-4 flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
        <input
          value="useAllTypes"
          type="checkbox"
          checked={useAllTypes}
          onChange={handleCheckUseAllTypes}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
        />
        <span className="py-4 ml-4 w-full text-sm font-medium text-gray-900">
          Select All
        </span>
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {allTypes.map((item, index) => (
          <div
            key={index}
            className="flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100"
          >
            <input
              disabled={useAllTypes}
              value={item}
              type="checkbox"
              checked={isCheckedType(item)}
              onChange={handleCheckType}
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
