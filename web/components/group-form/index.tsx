import React from 'react';
import { System } from "@csea/core/system";
import { Role } from "@csea/core/role";
import { useForm } from "react-hook-form";

export type Payload = {
  groupId: string;
  post: string;
};

export const GroupForm = (props: {
  onSubmit: (req: Payload) => void
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field is-horizontal">
        <input 
          className="input" 
          type='text'
          placeholder={"グループID"}
          {...register("groupId")} 
        />
        <input 
          className="input" 
          type='text'
          placeholder={"役職コード"}
          {...register("post")} 
        />
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  );
};

export default GroupForm;
