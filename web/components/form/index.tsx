import React from 'react';
import { System } from "@csea/core/system";
import { Role } from "@csea/core/role";
import { useForm } from "react-hook-form";
import { Payload } from "@csea/core/role/update";
import { Payload as DeletePayload } from "@csea/core/role/delete";
import { DeleteBtn } from "@csea/web/components/buttons";

export const Form = (props: {
  placeholder?: string;
  onSubmit: ({value:string}) => void
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
          placeholder={props.placeholder}
          {...register("value")} 
        />
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
