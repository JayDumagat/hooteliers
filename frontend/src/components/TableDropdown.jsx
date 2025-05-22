import { useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import useOutsideClick from "../hooks/useOutsideClicks";
export default function TableDropdown({children}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleClickOutside = () => {
    setDropdownOpen(false);
  };
  useOutsideClick(dropdownRef, handleClickOutside);
  return (
    <div className="px-6 py-1.5 flex justify-end">
      <div
        ref={dropdownRef}
        className="flex items-center border border-gray-300 bg-white shadow-2xs rounded-lg transition-all dark:divide-neutral-700 dark:bg-neutral-700 dark:border-neutral-700"
      >
        <div className=" [--placement:bottom-right] relative ">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            <Ellipsis className="size-4" />
          </button>
          {isDropdownOpen && (
            <div
            className={`transition-[opacity,margin] duration ${
              isDropdownOpen ? "opacity-100" : "opacity-0"
            } fixed right-20 divide-y divide-gray-200 min-w-40 z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-neutral-700 dark:bg-neutral-800 dark:border dark:border-neutral-700`}
          >
            {children}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
