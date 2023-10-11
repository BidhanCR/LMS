import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Reviews/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment: "Lorem ispsum dolor sit amet consectetur adiposicing elit.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment: "Lorem ispsum dolor sit amet consectetur adiposicing elit.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment: "Lorem ispsum dolor sit amet consectetur adiposicing elit.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment: "Lorem ispsum dolor sit amet consectetur adiposicing elit.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%]d 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/banner-img-1.png")}
            alt="business"
            width={800}
            height={800}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Student Are <span className="text-gradient">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem illo
            aliquid, asperiores suscipit eum maxime quos aliquam voluptatem
            distinctio unde dolores velit sequi ipsa soluta eius ex commodi
            culpa consectetur!
          </p>
        </div>
        <br />
        <br />
      </div>
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
            {
                reviews && reviews.map((i, index)=> (
                    <ReviewCard item={i} key={index}/>
                ))
            }
        </div>
    </div>
  );
};

export default Reviews;
