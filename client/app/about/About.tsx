import React from "react";
import { styles } from "../styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">Elearning</span>
      </h1>
      <br />
      <div className="w-[90%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat in
          obcaecati repellendus harum id facere! Laudantium rerum necessitatibus
          suscipit quibusdam harum tempora dignissimos magnam deleniti porro ut?
          Accusantium, cumque dolorem.
        </p>
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea iste natus
        quia sint assumenda id nesciunt, voluptates esse, quod ad odit dolorum
        et quaerat neque totam ab consequuntur eaque harum?
        <br />
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        consectetur voluptas minima possimus culpa est, ipsum ratione magnam
        nulla numquam, voluptate incidunt corporis porro adipisci!
        <br />
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        consectetur voluptas minima possimus culpa est, ipsum ratione magnam
        nulla numquam, voluptate incidunt corporis porro adipisci!
        <br />
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        consectetur voluptas minima possimus culpa est, ipsum ratione magnam
        nulla numquam, voluptate incidunt corporis porro adipisci!
        <br />
        <br />
        <span className="text-[22px] font-Poppins">Bidhan Chandra Roy</span>
        <h5 className="text-[18px] font-Poppins">
          Founder and CEO of Becodemy
        </h5>
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
