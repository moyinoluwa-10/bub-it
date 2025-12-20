"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPassword({
  email,
  token,
}: {
  email?: string;
  token?: string;
}) {
  const router = useRouter();

  if (!email || !token) {
    return (
      <p className="text-center">
        Invalid password reset link. Please check your email for the correct
        link.
      </p>
    );
  }

  const validate = (values: { password: string }) => {
    const errors: { password?: string } = {};

    if (!values.password) {
      errors.password = "Please fill out this field";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters or more";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const toastId = toast.loading("Submitting...");
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          password: values.password,
        }),
      });
      setSubmitting(false);

      if (res.ok) {
        toast.success("Password reset successfully!", { id: toastId });
        resetForm();
        router.push("/auth/sign-in");
      } else {
        const err = await res.json().catch(() => null);
        toast.error(err?.message ?? "Password reset failed", { id: toastId });
      }
    },
  });

  return (
    <>
      <div className="formHead mb-6">
        <h1 className="text-center font-medium mb-2">Reset Password</h1>
      </div>
      <form className="formCont w-full" onSubmit={formik.handleSubmit}>
        <div className="formGroup mb-3 w-full">
          <label className="label d-block mb-2" htmlFor="password">
            Password
          </label>
          <input
            {...formik.getFieldProps("password")}
            className="input w-full"
            type="password"
            name="password"
            required
            autoComplete="new-password"
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="error">{formik.errors.password}</span>
          ) : null}
        </div>

        <button className="button" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}
