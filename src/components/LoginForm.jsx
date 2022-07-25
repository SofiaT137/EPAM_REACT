import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "./../hookies/useInput";

export const LoginForm = () => {
  const login = useInput("", { isEmpty: true, minLength: 3, maxLength: 30 });
  const password = useInput("", { isEmpty: true, minLength: 3, maxLength: 30 });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const sendLoginRequest = async (event) => {
    event.preventDefault();
    const reqBody = {
      login: login.value,
      password: password.value,
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch(
        "http://localhost:8085/module2/auth/signIn",
        {
          headers,
          method: "post",
          body: JSON.stringify(reqBody),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        navigate("/certificates")
      }else {
        setError(data.exceptionMessage)
      }
  };

  return (
    <div className="loginForm">
      <div className="formName">
        <h2>Login</h2>
      </div>
      <form>
        <div className="txtField">
          <input
            onChange={(e) => login.onChange(e)}
            onBlur={(e) => login.onBlur(e)}
            value={login.value}
            name="login"
            type="text"
            placeholder="Username"
          />
          {login.isDirty && (
                    <div style={{ color: "red" }}>
                    {login.isEmpty && (' Login cannot be empty!')}
                    {login.minLengthError && ('Min login length is 3')}
                    {login.maxLengthError && ('Max login length is 30')}
                    </div>
                )}
        </div>
        <div className="txtField">
          <input
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            value={password.value}
            name="password"
            type="password"
            placeholder="Password"
          />
          {password.isDirty && password.isEmpty && (
            <div style={{ color: "red" }}> Password cannot be empty!</div>
          )}
          {password.isDirty && password.minLengthError && (
            <div style={{ color: "red" }}> Min password length is 3</div>
          )}
          {password.isDirty && password.maxLengthError && (
            <div style={{ color: "red" }}> Max password length is 30</div>
          )}
        </div>
        {!!error && (<div style={{color: "red"}}>{error}</div>)}
        <button
          disabled={!login.inputValid || !password.inputValid}
        type="submit"
          onClick={sendLoginRequest}
        >
          Login
        </button>
      </form>
    </div>
  );
};

