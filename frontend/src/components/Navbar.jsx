import React from "react";
import { Link } from "react-router-dom";
import useSidebarStore from "../stores/useSidebarStore";
import { DoorOpen, Headset, House, Info, LogIn, Menu } from "lucide-react";

export default function Navbar() {
  const { isOpen, toggle, close } = useSidebarStore();
  return (
    <>
      <header className="fixed flex-wrap  md:justify-start md:flex-nowrap z-50 w-full mt-6">
        <nav className="relative max-w-[85rem] w-full mx-auto flex items-center justify-between gap-3 py-2 px-4 sm:px-6 lg:px-8">
          <Link
            className="flex-none font-semibold text-xl text-white focus:outline-hidden focus:opacity-80"
            to="/"
          >
            Hooteliers
          </Link>

          <div className="md:order-3 flex justify-end items-center gap-x-1">
            <button
              type="button"
              className="md:hidden relative p-2 flex items-center font-medium text-sm rounded-lg text-gray-300 hover:text-white focus:outline-hidden  disabled:opacity-50 disabled:pointer-events-none"
              onClick={toggle}
            >
              Menu
             <Menu className="shrink-0 size-4 ms-1 "/>
            </button>

            <div className=" md:inline-block md:me-2">
              <div className="w-px h-4 bg-gray-100"></div>
            </div>

            
            <Link
              to="/login"
              
              className="relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-transparent text-gray-300 hover:text-white focus:text-white focus:outline-hidden  disabled:opacity-50 disabled:pointer-events-none "
              
            >
             <LogIn className="shrink-0 size-4" />
             
            </Link>
           
          </div>

          {/* Collapse */}
          <div onClick={close} className={`w-full h-screen absolute top-0 left-0 md:hidden block lg:hidden bg-black/40 ${isOpen ? "fixed" : "hidden"}`}/>
          <div className={`[--auto-close:md] ${isOpen ? "translate-x-0 " : "-translate-x-full"} fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-60  md:bg-transparent bg-neutral-950 border-e basis-full grow md:order-2 md:static md:block md:h-auto md:max-w-none md:w-auto md:border-e-transparent md:transition-none md:translate-x-0 md:z-40 md:basis-auto dark:bg-neutral-800 dark:border-e-gray-700 md:dark:border-e-transparent `}>
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="py-2 md:py-0 px-2 md:px-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                <div className="grow">
                  <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1  md:mt-0 mt-10">
                    <a 
                      className="p-2 flex items-center text-sm text-white hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="#"
                    >
                      <House   className="shrink-0 size-4 me-3 md:me-2 block md:hidden"/>
                      Home
                    </a>
                    <a
                      className="p-2 flex items-center text-sm text-gray-300 hover:text-white hover:underline underline-offset-8 rounded-lg focus:underline  "
                      href="#"
                    >
                     <DoorOpen  className="shrink-0 size-4 me-3 md:me-2 block md:hidden"/>
                      Rooms
                    </a>

                    <a
                      className="p-2 flex items-center text-sm text-white hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="#"
                    >
                      <Info   className="shrink-0 size-4 me-3 md:me-2 block md:hidden"/>
                      About Us
                    </a>

                    <a
                      className="p-2 flex items-center text-sm text-white hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="#"
                    >
                     <Headset     className="shrink-0 size-4 me-3 md:me-2 block md:hidden"/>
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Collapse */}
        </nav>
      </header>
      {/* ========== END HEADER ========== */}

      {/* Offcanvas */}
      <div
        id="hs-header-base-offcanvas"
        className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-80 bg-white border-e dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabindex="-1"
        aria-labelledby="hs-header-base-offcanvas-label"
      >
        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
          <h3
            id="hs-header-base-offcanvas-label"
            className="font-bold text-white dark:text-white"
          >
            Offcanvas title
          </h3>
          <button
            type="button"
            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-white hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
            aria-label="Close"
            data-hs-overlay="#hs-header-base-offcanvas"
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-white dark:text-neutral-400">
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </p>
        </div>
      </div>
    </>
  );
}
