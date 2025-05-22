import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useBookingStore from "../stores/useBookingStore";

const bookingSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  roomId: Yup.string().required("Room selection is required"),
  status: Yup.string().required("Status is required"),
  notes: Yup.string(),
});

export default function EditBookingForm({ onClose, rooms, booking }) {
  const updateBooking = useBookingStore((state) => state.updateBooking);

  console.log("EditBookingForm", booking);

  return (
    <Formik
      enableReinitialize // important so form updates when item changes
      initialValues={{
        customerId: booking?.customerId || "",
        firstName: booking?.customer?.firstName || "",
        lastName: booking?.customer?.lastName || "",
        email: booking?.customer?.email || "",
        roomId: booking?.roomId || "",
        status: booking?.status || "confirmed",
        notes: booking?.notes || "No notes",
      }}
      validationSchema={bookingSchema}
      onSubmit={(values, { setSubmitting }) => {
        updateBooking(booking.id, {...values, previousRoomId: booking.roomId,});
        setSubmitting(false);
        onClose();
      }}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-white">
              First Name
            </label>
            <Field
              name="firstName"
              id="firstName"
              type="text"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1 ${
                touched.firstName && errors.firstName
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-white">
              Last Name
            </label>
            <Field
              name="lastName"
              id="lastName"
              type="text"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1 ${
                touched.lastName && errors.lastName
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <Field
              name="email"
              id="email"
              type="email"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1 ${
                touched.email && errors.email
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Room Selector */}
          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 dark:text-white">
              Room
            </label>
            <Field
              as="select"
              id="roomId"
              name="roomId"
              className={`mt-1 block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 ${
                touched.roomId && errors.roomId
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            >
              <option value="">Select a room</option>
              {(rooms || []).map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.roomNumber} - {room.roomType?.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="roomId" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white">
              Status
            </label>
            <Field
              as="select"
              id="status"
              name="status"
              className={`mt-1 block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 ${
                touched.status && errors.status
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            >
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="canceled">Canceled</option>
              <option value="no_show">No Show</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-white">
              Notes
            </label>
            <Field
              as="textarea"
              name="notes"
              id="notes"
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
            />
            <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Booking
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
