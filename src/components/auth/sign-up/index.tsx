"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const [success, setSuccess] = useState(false);

  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = "Please fill out this field";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Please fill out this field";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters or more";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const toastId = toast.loading("Submitting...");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      setSubmitting(false);

      if (res.ok) {
        toast.success("Account created successfully!", { id: toastId });
        setSuccess(true);
        resetForm();
      } else {
        const err = await res.json().catch(() => null);
        if (err?.message === "Email already in use") {
          toast.error("Email already in use", { id: toastId });
        } else if (err?.message === "Password must be at least 8 characters") {
          toast.error("Password must be at least 8 characters", {
            id: toastId,
          });
        } else {
          toast.error("Sign up failed", { id: toastId });
        }
      }
    },
  });

  return (
    <>
      {success && (
        <p className="text-center">
          Account created successfully! Please check your email to verify your
          account.
        </p>
      )}
      {!success && (
        <>
          <div className="formHead mb-6">
            <h1 className="text-center font-medium mb-2">
              Sign up and start shortening
            </h1>
          </div>
          <form className="formCont w-full" onSubmit={formik.handleSubmit}>
            <div className="formGroup mb-4 w-full">
              <label className="label block mb-2" htmlFor="email">
                Email address
              </label>
              <input
                {...formik.getFieldProps("email")}
                className="input w-full"
                type="text"
                name="email"
                required
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="error">{formik.errors.email}</span>
              ) : null}
            </div>

            <div className="formGroup mb-4 w-full">
              <label className="label block mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...formik.getFieldProps("password")}
                className="input w-full"
                type="password"
                name="password"
                required
                autoComplete="current-password"
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="error">{formik.errors.password}</span>
              ) : null}
            </div>

            <button
              className="button"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-6">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="footLink">
              Log In
            </Link>
          </p>
        </>
      )}
    </>
  );
}
