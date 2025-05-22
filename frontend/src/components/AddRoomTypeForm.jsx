import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useRoomTypeStore from "../stores/useRoomTypeStore"; // Adjust path if necessary

const roomTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  maxOccupancy: Yup.number()
    .min(1, "Must be at least 1")
    .required("Max occupancy is required"),
  basePrice: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Base price is required"),
  amenities: Yup.string(), // comma-separated for now
});

export default function AddRoomTypeForm({ onClose }) {
  const addRoomType = useRoomTypeStore((state) => state.addRoomType);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        maxOccupancy: "",
        basePrice: "",
        amenities: "",
      }}
      validationSchema={roomTypeSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const parsedAmenities = values.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

        const payload = {
          ...values,
          amenities: parsedAmenities,
        };

        await addRoomType(payload);
        setSubmitting(false);
        onClose();
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
              Room Type Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1
                ${touched.name && errors.name ? "border-red-500 ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-white">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              id="description"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="maxOccupancy" className="block text-sm font-medium text-gray-700 dark:text-white">
              Max Occupancy
            </label>
            <Field
              type="number"
              name="maxOccupancy"
              id="maxOccupancy"
              min="1"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1
                ${touched.maxOccupancy && errors.maxOccupancy ? "border-red-500 ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="maxOccupancy" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 dark:text-white">
              Base Price
            </label>
            <Field
              type="number"
              name="basePrice"
              id="basePrice"
              min="0"
              className={`mt-1 block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1
                ${touched.basePrice && errors.basePrice ? "border-red-500 ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
                dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
            />
            <ErrorMessage name="basePrice" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 dark:text-white">
              Amenities (comma-separated)
            </label>
            <Field
              type="text"
              name="amenities"
              id="amenities"
              placeholder="WiFi, TV, Mini Bar"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
