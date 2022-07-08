import React from 'react';
import { useState } from 'react';
import { Admin } from "@csea/core/auth";
import { useForm } from "react-hook-form";
import AdminSelector  from "@csea/web/components/admin-selector";

export type Payload = {
  id: string;
  admin: Admin;
};

export const AdminForm = (props: {
  onSubmit: (req: Payload) => void
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [admin, setAdmin] = React.useState<Admin>(Admin.Maintainer);

  const onSubmit = (data) => {
    props.onSubmit({...data, admin})
    reset()
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
        <AdminSelector value={admin} onChange={ setAdmin }/>
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
