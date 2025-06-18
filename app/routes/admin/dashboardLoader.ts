import { getUsersAndTripsStats } from "../api/Dashboard";


export async function dashboardLoader() {
  return await getUsersAndTripsStats();
}
