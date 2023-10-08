"use client"

import EditHero from '@/app/components/Admin/Customization/EditHero'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'


type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
      <Heading
        title="E-learning - Admin"
        description="E-Learning is a platform for students to learn and get help from teachers"
        keyword="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero/>
          <EditHero/>
        </div>
      </div>
      </AdminProtected>
    </div>
  )
}

export default Page;