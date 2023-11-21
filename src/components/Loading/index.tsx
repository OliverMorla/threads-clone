"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeVariant1 } from "@/config/framer-animations";
import Image from "next/image";

const LoadingWithBg = () => {
  return (
    <AnimatePresence>
      <motion.main
        variants={fadeVariant1}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full h-full bg-[--primary] flex justify-center items-center"
      >
        <Image
          src={"/assets/loading/eclipse.svg"}
          width={512}
          height={512}
          alt="loading.gif"
          className="object-cover"
        />
      </motion.main>
    </AnimatePresence>
  );
};

const LoadingWithoutBg = () => {
  return (
    <AnimatePresence>
      <motion.main
        variants={fadeVariant1}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src={"/assets/loading/eclipse.svg"}
          width={512}
          height={512}
          alt="loading.gif"
          className="object-cover"
        />
      </motion.main>
    </AnimatePresence>
  );
};

export { LoadingWithBg, LoadingWithoutBg };
