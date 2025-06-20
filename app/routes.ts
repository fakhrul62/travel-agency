// routes.ts
import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route('api/create-trip', 'routes/api/CreateTrip.ts'),
  layout('routes/admin/AdminLayout.tsx', [
    route('dashboard', 'routes/admin/Dashboard.tsx'),
    route('all-users', 'routes/admin/AllUsers.tsx'),
    route('all-trips', 'routes/admin/Trips.tsx'),
    route('trips/create', 'routes/admin/CreateTrip.tsx'),
    route('all-trips/:tripId', 'routes/admin/TripDetails.tsx'),
    route('profile', 'routes/admin/Profile.tsx'), // Added profile route here
  ]),
  layout('routes/user/UserLayout.tsx', [
    route('user-dashboard', 'routes/user/Dashboard.tsx'),
    route('my-trips', 'pages/MyTrips.tsx'),
    route('ai-trip', 'pages/AiTrip.tsx'),
    route('profile', 'pages/Profile.tsx'),
  ]),
  route('sign-up', 'routes/root/SignUp.tsx'),
  route('', 'pages/Home.tsx'),
  route('*', 'pages/MinimalErrorPage.tsx'),
] satisfies RouteConfig;
