"use client"

import EditCategories from '@/app/components/Admin/Customization/EditCategories'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar'
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
      <div className="flex">
        <div className="1500px:w-[15%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="1500px:w-[85%] w-[80%]">
          <DashboardHero/>
          <EditCategories/>
        </div>
      </div>
      </AdminProtected>
    </div>
  )
}

export default Page;