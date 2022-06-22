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
  return (
    <div> aaa </div>
  );
};

export default RoleForm;
