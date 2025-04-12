"use client"
import React from "react";
import { Input } from "@/components/ui/input";

interface IPriceFilter {
  highPrice: number;
  fromPrice: number;
  setFromPrice: React.Dispatch<React.SetStateAction<number>>;
  toPrice: number;
  setToPrice: React.Dispatch<React.SetStateAction<number>>;
}
const PriceFilter = ({highPrice, fromPrice, toPrice, setFromPrice, setToPrice}: IPriceFilter) => {
  return <>
  <details
    className="overflow-hidden w-full sm:w-[48%] lg:w-[40%] rounded-sm border border-gray-300 dark:border-gray-600 [&_summary::-webkit-details-marker]:hidden"
  >
    <summary
      className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition dark:bg-gray-900 dark:text-white"
    >
      <span className="text-sm"> Price </span>

      <span className="transition group-open:-rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </span>
    </summary>

    <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <header className="flex items-center justify-between p-4">
        <span className="text-sm text-gray-700 dark:text-gray-200"> The highest price is ${highPrice} </span>

        <button
          type="button"
          className="text-sm cursor-pointer text-gray-900 underline underline-offset-4 dark:text-white"
          onClick={() => {
            setFromPrice(0);
            setToPrice(0);
          }}
        >
          Reset
        </button>
      </header>

      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex justify-between gap-4">
          <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">$</span>

            <Input
              type="number"
              id="FilterPriceFrom"
              placeholder="From"
              value={fromPrice}
              onChange={(e) => setFromPrice(Number(e.target.value))}
              min={0}
              className="w-full rounded-md border border-gray-200 p-2 shadow-xs sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-offset-gray-900"
            />
          </label>

          <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">$</span>

            <Input
              type="number"
              id="FilterPriceTo"
              placeholder="To"
              value={toPrice}
              onChange={(e) => setToPrice(Number(e.target.value))}
              min={0}
              className="w-full rounded-md border border-gray-200 p-2 shadow-xs sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-offset-gray-900"
            />
          </label>
        </div>
      </div>
    </div>
  </details>
</>
};

export default PriceFilter;
