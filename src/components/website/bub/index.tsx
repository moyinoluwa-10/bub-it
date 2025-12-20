"use client";
import { useState } from "react";
import Modal from "./modal";
import { Field, Form, Formik, useFormik } from "formik";
import { ImLink } from "react-icons/im";
import Link from "next/link";
import RightImage from "@/assets/svgs/home-illustration.svg";
import Header from "@/components/layout/header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Bub() {
  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const [shortUrl, setShortUrl] = useState();
  const { status } = useSession();

  const validate = (values: { longUrl: string; custom: string }) => {
    const errors: { longUrl?: string; custom?: string } = {};

    if (!values.longUrl) {
      errors.longUrl = "Please fill out this field";
    } else if (
      !/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(
        values.longUrl
      )
    ) {
      errors.longUrl = "Please enter a valid URL";
    }

    // Custom alias validation
    if (values.custom) {
      if (!/^[a-zA-Z0-9-_]{3,30}$/.test(values.custom)) {
        errors.custom =
          "Custom alias must be 3-30 characters long and can only contain letters, numbers, hyphens, and underscores";
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      longUrl: "",
      custom: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      const toastId = toast.loading("Creating your short URL...");
      const res = await fetch("/api/backend/api/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSubmitting(false);
      console.log("res", res);

      if (res.ok) {
        const data = (await res.json()).data;
        if (data.url.customUrl) {
          setShortUrl(data.url.customUrl);
        } else {
          setShortUrl(data.url.shortUrl);
        }
        resetForm();
        toast.success("Short URL created successfully!", { id: toastId });
        openModalHandler();
      } else {
        const err = await res.json().catch(() => null);
        if (err?.message === "Invalid long URL") {
          setErrors({ longUrl: "Please enter a valid URL" });
          toast.error("Please enter a valid URL", { id: toastId });
        } else if (
          err?.message === "Custom alias contains invalid characters"
        ) {
          setErrors({ custom: "Custom alias contains invalid characters" });
          toast.error("Custom alias contains invalid characters", {
            id: toastId,
          });
        } else if (err?.message === "Custom alias already in use") {
          setErrors({ custom: "This custom alias is already taken" });
          toast.error("This custom alias is already taken", { id: toastId });
        } else {
          toast.error("An error occurred. Please try again.", {
            id: toastId,
          });
        }
      }
    },
  });

  return (
    <>
      {openModal && <Modal closeModal={setOpenModal} shortUrl={shortUrl!} />}
      <div className="bubPage w-full min-h-dvh">
        <Header showNav />
        <div className="px-4">
          <div className="container bubContainer flex items-center justify-between gap-md-4 gap-12 mt-12">
            <div className="leftSection w-full">
              <form className="w-full" onSubmit={formik.handleSubmit}>
                <div className="longUrl mb-6">
                  <label htmlFor="longUrl" className="mb-2">
                    <ImLink className="link" />
                    Enter your long URL here
                  </label>
                  <input
                    {...formik.getFieldProps("longUrl")}
                    type="url"
                    id="longUrl"
                    name="longUrl"
                    placeholder="https://example.com"
                    required
                  />
                  {formik.touched.longUrl && formik.errors.longUrl ? (
                    <span className="error">{formik.errors.longUrl}</span>
                  ) : null}
                </div>
                {status === "authenticated" && (
                  <div className="alias mb-6">
                    <label htmlFor="custom" className="mb-2">
                      <ImLink className="link" /> Customize your link
                    </label>
                    <div className="aliasInput">
                      <div className="default">go.bub.icu/</div>
                      <input
                        {...formik.getFieldProps("custom")}
                        id="custom"
                        name="custom"
                        placeholder="alias"
                        className="custom"
                      />
                    </div>
                    {formik.touched.custom && formik.errors.custom ? (
                      <span className="error">{formik.errors.custom}</span>
                    ) : null}
                  </div>
                )}

                <div className="buttons">
                  {/* <Link href={"/urls"}>My URLs</Link> */}
                  <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Loading..." : "Bub It"}
                  </button>
                </div>
              </form>
            </div>
            <div className="rightSection">
              <Image src={RightImage} alt="shrink-it" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
