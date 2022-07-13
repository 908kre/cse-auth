import React from 'react';
import { useState } from 'react';
import { System } from "@csea/core/system";
import { useForm } from "react-hook-form";

export type Payload = {
  id: string;
  systemId: string;
};

export const MaintainerForm = (props: {
  systems:System[];
  onSubmit: (req: Payload) => void
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [systemId, setSystemId] = React.useState<string | undefined>(undefined);

  const onSubmit = (data) => {
    props.onSubmit({...data})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field is-horizontal">
        <input 
          className="input" 
          type='text'
          placeholder={"ユーザーID"}
          {...register("id")} 
        />
        <div className="select is-fullwidth">
          <select
            {...register("systemId")} 
          >
            <option value="" disabled selected style={{display:"none"}}>選択してください</option>
            {props.systems.map(x => <option key={x.id} value={x.id}> {x.name} </option>)}
          </select>
        </div>
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MaintainerForm;
