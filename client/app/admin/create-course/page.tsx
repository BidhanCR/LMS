"use client"
import DashboardHeader from '../../components/Admin/DashboardHeader'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import Heading from '../../utils/Heading'
import React from 'react'
import CreateCourse from '../../components/Admin/Course/CreateCourse'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Heading
        title="E-learning - Admin"
        description="E-Learning is a platform for students to learn and get help from teachers"
        keyword="Programming, MERN, Redux, Machine Learning"
        />
        <div className='flex'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
                <DashboardHeader/>
                <CreateCourse/>
            </div>
        </div>
    </div>
  )
}

export default Page;