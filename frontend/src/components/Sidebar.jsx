import { NavLink } from "react-router-dom";
import useSidebarStore from "../stores/useSidebarStore";
import { CalendarRange, ChevronsUpDown, ClipboardList, CreditCard, DoorOpen, LayoutDashboard, Microchip, Shapes } from "lucide-react";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  const { isOpen, close } = useSidebarStore();
  return (
    <>
      <div
        onClick={close}
        className={`w-full lg:hidden h-screen absolute top-0 left-0 m-0 p-0 z-20 bg-black/10  ${
          isOpen ? "" : "hidden"
        }`}
      />
      <div
        className={` ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } [--auto-close:lg] 
  transition-all duration-300 transform
  w-65 h-full
 
  fixed inset-y-0 start-0 z-30
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
  dark:bg-gray-900 dark:border-gray-800`}
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4 flex items-center">
            {/* Logo */}
            <a
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
              href="/"
            >
              Hooteliers
            </a>
            {/* End Logo */}

            <div className="hidden lg:block ms-2"></div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav className="p-3 w-full flex flex-col flex-wrap">
              <div className="w-full flex flex-col flex-wrap">
                <ul className="space-y-1">
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-hidden",
                          isActive
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-white/10 dark:hover:bg-white/20  dark:focus:outline-hidden dark:focus:bg-white/10 dark:text-white"
                            : "w-full text-blue-800 hover:bg-blue-100   dark:hover:bg-white/20 dark:text-white",
                        ].join(" ")
                      }
                    >
                      <LayoutDashboard className="shrink-0 size-4" />
                      Dashboard
                    </NavLink>
                  </li>

                  

                  <li>
                    <NavLink
                      to="/bookings"
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-hidden",
                          isActive
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-white/10 dark:hover:bg-white/20  dark:focus:outline-hidden dark:focus:bg-white/10 dark:text-white"
                            : "w-full text-blue-800 hover:bg-blue-100   dark:hover:bg-white/20 dark:text-white",
                        ].join(" ")
                      }
                    >
                      <ClipboardList className="shrink-0 size-4" />
                      Bookings
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/rooms"
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-hidden",
                          isActive
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-white/10 dark:hover:bg-white/20  dark:focus:outline-hidden dark:focus:bg-white/10 dark:text-white"
                            : "w-full text-blue-800 hover:bg-blue-100   dark:hover:bg-white/20 dark:text-white",
                        ].join(" ")
                      }
                    >
                      <DoorOpen className="shrink-0 size-4" />
                      Rooms
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/room-type"
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-hidden",
                          isActive
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-white/10 dark:hover:bg-white/20  dark:focus:outline-hidden dark:focus:bg-white/10 dark:text-white"
                            : "w-full text-blue-800 hover:bg-blue-100   dark:hover:bg-white/20 dark:text-white",
                        ].join(" ")
                      }
                    >
                      <Shapes className="shrink-0 size-4" />
                      Room Types
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/iot-devices"
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-hidden",
                          isActive
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-white/10 dark:hover:bg-white/20  dark:focus:outline-hidden dark:focus:bg-white/10 dark:text-white"
                            : "w-full text-blue-800 hover:bg-blue-100   dark:hover:bg-white/20 dark:text-white",
                        ].join(" ")
                      }
                    >
                      <Microchip className="shrink-0 size-4" />
                      IoT Devices
                      
                    </NavLink>
                  </li>

                   <li>
                    <NavLink
                      to="/iot-cards"
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-hidden",
                          isActive
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-white/10 dark:hover:bg-white/20  dark:focus:outline-hidden dark:focus:bg-white/10 dark:text-white"
                            : "w-full text-blue-800 hover:bg-blue-100   dark:hover:bg-white/20 dark:text-white",
                        ].join(" ")
                      }
                    >
                      <CreditCard className="shrink-0 size-4" />
                      IoT Cards
                      
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <SidebarFooter />
        </div>
      </div>
    </>
  );
}
