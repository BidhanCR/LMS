"use client"
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  return (
    <div className="min-h-screen">
      <Heading
        title="About us - Elearning"
        description="Elearning is a programming community"
        keyword="Programming community, coding skills , expert insights"
      />
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <About/>
      <Footer/>
    </div>
  );
};

export default Page;
