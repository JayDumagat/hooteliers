import { BadgeAlert, BadgeCheck, CalendarArrowDown, CalendarArrowUp, CalendarCheck, CircleAlert, CircleCheck, CircleX, TriangleAlert } from "lucide-react";


export default function StatusBadge({status}) {
  return (
    <>
    {status === "available" && (
      <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
        <CircleCheck className="shrink-0 size-3"/>
        {status }
      </span>
    )}
    {status === "occupied" && (
      <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
        <TriangleAlert className="shrink-0 size-3"/>
        {status}
      </span>
    )}
    {status == "maintenance" && (
      <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
        <CircleAlert className="shrink-0 size-3"/>
        {status}
      </span>
    )}
    {status === "unavailable" && (
       <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
        <CircleX className="shrink-0 size-3"/>
        {status}
      </span>
    )}
    {status === "checked_in" && (
       <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
        <CalendarArrowUp className="shrink-0 size-3"/>
        {status}
      </span>
    )}

    {status === "inactive" && (
       <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
        <BadgeAlert className="shrink-0 size-3"/>
        {status}
      </span>
    )}
    {status === "active" && (
       <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
        <BadgeCheck className="shrink-0 size-3"/>
        {status}
      </span>
    )}

    {status === "checked_out" && (
       <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
        <CalendarArrowDown className="shrink-0 size-3"/>
        {status}
      </span>
    )}

    {status === "confirmed" && (
       <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full dark:bg-indigo-500/10 dark:text-indigo-500">
        <CalendarCheck className="shrink-0 size-3"/>
        {status}
      </span>
    )}

    </>
  )
}
