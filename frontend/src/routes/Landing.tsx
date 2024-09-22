import { motion } from "framer-motion";
import { AuroraBackground } from "../Components/ui/aurora";
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
        <div className="text-3xl md:text-6xl font-bold dark:text-white text-center">
          Unlock the mysteries of cosmic X-ray bursts
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-center">
          with our advanced detection and analysis tool for astronomers
        </div>
        <div className="flex gap-4 justify-center">
          <Link to="/signup">
            <button className="bg-slate-800 dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 hover:bg-blue-950">
              Create Account
            </button>
          </Link>
          <Link to="/login" className="flex gap-5">
            <button className="bg-slate-800 dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 hover:bg-blue-950">
              Login
            </button>
          </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default Landing;
