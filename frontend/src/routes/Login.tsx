<<<<<<< HEAD
import { AuroraBackground } from "../Components/ui/aurora";
import { LoginForm } from "../Components/LoginForm";
import { useAuth0 } from "@auth0/auth0-react";
=======
import { AuroraBackground } from "../components/ui/aurora";
import { LoginForm } from "../components/LoginForm";
>>>>>>> 8feed97df0b9aa3c3a6e2032ab252bbc93a3d39a
const Login = () => {
  return (
    <div className="w-screen h-screen relative flex flex-col justify-center">
      <LoginForm />
      <AuroraBackground
        className="-z-10 absolute inset-0"
        children={undefined}
      />
    </div>
  );
};

export default Login;
