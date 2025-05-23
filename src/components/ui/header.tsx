"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function Header() {
  const [scaleValue, setScaleValue] = useState(1);

  useEffect(() => {
    // This runs only in the browser
    const handleResize = () => {
      const width = window.innerWidth;
      setScaleValue(width < 768 ? 1.5 : 2);
    };

    handleResize(); // Set scale on first render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full lg:w-[1440px] sm:h-auto md:h-20 mx-auto sm:grid md:flex items-center justify-between px-4 md:px-10">
      {/* Title Section */}
      <div className="w-auto md:w-[400px] h-16 flex italic font-bold items-center justify-center">
        <motion.div
          className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[15px] text-center"
          animate={{ scale: scaleValue, transition: { duration: 1 } }}
          initial={{ scale: 0 }}
        >
          Resume Builder by Uzair
        </motion.div>
      </div>

      {/* Icon Section */}
      <div className="w-auto md:w-[200px] h-16 flex gap-4 justify-center items-center">
        <Icon
          icon="line-md:facebook"
          className="text-[24px] sm:text-[30px] md:text-[35px] lg:text-[40px]"
        />
        <Icon
          icon="line-md:twitter-x"
          className="text-[24px] sm:text-[30px] md:text-[35px] lg:text-[40px]"
        />
        <Icon
          icon="line-md:linkedin"
          className="text-[24px] sm:text-[30px] md:text-[35px] lg:text-[40px]"
        />
      </div>
    </div>
  );
}
