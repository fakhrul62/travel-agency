import { Header, StatsCard, TripCard } from "components";
import useAdmin from "src/hook/useAdmin";
import { Navigate } from "react-router";
import { dashboardData, allTrips, user } from "~/constants";
import useAuth from "src/hook/useAuth";
import { getUsersAndTripsStats } from "../api/Dashboard";
import type { Route } from "./+types/Dashboard";

export const clientLoader = async () => {
  const [dashboardStats] = await Promise.all([
    getUsersAndTripsStats(),
  ])

  return { dashboardStats};
}

const Dashboard = ({loaderData}: Route.ComponentProps) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const {user} = useAuth();
  // Use dashboardStats from loaderData, fallback to default if missing or missing keys
  const defaultStats = {
    totalUsers: 0,
    usersJoined: { currentMonth: 0, lastMonth: 0 },
    totalTrips: 0,
    tripsCreated: { currentMonth: 0, lastMonth: 0 },
    userRole: { total: 0, currentMonth: 0, lastMonth: 0 },
    activeUsers: 0,
  };
  const dashboardStats = { ...defaultStats, ...(loaderData?.dashboardStats || loaderData || {}) };

  
  // Show loading state while checking admin status
  if (isAdminLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <img src="/assets/icons/loader.svg" alt="Loading" className="w-12 h-12 animate-spin" />
    </div>;
  }
  
  // Redirect non-admin users
  if (!isAdmin || !user) {
    console.log("Not an admin, redirecting to home page...");
    return <Navigate to="/" replace />;
  }

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user ? user.displayName || user.email : 'John Doe'}!`}
        subtitle={`Organize activities and famous destinations now`}
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonth={dashboardStats.usersJoined.currentMonth}
            lastMonth={dashboardStats.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonth={dashboardStats.tripsCreated.currentMonth}
            lastMonth={dashboardStats.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats.userRole.total}
            currentMonth={dashboardStats.userRole.currentMonth}
            lastMonth={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips.slice(0,4).map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id.toString()}
              name={trip.name}
              imageUrls={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location || ""}
              tags={trip.tags}
              travelStyle={trip.travelStyle}
              estimatedPrice={trip.estimatedPrice}
            />
          ))}

        </div>
      </section>
    </main>
  );
};

export default Dashboard;
