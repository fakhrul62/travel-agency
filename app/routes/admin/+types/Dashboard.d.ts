export interface LoaderData {
  dashboardStats: {
    totalUsers: number;
    usersJoined: { currentMonth: number; lastMonth: number };
    totalTrips: number;
    tripsCreated: { currentMonth: number; lastMonth: number };
    userRole: { total: number; currentMonth: number; lastMonth: number };
    activeUsers: number;
  };
  allTrips: any[];
  allUsers: any[];
  userGrowthPerDay: { count: number; day: string }[];
  tripsCreatedPerDay: { count: number; day: string }[];
  tripsByTravelStyle: { count: number; travelStyle: string }[];
}
