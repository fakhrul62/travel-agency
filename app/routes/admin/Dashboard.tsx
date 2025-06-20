// Dashboard.tsx
import { useLoaderData, Navigate } from "react-router";
import { Header, StatsCard, TripCard } from "components";
import useAdmin from "src/hook/useAdmin";
import useAuth from "src/hook/useAuth";
import UserGrowthChart from "components/UserGrowthChart";
import TripsCreatedChart from "components/TripsCreatedChart";
import TripsByStyleChart from "components/TripsByStyleChart";
import { getUsersAndTripsStats } from "../api/Dashboard";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import PageLoader from "../../components/PageLoader";
import { Helmet } from "react-helmet";

export const loader = async () => {
  const {
    dashboardStats,
    allTrips,
    allUsers,
    userGrowthPerDay,
    tripsCreatedPerDay,
    tripsByTravelStyle,
  } = await getUsersAndTripsStats();

  // Import the new function
  const { getUserGrowthPerMonth } = await import("../api/Dashboard");
  const userGrowthPerMonth = getUserGrowthPerMonth(allUsers);

  return {
    dashboardStats,
    allTrips,
    allUsers,
    userGrowthPerDay,
    userGrowthPerMonth, // add this
    tripsCreatedPerDay,
    tripsByTravelStyle,
  };
};

const Dashboard = () => {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  // const [isAdmin, isAdminLoading] = useAdmin();
  const { user } = useAuth();

  // Animation refs
  const mainRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tripsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }
    if (tripsRef.current) {
      gsap.fromTo(
        tripsRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );
    }
    if (chartsRef.current) {
      gsap.fromTo(
        chartsRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.7, ease: "power2.out" }
      );
    }
  }, []);

  const defaultStats = {
    totalUsers: 0,
    usersJoined: { currentMonth: 0, lastMonth: 0 },
    totalTrips: 0,
    tripsCreated: { currentMonth: 0, lastMonth: 0 },
    userRole: { total: 0, currentMonth: 0, lastMonth: 0 },
    activeUsers: 0,
  };

  const dashboardStats = {
    ...defaultStats,
    ...(loaderData?.dashboardStats || {}),
  };

  const allTrips = Array.isArray(loaderData?.allTrips)
    ? loaderData.allTrips
    : [];

  // if (isAdminLoading || typeof user === 'undefined') {
  if (typeof user === 'undefined') {
    return (
      <main className="dashboard wrapper flex justify-center items-center min-h-[300px]">
        <PageLoader />
      </main>
    );
  }

  if (user === null) {
    return <Navigate to="/sign-up" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | ToureChol</title>
        <meta name="description" content="Admin dashboard for ToureChol travel agency." />
      </Helmet>
      <main className="dashboard wrapper" ref={mainRef}>
        <Header
          title={`Welcome ${user.displayName || user.email || "User"}!`}
          subtitle="Organize activities and famous destinations now"
        />
        <section className="flex flex-col gap-6" ref={statsRef}>
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
        <section className="container" ref={tripsRef}>
          <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
          <div className="trip-grid">
            {allTrips.slice(0, 3).map((trip: any) => (
              <TripCard
                key={trip._id}
                id={trip._id}
                name={trip.name}
                imageUrls={trip.imageUrls?.[0]}
                location={trip.itinerary?.[0]?.location || ""}
                tags={[trip.interests, trip.travelStyle]}
                travelStyle={trip.travelStyle}
                estimatedPrice={trip.estimatedPrice}
              />
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5" ref={chartsRef}>
          <div className="p-6 flex flex-col gap-6 bg-white shadow-400 rounded-20 text-dark-100">
            <h1 className="text-xl font-semibold text-dark-100">User Growth</h1>
            <UserGrowthChart data={loaderData.userGrowthPerMonth || []} />
          </div>
          <div className="p-6 flex flex-col gap-6 bg-white shadow-400 rounded-20 text-dark-100">
            <h1 className="text-xl font-semibold text-dark-100">
              Trending Travel Styles
            </h1>
            <TripsByStyleChart data={loaderData.tripsByTravelStyle || []} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
