import { useAuth0 } from '@auth0/auth0-react';

function LoginComponent() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const handleGoogleLogin = () => {
    loginWithRedirect({
    });
  };

  const handleOtherSocialLogin = () => {
    loginWithRedirect({
    });
  };

  return (
    <div>
      <header>
        {!isAuthenticated ? (
          <>
            <button onClick={handleGoogleLogin} className="bg-black text-cyan-600">
              Login with Google
            </button>
            <button onClick={handleOtherSocialLogin} className="bg-black text-cyan-600">
              Login with GitHub
            </button>
          </>
        ) : (
          <div>
            <p>Welcome, {user?.name}</p>
            <button onClick={() => logout()}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default LoginComponent;
