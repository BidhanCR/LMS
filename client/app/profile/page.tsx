"use client"
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'

type Props = {}

const page:FC<Props> = (props) => {
  
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    return (
    <div>
        <Protected>
        <Heading
        title="E-Learning"
        description="E-Learning is a platform for students to learn and get help from teachers"
        keyword="Programming, MERN, Redux, Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
        </Protected>
    </div>
  )
}

export default page