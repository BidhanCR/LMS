"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import avatar from "../../public/assets/ai.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const { user } = useSelector((state: any) => state.auth);

  const {data:userData, isLoading, refetch} = useLoadUserQuery(undefined, {refetchOnMountOrArgChange:true});
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if(!isLoading){
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("login successfully");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [isLoading,data, userData, isSuccess, socialAuth, refetch]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
    <div className="w-full relative z-[99999]">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile device */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={userData?.user.avatar ? userData?.user.avatar.url : avatar}
                    alt=""
                    height={30}
                    width={30}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer hidden 800px:block"
                    style={{border: activeItem === 5 ? "2px solid #37a39a": ""}}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* mobile side bar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[9999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={userData?.user.avatar ? userData?.user.avatar : avatar}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full cursor-pointer ml-5 my-2"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="ml-5 my-2 cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}

              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright &copy; 2023 E-Learning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp} 
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
