import Breadcrumbs from "../components/Breadcrumbs";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Breadcrumbs />

      <Sidebar />
      <div className="w-full h-screen bg-gray-100 dark:bg-gray-900 dark:text-white overflow-y-auto overflow-x-hidden pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        {children}
      </div>
    </>
  );
}
