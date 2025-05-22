import { useState } from "react";
import { ChevronDown } from "lucide-react"; // adjust as needed

const FilterDropdown = ({
  label = "Filter",          // default label if nothing is passed
  filterBy = [],
  selectedValue,
  onChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      >
        {selectedValue === "all"
          ? `Filter by ${label.toLowerCase()}`
          : `${label}: ${selectedValue}`}
        <ChevronDown className="shrink-0 size-4" />
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
          <div className="py-1">
            {filterBy.map((item) => (
              <label
                key={item}
                className="flex items-center px-4 py-2 text-sm cursor-pointer text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                <input
                  type="radio"
                  className="mr-2"
                  name={label}
                  value={item}
                  checked={selectedValue === item}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setDropdownOpen(false);
                  }}
                />
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
