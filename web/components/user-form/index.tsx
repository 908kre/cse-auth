import React from 'react';
import { System } from "@csea/core/system";
import { Role } from "@csea/core/role";
import { useForm } from "react-hook-form";
import { Payload } from "@csea/core/role/update";
import { Payload as DeletePayload } from "@csea/core/role/delete";
import { DeleteBtn } from "@csea/web/components/buttons";

export const UserForm = (props: {
  onSubmit: ({userId:string}) => void
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => props.onSubmit(data)

  return (
    <div className="field is-horizontal">
      <input 
        className="input" 
        placeholder="User ID"
        {...register("userId")} 
      />
      <button type="submit" className="button is-link" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
    </div>
  );
};

export default UserForm;
