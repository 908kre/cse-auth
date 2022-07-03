import React from "react";
import { useForm } from "react-hook-form";
import { ReqInput, ReqKind } from "@csea/core";
type Payload = (ReqInput & { kind: ReqKind.SignIn })['payload']

export const LoginPage = (props: {
  id: string;
  password: string;
  onSubmit: (req: Payload) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: {
      id: props.id,
      password: props.password,
    },
  });
  const onSubmit = (data) => props.onSubmit?.(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="box">
                <div className="field">
                  <label className="label">{"user"}</label>
                  <div className="control has-icons-left">
                    <input
                      placeholder="e.g AAA000000"
                      className="input"
                      {...register("id", { required: true })}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">{"password"}</label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      {...register("password", { required: true })}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
