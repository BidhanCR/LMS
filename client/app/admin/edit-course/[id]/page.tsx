"use client"


import EditCourse from "@/app/components/Admin/Course/EditCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";


type Props = {}

const Page = ({params}:any) => {
  const id = params.id;
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
                <EditCourse id={id} />
            </div>
        </div>
    </div>
  )
}

export default Page;