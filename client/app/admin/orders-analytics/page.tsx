"use client";


import React from "react";
import UsersAnalytics from "@/app/components/Admin/Analytics/UsersAnalytics";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import OrdersAnalytics from "@/app/components/Admin/Analytics/OrdersAnalytics";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="E-learning - Admin"
          description="E-Learning is a platform for students to learn and get help from teachers"
          keyword="Programming, MERN, Redux, Machine Learning"
        />
        <div className="flex">
          <div className="1500px:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="1500px:w-[85%] w-[80%]">
            <DashboardHero />
            <OrdersAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
