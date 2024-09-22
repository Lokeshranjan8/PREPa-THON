import { AuroraBackground } from "../components/ui/aurora";
import { LoginForm } from "../components/LoginForm";
import { useAuth0 } from "@auth0/auth0-react";
const Login = () => {
  const { isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center">
      {!isAuthenticated ? (
        <>
          <LoginForm />
          <AuroraBackground
            className="-z-10 absolute inset-0"
            children={undefined}
          />
        </>
      ) : (
        <div>
          <p>Welcome, {user?.name}</p>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
