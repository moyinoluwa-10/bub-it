"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);

  const validate = (values: { email: string }) => {
    const errors: { email?: string } = {};

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
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const toastId = toast.loading("Submitting...");
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
        }),
      });
      setSubmitting(false);

      if (res.ok) {
        toast.success("Password reset email sent successfully!", {
          id: toastId,
        });
        setSuccess(true);
        resetForm();
      } else {
        // const err = await res.json().catch(() => null);
        toast.error("Failed to send password reset email", {
          id: toastId,
        });
      }
    },
  });

  return (
    <>
      {success && (
        <p className="text-center">
          A password reset email has been sent if an account with that email
          exists, please check your email.
        </p>
      )}
      {!success && (
        <>
          <div className="formHead mb-6">
            <h1 className="text-center font-medium mb-2">Forgot password</h1>
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
                ? "Submitting..."
                : "Get Reset Password Link"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
