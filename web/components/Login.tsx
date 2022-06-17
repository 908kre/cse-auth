import React from "react";

const Login = (props: {
  userId: string;
  password: string;
  onUserIdInput: (value: string) => void;
  onPasswordInput: (value: string) => void;
  onLoginClick: () => void;
}) => {
  const {
    userId,
    password,
    onUserIdInput,
    onPasswordInput,
    onLoginClick,
  } = props;
  return (
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
            <div className="box">
              <div className="field">
                <label className="label">{("user")}</label>
                <div className="control has-icons-left">
                  <input
                    type="userName"
                    placeholder="e.g. Canon Taro"
                    className="input"
                    required
                    value={userId}
                    onChange={(e) => onUserIdInput(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">{("password")}</label>
                <div className="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    className="input"
                    required
                    value={password}
                    onChange={(e) => onPasswordInput(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <button
                  className="button is-success"
                  onClick={() => onLoginClick()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
