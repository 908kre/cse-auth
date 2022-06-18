import { System } from "@csea/core/system";
import { useForm } from "react-hook-form";
import { Payload } from "@csea/core/system/update";
import { Payload as DeletePayload } from "@csea/core/system/delete";
import { DeleteBtn } from "@csea/web/components/buttons";

export const SystemForm = (props: {
  system?: System;
  onSubmit: (req: Payload) => void;
  onDelete?: (req: DeletePayload) => void;
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
          {
            props.system ? (
              <div className= 'p-1'>  {props.system.id} </div>
            ) : (
              <input className="input" {...register("id", { required: true })} />
            )

          }
        </div>
      </div>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" {...register("name", { required: true })} />
        </div>
      </div>

      <div
        className="field is-grouped"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
        <div className="control">
          {props.onDelete && (
            <DeleteBtn
              onClick={() => props.system && props.onDelete?.(props.system)}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default SystemForm;
