"use client";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignIn({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

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
    onSubmit: async (values, { setSubmitting }) => {
      const toastId = toast.loading("Submitting...");
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      setSubmitting(false);

      if (loginRes.ok) {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (result?.error) {
          toast.error("Login failed", { id: toastId });
        } else {
          toast.success("Logged in successfully!", { id: toastId });
          router.push(callbackUrl || "/urls");
        }
      } else {
        const err = await loginRes.json().catch(() => null);
        if (err?.message === "Incorrect email or password") {
          toast.error("Incorrect email or password", { id: toastId });
        } else if (err?.message === "Email not verified") {
          toast.error("Email not verified. Please verify your email.", {
            id: toastId,
          });
          redirect("/auth/resend-verification");
        } else {
          toast.error("Login failed", { id: toastId });
        }
      }
    },
  });

  return (
    <>
      <div className="formHead mb-6">
        <h1 className="text-center font-medium mb-2">Login to your account</h1>
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
          <p>
            <Link
              href="/auth/forgot-password"
              className="footLink forget mt-2 inline-block"
            >
              Forgot Password?
            </Link>
          </p>
        </div>

        <button className="button" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p className="mt-6 mb-2">
        Don't have an account?{" "}
        <Link href="/auth/sign-up" className="footLink">
          Sign Up
        </Link>
      </p>
    </>
  );
}
