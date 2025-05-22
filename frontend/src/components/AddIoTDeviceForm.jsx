import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useDeviceStore from "../stores/useIoTDeviceStore"; // You should have this store


const deviceSchema = Yup.object().shape({
  roomId: Yup.string().required("Room is required"),
  nickname: Yup.string().required("Nickname is required"),
  deviceSerial: Yup.string().required("Device Serial is required"),
  status: Yup.string().oneOf(["active", "inactive"]).required("Status is required"),
});

export default function AddDeviceForm({ onClose, rooms }) {
  const { addDevice } = useDeviceStore();

  return (
    <Formik
      initialValues={{
        roomId: "",
        nickname: "",
        deviceSerial: "",
        status: "active",
      }}
      validationSchema={deviceSchema}
      onSubmit={(values, { setSubmitting }) => {
        addDevice(values)
          .then(() => {
            onClose();
          })
          .catch(console.error)
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="space-y-4">

          {/* Room select */}
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
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.roomNumber} - Floor {room.floor}
                </option>
              ))}
            </Field>
            <ErrorMessage name="roomId" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Nickname */}
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-white">
              Nickname
            </label>
            <Field
              type="text"
              name="nickname"
              id="nickname"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1 ${
                touched.nickname && errors.nickname
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="nickname" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Device Serial */}
          <div>
            <label htmlFor="deviceSerial" className="block text-sm font-medium text-gray-700 dark:text-white">
              Device Serial
            </label>
            <Field
              type="text"
              name="deviceSerial"
              id="deviceSerial"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1 ${
                touched.deviceSerial && errors.deviceSerial
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="deviceSerial" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white">
              Status
            </label>
            <Field
              as="select"
              name="status"
              id="status"
              className={`mt-1 block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 ${
                touched.status && errors.status
                  ? "border-red-500 ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              } dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Actions */}
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
              Save Device
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

