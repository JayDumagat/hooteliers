import { useEffect } from "react";
import { useFormikContext } from "formik";

function AutoPriceCalculator({ rooms }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const checkIn = new Date(values.checkInDateTime);
    const checkOut = new Date(values.checkOutDateTime);
    const selectedRoom = rooms.find((room) => room.id === values.roomId);

    if (
      selectedRoom &&
      !isNaN(checkIn) &&
      !isNaN(checkOut) &&
      checkOut > checkIn
    ) {
      const msInDay = 1000 * 60 * 60 * 24;
      const nights = Math.ceil((checkOut - checkIn) / msInDay);
      const calculatedPrice = nights * selectedRoom.pricePerNight;
      setFieldValue("price", calculatedPrice);
    }
  }, [values.checkInDateTime, values.checkOutDateTime, values.roomId, rooms, setFieldValue]);

  return null; // no UI, just logic
}
export default AutoPriceCalculator;