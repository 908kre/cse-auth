import { System } from "@csea/core/system";
import { useForm } from "react-hook-form";
import { Payload } from "@csea/core/system/update";
import { Payload as DeletePayload } from "@csea/core/system/delete";
import { DeleteBtn } from "@csea/web/components/buttons";

export const SystemForm = (props: {
  system?: System;
  onSubmit: (req: Payload) => void;
  onDelete?: (req: DeletePayload) => void;
  isAdmin?:boolean;
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
      <label className="label is-medium">
        システム
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">ID</label>
        </div>
        <div className='field-body'>
          <div className="field">
            {
              props.system?.id ? (
                <div className='m-2'> {props.system.id} </div>
              ) : (
                <div className="control">
                  <input className="input" {...register("id", { required: true })} />
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">名前</label>
        </div>
        <div className='field-body'>
          <div className="field">
            <div className="control">
              <input className="input" {...register("name", { required: true })} />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal"></div>
        <div className='field-body'>
          <div className="field">
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
                {(props.onDelete && props.isAdmin !== false) ? (
                  <DeleteBtn
                    onClick={() => props.system && props.onDelete?.(props.system)}
                  />
                ): null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SystemForm;
