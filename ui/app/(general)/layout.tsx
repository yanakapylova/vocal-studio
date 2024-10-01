import { Footer } from "@/app/components/footer/Footer";
import { HeaderGeneral } from "@/app/components/header/HeaderGeneral";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderGeneral />
      {children}
      <Footer />
    </>
  );
}
