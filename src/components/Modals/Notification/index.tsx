import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const Notification = ({
  message,
  seconds,
  type,
}: {
  type: string;
  message: string;
  seconds: number;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, seconds * 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { ease: "easeIn", duration: 0.5 },
          }}
          exit={{ opacity: 0, y: -100, transition: { duration: 0.5 } }}
          className="w-full fixed z-20 flex justify-center top-0"
        >
          <div className="flex items-center gap-2 bg-[--septenary] p-2">
            <Image
              src={`/assets/icons/${type}.svg`}
              alt={type}
              width={20}
              height={20}
            />
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
