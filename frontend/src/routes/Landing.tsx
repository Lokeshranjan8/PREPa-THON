import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora";
import { Link } from "react-router-dom";

const Landing = () => {

  return (

    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Unlock the mysteries of cosmic X-ray bursts
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          with our advanced detection and analysis tool for astronomers
        </div>
        <Link to="/login">
          <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Sign In
          </button>
        </Link>
      </motion.div>
    </AuroraBackground>
  );
};

export default Landing;
