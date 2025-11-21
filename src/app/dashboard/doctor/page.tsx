import LogoutButton from "@/app/(auth)/logout/page";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";

const DoctorDashboard = () => {
  return (
    <DashboardWrapper role="admin" title="Dashboard">
      <p>DoctorDashboard</p>
      <LogoutButton />
    </DashboardWrapper>
  );
};

export default DoctorDashboard;
