import { AuroraBackground } from "../components/ui/aurora";
import { SignupForm } from "../components/ui/SignupForm";
import { motion } from "framer-motion";

const Signup = () => {
  return (
    <AuroraBackground className="-z-10 absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          // delay: 0.3,
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="w-screen h-screen relative flex flex-col justify-center">
        <SignupForm />
      </motion.div>
    </AuroraBackground>

  );
};
export default Signup;
