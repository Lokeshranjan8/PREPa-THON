import { AuroraBackground } from "../components/ui/aurora";
import { LoginForm } from "../components/LoginForm";
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
