import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useMemo } from "react";
import FilterDropdown from "./FilterDropdown";
import useFilterStore from "../stores/useFilterStore";
import TableDropdown from "./TableDropdown";

export default function Table({
  headerTitle,
  headerDescription,
  primaryButtonText,
  primaryOnClick,
  headerColumns,
  data,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  filterBy = ["all"],
  customSearchFn,
  tableActions,
}) {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const filters = useFilterStore((state) => state.filters);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const setFilter = useFilterStore((state) => state.setFilter);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const lowerSearch = searchQuery.toLowerCase();

      // Allow custom search logic
      const matchesSearch = customSearchFn
        ? customSearchFn(item, lowerSearch)
        : Object.values(item).some((value) =>
            String(value).toLowerCase().includes(lowerSearch)
          );

      const matchesAllFilters = filterBy.every((filter) => {
        const selectedValue = filters[filter.key] || "all";
        if (selectedValue === "all") return true;

        const value = filter.getValue?.(item);
        return value === selectedValue;
      });

      return matchesSearch && matchesAllFilters;
    });
  }, [data, filterBy, searchQuery, filters, customSearchFn]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, pageSize]);

  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      {/* Table Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Card */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                {/* Header */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                      {headerTitle}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      {headerDescription}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {/* Search Field */}
                    <div className="relative">
                      <input
                        type="text"
                        id="search-field"
                        name="search-field"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Search"
                      />
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                        <Search className="size-4 text-gray-400 dark:text-neutral-500" />
                      </div>
                    </div>
                    <div className="inline-flex gap-x-2">
                      {filterBy.map((filterOption) => (
                        <FilterDropdown
                          key={filterOption.key}
                          label={filterOption.label}
                          filterBy={filterOption.options}
                          selectedValue={filters[filterOption.key] || "all"}
                          onChange={(val) => setFilter(filterOption.key, val)}
                        />
                      ))}

                      <button
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={primaryOnClick}
                      >
                        <Plus className="shrink-0 size-4" />
                        {primaryButtonText}
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Header */}

                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                      {headerColumns.map((column, index) => (
                        <th
                          key={index}
                          scope="col"
                          className={`px-6 py-3 text-start ${
                            column.className || ""
                          }`}
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                              {column.label}
                            </span>
                          </div>
                        </th>
                      ))}
                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                          {headerColumns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className={`text-sm font-semibold text-gray-800 dark:text-neutral-200 px-6 py-3 whitespace-nowrap ${
                                column.tdClassName || ""
                              }`}
                            >
                              {typeof column.render === "function"
                                ? column.render(item)
                                : item[column.key]}
                            </td>
                          ))}
                          <td className="size-px whitespace-nowrap">
                            <TableDropdown>
                              <div className="py-2 first:pt-0 last:pb-0">
                                <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-600">
                                  Options
                                </span>
                                {tableActions.map((action, index) => {
                                  
                                  const isDisabled =
                                    typeof action.disabled === "function"
                                      ? action.disabled(item)
                                      : action.disabled;

                                  return (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        !isDisabled && action.onClick(item)
                                      }
                                      disabled={isDisabled}
                                      className={`w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm 
        text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 
        dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 
        dark:focus:bg-neutral-700 dark:focus:text-neutral-300
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                      {action.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </TableDropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={headerColumns.length + 2}
                          className="text-center py-4"
                        >
                          <p className="text-sm text-gray-500 dark:text-neutral-500">
                            No data available
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* End Table */}

                {/* Footer */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      <span className="font-semibold text-gray-800 dark:text-neutral-200">
                        {totalPages}
                      </span>{" "}
                      result{paginatedData.length > 1 ? "s" : " "}
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        onClick={() => onPageChange(currentPage - 1)}
                        type="button"
                        disabled={currentPage === 1}
                        className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      >
                        <ChevronLeft className="shrink-0 size-4" />
                        Prev
                      </button>

                      <button
                        type="button"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      >
                        Next
                        <ChevronRight className="shrink-0 size-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Footer */}
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Table Section */}
    </>
  );
}
