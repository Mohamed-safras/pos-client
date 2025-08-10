import Welcome from "components/Welcome";
import RecentOrders from "./recentorders";

const Layout = () => {
  return (
    <section className="bg-[var(--background-variant-dark)] p-6 flex flex-row gap-6">
      <div className=" flex-2/3">
        <Welcome />
        <div className="mt-6 flex flex-row gap-4 items-center">
          <div className="p-4 rounded-lg bg-[var(--background)] text-[var(--muted-foreground)]  text-xl flex-1">
            Total earnings
          </div>
          <div className="p-4 rounded-lg bg-[var(--background)]  text-[var(--muted-foreground)] text-xl flex-1">
            In-progress orders
          </div>
        </div>
        {/* recent orders */}
        <div className="bg-[var(--background)] mt-6 p-4 rounded-lg">
          <RecentOrders />
        </div>
      </div>

      <div className="text-center bg-[var(--background)] rounded-2xl text-[var(--foreground)] flex-1/3"></div>
    </section>
  );
};

export default Layout;
