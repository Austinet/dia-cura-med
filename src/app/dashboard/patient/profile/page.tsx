import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import PatientProfile from "./patient-profile";

const ProfileTab = () => {
  return (
    <DashboardWrapper title="Profile" role="patient">
      <section>
        <div className="p-5">
          <PatientProfile />
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default ProfileTab;
