import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import useAuthStore from "../stores/useAuthStore";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't be longer than 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

// Custom Field component to add validation styles dynamically
const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  const isValid = meta.touched && !meta.error;

  const baseClasses =
    "py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500";

  const errorClasses = "border-red-500 ring-1 ring-red-500";
  const validClasses = "border-teal-500 ring-1 ring-teal-500";
  const neutralClasses =
    "border-gray-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-neutral-600";

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm mb-2 dark:text-white"
      >
        {label}
      </label>
      <input
        className={`${baseClasses} ${
          isError ? errorClasses : isValid ? validClasses : neutralClasses
        }`}
        {...field}
        {...props}
      />
      {isError ? (
        <p className="text-xs text-red-600 mt-2">{meta.error}</p>
      ) : null}
    </div>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const isError = meta.touched && meta.error;
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        {...field}
        {...props}
        className={`shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 ${
          isError ? "border-red-500 ring-1 ring-red-500" : ""
        }`}
      />
      <label
        htmlFor={props.id}
        className="ms-3 text-sm dark:text-white select-none"
      >
        {children}
      </label>
      {isError && <p className="text-xs text-red-600 mt-2 ms-9">{meta.error}</p>}
    </div>
  );
};

export default function Register() {
    const {register} = useAuthStore()
    const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="shrink-0 grow max-w-lg mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                to="/login"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Sign up with email
            </div>

            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={async(values, { setSubmitting }) => {
                const response = await register(
                  values.username,
                  values.email,
                  values.password
                ); 

                if (response.success) {
                 setTimeout(() => {
                    navigate("/login");
                    setSubmitting(false);
                  }, 400);
                }
              }}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <div className="grid gap-y-4">
                    <MyTextField
                      label="Username"
                      name="username"
                      type="text"
                      id="username"
                      placeholder="Choose a username"
                    />

                    <MyTextField
                      label="Email address"
                      name="email"
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                    />

                    <MyTextField
                      label="Password"
                      name="password"
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                    />

                    <MyTextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                    />

                    <MyCheckbox name="terms" id="terms">
                      I accept the{" "}
                      <a
                        className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </MyCheckbox>

                    <button
                      type="submit"
                      disabled={!isValid || !dirty || isSubmitting}
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:bg-blue-400  disabled:select-none disabled:cursor-not-allowed"
                    >
                      Sign up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
