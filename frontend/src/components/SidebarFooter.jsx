import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import useAuthStore from "../stores/useAuthStore";

export default function SidebarFooter() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || "Unknown User";

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login"); // Redirect user to login page after logout
  };

  return (
    <footer className="mt-auto p-2 border-t border-gray-200 dark:border-neutral-700">
      <div className="relative w-full inline-flex" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          {displayName}
          <ChevronsUpDown className="shrink-0 size-3.5 ms-auto" />
        </button>

        {open && (
          <div className="absolute bottom-full mb-2 w-60 z-20 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
            <div className="p-1">
              
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-neutral-800"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
