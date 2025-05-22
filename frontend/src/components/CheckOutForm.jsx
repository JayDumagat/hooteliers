import { useState, useEffect } from "react";
import { DoorOpen } from "lucide-react";

export default function CheckOutForm({ booking, onClose, rooms, onClick }) {

  // Find the room for the booking
  const room = rooms.find((r) => r._id === booking.room._id);

  // State for stay info & payment
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tenderedAmount, setTenderedAmount] = useState("");
  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState(false);

  // Calculate nights and total price on mount or booking change
  useEffect(() => {
    if (booking?.checkInDate && room?.roomType?.basePrice) {
      const checkIn = new Date(booking.checkInDate);
      const now = new Date();

      const msPerHour = 1000 * 60 * 60;
      const hoursStayed = Math.ceil((now - checkIn) / msPerHour);
      const calculatedNights = Math.ceil(hoursStayed / 24);

      const price = calculatedNights * room.roomType.basePrice;

      setNights(calculatedNights);
      setTotalPrice(price);
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  }, [booking, room]);

  
  // Update change whenever tendered amount or totalPrice changes
  useEffect(() => {
    const tender = parseFloat(tenderedAmount);
    if (!isNaN(tender)) {
      setChange(tender - totalPrice);
    } else {
      setChange(0);
    }
  }, [tenderedAmount, totalPrice]);

  // Handle checkout
  const handleReviewAndConfirm = () => {
  const tender = parseFloat(tenderedAmount);
  if (isNaN(tender) || tender < totalPrice) {
    alert("Tendered amount must be a number and at least the total price.");
    return;
  }

  // Send booking data to confirmation dialog
  onClick({
    ...booking,
    checkOutDate: new Date().toISOString(),
    price: totalPrice,
    tenderedAmount,
    change,
  });
};

  return (
    
      <div>
        {/* Header Section with Curved Background */}
      <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-neutral-950">
        {/* SVG Background Element */}
        <figure className="absolute inset-x-0 bottom-0 -mb-px">
          <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1920 100.1">
            <path fill="currentColor" className="fill-white dark:fill-neutral-800" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"></path>
          </svg>
        </figure>
      </div>

      {/* Icon Section */}
      <div className="relative z-10 -mt-12">
        <span className="mx-auto flex justify-center items-center size-16 rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
          <DoorOpen className="shrink-0 size-8"/>
        </span>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-7 overflow-y-auto">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
            Guest Checkout
          </h3>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            Room #{room?.roomNumber || "N/A"}
          </p>
        </div>

        {/* Guest Information Grid */}
        <div className="mt-5 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">Guest Name:</span>
            <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
              {booking?.customer?.firstName} {booking?.customer?.lastName}
            </span>
          </div>

          <div>
            <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">Room Type:</span>
            <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
              {room?.roomType?.name || "N/A"}
            </span>
          </div>

          <div>
            <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">Price per Night:</span>
            <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
              {room?.roomType?.basePrice?.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              }) || "N/A"}
            </span>
          </div>

          <div>
            <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">Duration of Stay:</span>
            <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
              {nights} night{nights !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mt-5 sm:mt-10">
          <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Payment Summary</h4>

          <ul className="mt-3 flex flex-col">
            <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
              <div className="flex items-center justify-between w-full">
                <span>Room Charges ({nights} night{nights !== 1 ? "s" : ""})</span>
                <span>
                  {totalPrice.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </span>
              </div>
            </li>
            <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
              <div className="flex items-center justify-between w-full">
                <span>Total Amount</span>
                <span>
                  {totalPrice.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Payment Input */}
        <div className="mt-5 sm:mt-10">
          <label htmlFor="tenderedAmount" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
            Tendered Amount (Cash)
          </label>
          <div className="relative">
            <input
              id="tenderedAmount"
              type="number"
              step="0.01"
              min={totalPrice}
              value={tenderedAmount}
              onChange={(e) => setTenderedAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter cash amount received"
            />
          </div>
        </div>

        {/* Change Display */}
        <div className="mt-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Change:</span>
            <span
              className={`text-sm font-bold ${
                change < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {change >= 0
                ? change.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })
                : "Insufficient Amount"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex justify-end gap-x-2">
          <button
            onClick={onClose}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleReviewAndConfirm}
  
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            disabled={loading || change < 0}
          >
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3l8-8"/>
            </svg>
            {loading ? "Processing..." : "Confirm Checkout"}
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-5 sm:mt-10">
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            Payment will be processed as cash transaction. Please ensure the tendered amount is accurate before confirming.
          </p>
        </div>
      </div>
      </div>
   
  );
}