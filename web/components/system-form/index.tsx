import { System } from "@csea/core/system";
import { useForm } from "react-hook-form";
import { Payload } from "@csea/core/system/update";

export const SystemForm = (props: {
  system?: System;
  onSubmit: (req: Payload) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: {
      id: props.system?.id,
      name: props.system?.name,
    },
  });
  const onSubmit = (data) => props.onSubmit?.(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">ID</label>
        <div className="control">
          <input className="input" {...register("id", { required: true })} />
        </div>
      </div>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" {...register("name", { required: true })} />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default SystemForm;
