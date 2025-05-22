
import { useEffect } from "react";
import useRoomStore from "../stores/useRoomStore"
export default function DashboardStat() {
    const { dashboardStats, fetchDashboardStats } = useRoomStore();

    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);

  return (
    <div>{/* Card Section */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  {/* Grid */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {/* Card */}
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
            Available Rooms
          </p>
          
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
            {dashboardStats.availableCount}
          </h3>
          
        </div>
      </div>
    </div>
    {/* End Card */}

    {/* Card */}
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
            Occupied Rooms
          </p>
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
            {dashboardStats.occupiedCount}
          </h3>
        </div>
      </div>
    </div>
    {/* End Card */}

    {/* Card */}
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
            Sales
          </p>
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
            1
          </h3>
          
        </div>
      </div>
    </div>
    {/* End Card */}

    {/* Card */}
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
            Total Bookings
          </p>
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
            92,913
          </h3>
        </div>
      </div>
    </div>
    {/* End Card */}
  </div>
  {/* End Grid */}
</div>
{/* End Card Section */}</div>
  )
}
