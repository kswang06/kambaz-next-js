"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  useEffect(() => {
    router.replace(currentUser ? "/account/profile" : "/account/signin");
  }, [currentUser, router]);

  return <div className="p-3">Loading...</div>;
}
