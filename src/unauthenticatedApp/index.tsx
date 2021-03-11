import { useState } from "react";
import RegisterScreen from "unauthenticatedApp/register";
import LoginScreen from "./login";

const UnauthenticatedApp = () => {
  const [isRegister, setRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};

export default UnauthenticatedApp;
