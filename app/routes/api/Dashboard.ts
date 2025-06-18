// src/api/Dashboard.ts
import axiosSecure from "src/lib/axiosSecure";
import { getAllTrips } from "./Trip";

interface Document {
  [key: string]: any;
}

interface UserDocument extends Document {
  role: string;
  joinedAt: string;
}

// Helper to normalize dates
const normalizeJoinedAtDate = (rawDate: string): string | null => {
  if (!rawDate) return null;
  const cleaned = rawDate.replace(/^[A-Za-z]+,\s*/, "").replace(/\sat\s/, " ");
  const parsedDate = new Date(cleaned);
  if (isNaN(parsedDate.getTime())) return null;
  return parsedDate.toISOString().slice(0, 10);
};

export const getUsersAndTripsStats = async () => {
  const [tripsRes, usersRes] = await Promise.all([
    getAllTrips(),
    axiosSecure.get("/users"),
  ]);

  let userDocs: UserDocument[] = [];
  if (Array.isArray(usersRes.data)) {
    userDocs = usersRes.data;
  } else if (usersRes.data?.documents && Array.isArray(usersRes.data.documents)) {
    userDocs = usersRes.data.documents;
  }

  userDocs = userDocs
    .map((user) => ({
      ...user,
      joinedAt: normalizeJoinedAtDate(user.joinedAt) || user.joinedAt,
    }))
    .filter((user) => user.joinedAt !== null);

  const allTrips = tripsRes?.allTrips ?? [];

  const now = new Date();
  const startCurrentISO = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const startPrevISO = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 10);
  const endPrevISO = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().slice(0, 10);

  const filterByDate = (items: Document[], key: string, start: string, end?: string) =>
    items.filter((item) => {
      const date = new Date(item[key]);
      if (isNaN(date.getTime())) return false;
      const isoDate = date.toISOString().slice(0, 10);
      return isoDate >= start && (!end || isoDate <= end);
    }).length;

  const filterUsersByRole = (role: string) => userDocs.filter((u) => u.role === role);

  const totalUsers = userDocs.length;
  const usersJoinedCurrentMonth = filterByDate(userDocs, "joinedAt", startCurrentISO);
  const usersJoinedLastMonth = filterByDate(userDocs, "joinedAt", startPrevISO, endPrevISO);
  const totalTrips = typeof tripsRes.totalTrips === "number" ? tripsRes.totalTrips : allTrips.length;
  const tripsCreatedCurrentMonth = filterByDate(allTrips, "createdAt", startCurrentISO);
  const tripsCreatedLastMonth = filterByDate(allTrips, "createdAt", startPrevISO, endPrevISO);
  const userRoleTotal = filterUsersByRole("user").length;
  const userRoleCurrentMonth = filterByDate(filterUsersByRole("user"), "joinedAt", startCurrentISO);
  const userRoleLastMonth = filterByDate(filterUsersByRole("user"), "joinedAt", startPrevISO, endPrevISO);

  return {
    dashboardStats: {
      totalUsers,
      usersJoined: {
        currentMonth: usersJoinedCurrentMonth,
        lastMonth: usersJoinedLastMonth,
      },
      totalTrips,
      tripsCreated: {
        currentMonth: tripsCreatedCurrentMonth,
        lastMonth: tripsCreatedLastMonth,
      },
      userRole: {
        total: userRoleTotal,
        currentMonth: userRoleCurrentMonth,
        lastMonth: userRoleLastMonth,
      },
      activeUsers: 0,
    },
    allTrips,
    allUsers: userDocs,
    userGrowthPerDay: getUserGrowthPerDay(userDocs),
    tripsCreatedPerDay: getTripsCreatedPerDay(allTrips),
    tripsByTravelStyle: getTripsByTravelStyle(allTrips),
  };
};

export const getUserGrowthPerDay = (users: UserDocument[] = []) => {
  const counts: Record<string, number> = {};
  users.forEach((user) => {
    const day = new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    counts[day] = (counts[day] || 0) + 1;
  });
  return Object.entries(counts).map(([day, count]) => ({ day, count }));
};

export const getTripsCreatedPerDay = (trips: Document[] = []) => {
  const counts: Record<string, number> = {};
  trips.forEach((trip) => {
    const day = new Date(trip.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    counts[day] = (counts[day] || 0) + 1;
  });
  return Object.entries(counts).map(([day, count]) => ({ day, count }));
};

export const getTripsByTravelStyle = (trips: Document[] = []) => {
  const counts: Record<string, number> = {};
  trips.forEach((trip) => {
    if (trip.travelStyle) counts[trip.travelStyle] = (counts[trip.travelStyle] || 0) + 1;
  });
  return Object.entries(counts).map(([travelStyle, count]) => ({ travelStyle, count }));
};
