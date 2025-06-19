import React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";
import "react-day-picker/dist/style.css";
// Utility to merge class names
function cn(...args) {
  return classNames(...args);
}

// Tailwind-style variants
function buttonVariants({ variant }) {
  if (variant === "outline") {
    return "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700";
  }
  if (variant === "ghost") {
    return "hover:bg-gray-100 text-gray-900";
  }
  return "";
}

export function Calendar({
  className,
  classNames: classNamesProp,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      navLayout="around"
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className, "rdp-root")}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-center items-center relative",
        caption_label: "text-center text-base font-medium",
        nav: "space-x-2 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 rounded-md opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse",
        head_row: "flex justify-between text-gray-500 text-xs",
        head_cell:
          "w-9 h-9 flex items-center justify-center font-normal rounded-md",
        row: "flex w-full",
        cell:
          "relative w-9 h-9 text-center text-sm flex items-center justify-center " +
          "[&:has([aria-selected].day-range-end)]:rounded-r-md " +
          "[&:has([aria-selected].day-range-start)]:rounded-l-md " +
          "[&:has([aria-selected])]:bg-gray-100 focus-within:z-10",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-9 h-9 p-0 rounded-md font-normal text-sm aria-selected:opacity-100"
        ),
        day_range_end: "bg-indigo text-white hover:bg-[#0f172a] rounded-md",
        day_range_start:
          "bg-[#0f172a] text-white hover:bg-[#0f172a] rounded-md",
        day_selected: "bg-[#0f172a] text-white hover:bg-[#0f172a] rounded-md",
        day_today: "border border-pink-500",
        day_outside:
          "text-gray-300 opacity-50 aria-selected:bg-gray-200 aria-selected:opacity-40",
        day_disabled: "text-gray-400 opacity-40",
        day_range_middle: "bg-gray-100 text-black",
        day_hidden: "invisible",
        ...classNamesProp,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
