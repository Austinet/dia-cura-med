import Header from "./header";
import Aside from "./aside";

type Props = {
  children: React.ReactNode;
  role: "patient" | "doctor" | "admin";
  title?: string;
};

const DashboardWrapper = ({ children, role, title }: Props) => {
  return (
    <main className="lg:flex relative">
      {/* Large screens */}
      <div className="hidden lg:block">
        <Aside role={role} />
      </div>

      <section className="w-full">
        <Header role={role} />
        <section>
          <div className="p-5">
            <h1 className="mb-[1.5rem] text-[1.25rem] text-[#020D14] font-semibold leading-normal lg:text-[1.6rem]">
              {title}
            </h1>
          </div>
          {children}
        </section>
      </section>
    </main>
  );
};

export default DashboardWrapper;
