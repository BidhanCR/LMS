import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === " ") {
      return;
    }else{
      router.push(`/courses?title=${search}`)
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full items-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="w-full hero_animation md:w-[40%] flex items-center justify-center">
              <Image
                src={data?.layout?.banner?.image?.url}
                alt=""
                height={450}
                width={450}
                className="object-contain rounded-full"
              />
            </div>
            <div className="w-full md:w-[60%] flex flex-col items-center text-center mt-[150px]">
              <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full  font-[600] font-Josefin py-2 leading-[75px]">
                {data?.layout?.banner?.title}
              </h2>
              <br />
              <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px]">
                {data?.layout?.banner?.subTitle}
              </p>
              <br />
              <br />
              <div className="relative 1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e: any) => setSearch(e.target.value)}
                  placeholder="Search Courses..."
                  className="bg-transparent border dark:border-none dark:bg-[#575757] rounded-[5px] p-2 w-full h-full outline-none text-[#000] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                />
                <div
                  className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                  onClick={handleSearch}
                >
                  <BiSearch className="text-white" size={30} />
                </div>
              </div>
              <br />
              <br />
              <div className="w-[90%] flex items-center">
                <Image
                  src={require("../../../public/assets/client-3.jpg")}
                  alt=""
                  className="rounded-full"
                />
                <Image
                  src={require("../../../public/assets/client-1.jpg")}
                  alt=""
                  className="ml-[-20px] rounded-full"
                />
                <Image
                  src={require("../../../public/assets/client-2.jpg")}
                  alt=""
                  className="rounded-full ml-[-20px] "
                />
                <p className="dark:text-white">
                  500K+ People already trusted us.
                  <Link
                    href={"/courses"}
                    className="dark:text-[#46e256] text-[crimson] ml-1"
                  >
                    View Courses
                  </Link>
                </p>
              </div>
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

// absolute top-[100px] 1000px:top-[unset] 1100px:h-[600px] 1100px:w-[600px] 1500px:h-[700px] 1500px:w-[700px] h-[50vh] w-[50vh]

// 1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10 mt-[80px]
