// routes.ts
import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
    route('sign-in', 'routes/root/SignIn.tsx'),
    layout('routes/admin/AdminLayout.tsx', [
        route('dashboard', 'routes/admin/Dashboard.tsx'),
        route('all-users', 'routes/admin/AllUsers.tsx'),
        route('trips', 'routes/admin/Trips.tsx'),
        route('trips/create', 'routes/admin/CreateTrip.tsx'),
    ]),
] satisfies RouteConfig;