"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ResendVerification() {
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
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
        }),
      });
      setSubmitting(false);

      if (res.ok) {
        toast.success("Verification email sent!", { id: toastId });
        setSuccess(true);
        resetForm();
      } else {
        const err = await res.json().catch(() => null);
        if (err?.message === "Email not found") {
          toast.error("Please check your email address and try again", {
            id: toastId,
          });
        } else {
          toast.error("Resend verification failed", {
            id: toastId,
          });
        }
      }
    },
  });

  return (
    <>
      {success && (
        <p className="text-center">
          A verification email has been sent to your email address. Please check
          your inbox to verify your account.
        </p>
      )}
      {!success && (
        <>
          <div className="formHead mb-6">
            <h1 className="text-center font-medium mb-2">
              Resend Verification Email
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

            <button
              className="button"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Resending..."
                : "Resend Verification Email"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
