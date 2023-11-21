import { AnimationProps } from "framer-motion";

interface AnimationPropsConfig {
  hidden: AnimationProps["initial"];
  visible: AnimationProps["animate"];
}

const fadeVariant1: AnimationPropsConfig | any = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeVariant2: AnimationPropsConfig | any = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const fadeVariant3: AnimationPropsConfig | any = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export { fadeVariant1, fadeVariant2, fadeVariant3 };
