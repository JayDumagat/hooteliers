import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useAuthStore from '../stores/useAuthStore'

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be 20 characters or less')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export default function Login() {
    const {login} = useAuthStore()
    const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="shrink-0 grow max-w-lg mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Sign In with Username
            </div>

            <Formik
              initialValues={{ username: '', password: '', rememberMe: false }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setStatus }) => {
                const response = await login(values.username, values.password);

                if (response.success) {
      navigate('/dashboard');
    } else {
     
      setStatus(response.message || "Login failed");
    }
    setSubmitting(false);
  }}
              
            >
              {({ isSubmitting, touched, errors, dirty, isValid }) => (
                <Form>
                  <div className="grid gap-y-4">
                    {/* Username Group */}
                    <div>
                      <label htmlFor="username" className="block text-sm mb-2 dark:text-white">
                        Username
                      </label>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        className={`py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm
                          ${
                            touched.username && errors.username
                              ? 'border-red-500 ring-1 ring-red-500 focus:border-red-600 focus:ring-red-600'
                              : touched.username && !errors.username
                              ? 'border-teal-500 ring-1 ring-teal-500 focus:border-teal-600 focus:ring-teal-600'
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                          }
                          dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600
                        `}
                        aria-describedby="username-error"
                        required
                      />
                      <ErrorMessage
                        name="username"
                        component="p"
                        className="text-xs text-red-600 mt-2"
                        id="username-error"
                      />
                    </div>

                    {/* Password Group */}
                    <div>
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                          Password
                        </label>
                        <Link
                          to="/forgot-password"
                          className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className={`py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm
                          ${
                            touched.password && errors.password
                              ? 'border-red-500 ring-1 ring-red-500 focus:border-red-600 focus:ring-red-600'
                              : touched.password && !errors.password
                              ? 'border-teal-500 ring-1 ring-teal-500 focus:border-teal-600 focus:ring-teal-600'
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                          }
                          dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600
                        `}
                        aria-describedby="password-error"
                        required
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-xs text-red-600 mt-2"
                        id="password-error"
                      />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center">
                      <Field
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                      <label htmlFor="rememberMe" className="ms-3 text-sm dark:text-white">
                        Remember me
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !dirty || !isValid}
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Sign in
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
