import { redirect } from "next/navigation";

const UserManagement = () => {
  return redirect("/dashboard/admin/users-management/patients");
};

export default UserManagement;
