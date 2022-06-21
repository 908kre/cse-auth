import { System } from "@csea/core/system";
import { Role } from "@csea/core/role";
import { useForm } from "react-hook-form";
import { Payload } from "@csea/core/role/update";
import { Payload as DeletePayload } from "@csea/core/role/delete";
import { DeleteBtn } from "@csea/web/components/buttons";

export const RoleForm = (props: {
  role?: Role;
  systemId: string;
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
      systemId: props.systemId,
      id: props.role?.id,
      name: props.role?.name,
      charge: props.role?.charge
    },
  });
  const onSubmit = (data) => props.onSubmit?.(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label is-medium">
        ロール
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">システムID</label>
        </div>
        <div className='field-body'>
          <div className="field">
            <div className='m-2'> { props.systemId } </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">ロールID</label>
        </div>
        <div className='field-body'>
          <div className="field">
            {
              props.role?.id ? (
                <div className='m-2'> {props.role.id} </div>
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
        <div className="field-label is-normal">
          <label className="label">Charge</label>
        </div>
        <div className='field-body'>
          <div className="field">
            <div className="control">
              <input className="input" {...register("charge", { required: true })} />
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
                {props.onDelete && (
                  <DeleteBtn
                    onClick={() => props.role && props.onDelete?.(props.role)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RoleForm;
