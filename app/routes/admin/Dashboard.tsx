import { Header, StatsCard, TripCard } from "components";
import { dashboardData, allTrips, user } from "~/constants";

const Dashboard = () => {
  const {
    totalUsers,
    usersJoined,
    totalTrips,
    tripsCreated,
    userRole,
    activeUsers,
  } = dashboardData;
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user ? user.name : "Guest"}!`}
        subtitle={`Organize activities and famous destinations now`}
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonth={usersJoined.currentMonth}
            lastMonth={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonth={tripsCreated.currentMonth}
            lastMonth={tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={activeUsers}
            currentMonth={userRole.currentMonth}
            lastMonth={userRole.lastMonth}
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
