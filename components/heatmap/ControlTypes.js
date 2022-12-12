import React from "react";

export default function ControlTypes({
  allTypes,
  checkedTypes,
  setCheckedTypes,
  useAllTypes,
  setUseAllTypes,
}) {
  // Add/remove checked item from checkedTypes list+
  const handleCheckType = (event) => {
    var updatedList = [...checkedTypes];
    if (event.target.checked) {
      if (useAllTypes == true) {
        setUseAllTypes(false);
      }
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
    <div>
      <div className="leading-loose text-gray-600 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="m-6">
          <div className="title text-lg md:text-xl mb-4">
            Select activities:
          </div>

          <div className="mb-4 flex items-center pl-4 overflow-hidden rounded-lg ring-1 ring-black ring-opacity-10 hover:bg-gray-50">
            <input
              value="useAllTypes"
              type="checkbox"
              checked={useAllTypes}
              onChange={handleCheckUseAllTypes}
              className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <span className="py-1 ml-4 w-full text-md font-medium text-gray-900">
              Select all
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2 3xl:grid-cols-3">
            {allTypes.map((item, index) => (
              <div
                key={index}
                className="flex items-center pl-4 overflow-hidden rounded-lg ring-1 ring-black ring-opacity-10 hover:bg-gray-50"
              >
                <input
                  value={item}
                  type="checkbox"
                  checked={isCheckedType(item)}
                  onChange={handleCheckType}
                  className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="py-1 ml-4 w-full text-md font-medium text-gray-900">
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
