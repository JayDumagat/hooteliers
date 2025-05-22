import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useRoomStore from "../stores/useRoomStore";

const roomSchema = Yup.object().shape({
  roomNumber: Yup.string().required("Room Number is required"),
  roomType: Yup.string().required("Room Type is required"), // assuming IDs are strings, use Yup.number() if numeric
  floor: Yup.number()
    .min(1, "Floor must be at least 1")
    .required("Floor is required"),
  status: Yup.string().required("Status is required"),
});

export default function AddRoomForm({ onClose, roomTypes }) {
  const { addRoom } = useRoomStore();

  return (
    <Formik
      initialValues={{
        roomNumber: "",
        roomType: "",
        floor: "",
        status: "",
      }}
      validationSchema={roomSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form data:", values);
        addRoom(values);  // call the store function with the room data including roomType id
        setSubmitting(false);
        onClose();
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="roomNumber"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Room Number
            </label>
            <Field
              type="text"
              name="roomNumber"
              id="roomNumber"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1
                ${
                  touched.roomNumber && errors.roomNumber
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-white
                `}
            />
            <ErrorMessage
              name="roomNumber"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Room Type
            </label>
            <Field
              as="select"
              id="roomType"
              name="roomType"
              className={`mt-1 block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1
                ${
                  touched.roomType && errors.roomType
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-white
                `}
            >
              <option value="">Select a type</option>
              {roomTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="roomType"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="floor"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Floor
            </label>
            <Field
              type="number"
              name="floor"
              id="floor"
              min="1"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1
                ${
                  touched.floor && errors.floor
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-white
                `}
            />
            <ErrorMessage
              name="floor"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Status
            </label>
            <Field
              as="select"
              id="status"
              name="status"
              className={`mt-1 block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1
                ${
                  touched.status && errors.status
                    ? "border-red-500 ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-white
                `}
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </Field>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
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
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
