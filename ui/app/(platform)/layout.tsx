"use client";

import { HeaderPlatform } from "@/app/components/header/HeaderPlatform";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setActiveUser } from "../features/usersSlice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  if (!sessionStorage.getItem("user")) {
    router.push("/login");
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setActiveUser());
  }, []);

  return (
    <>
      <HeaderPlatform />
      {children}
    </>
  );
}
