import { AuroraBackground } from "../components/ui/aurora";
import { SignupForm } from "../components/ui/SignupForm";
const Signup = () => {
  return (
    <div className="w-screen h-screen relative flex flex-col justify-center">
      <SignupForm />
      <AuroraBackground
        className="-z-10 absolute inset-0"
        children={undefined}
      />
    </div>
  );
};
export default Signup;
