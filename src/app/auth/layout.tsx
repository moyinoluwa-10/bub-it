import Header from "@/components/layout/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="formPage w-full min-h-dvh pb-12">
        <Header />
        <main>
          <div className="loginCont mt-2 mx-auto">{children}</div>
        </main>
      </div>
    </>
  );
}

