import LogoutButton from "@/app/(auth)/logout/page";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";

const PatientDashboard = () => {
  return (
    <DashboardWrapper role="patient" title="Dashboard">
      <p>PatientDashboard</p>
      <LogoutButton />
    </DashboardWrapper>
  );
};

export default PatientDashboard;
