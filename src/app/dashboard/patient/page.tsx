import LogoutButton from "@/app/(auth)/logout/page";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";

const PatientDashboard = () => {
  return (
    <DashboardWrapper>
      <p>PatientDashboard</p>
      <LogoutButton />
    </DashboardWrapper>
  );
};

export default PatientDashboard;
