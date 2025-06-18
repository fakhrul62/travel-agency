import axiosSecure from "src/lib/axiosSecure";
import { getAllTrips } from "./Trip";

interface Document {
    [key: string]: any;
}

interface UserDocument extends Document {
  role: string;
  joinedAt: string;
}

interface AllUsersResponse {
  total: number;
  documents: UserDocument[];
}

type FilterByDate = (
    items: Document[],
    key: string,
    start : string,
    end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<any> =>{
    const date = new Date();
    const startCurrent = new Date(date.getFullYear(), date.getMonth(), 1).toDateString();
    const startPrev = new Date(date.getFullYear(), date.getMonth() -1, 1).toDateString();
    const endPrev = new Date(date.getFullYear(), date.getMonth(), 0).toDateString();

    const [trips, usersRes] = await Promise.all([
        getAllTrips(),
        axiosSecure.get("/users")
    ]);
    const allUsers: AllUsersResponse = usersRes.data || { total: 0, documents: [] };

    // Support both array and object API responses for users
    let userDocs: UserDocument[] = [];
    if (Array.isArray(usersRes.data)) {
      userDocs = usersRes.data;
    } else if (usersRes.data && Array.isArray(usersRes.data.documents)) {
      userDocs = usersRes.data.documents;
    }
    const allTrips = trips && Array.isArray(trips.allTrips) ? trips.allTrips : [];

    // Convert joinedAt to ISO string for reliable comparison
    const normalizeDate = (dateStr: string) => {
      // Try to parse as Date, fallback to original if invalid
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? dateStr : d.toISOString().slice(0, 10);
    };
    const startCurrentISO = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
    const startPrevISO = new Date(date.getFullYear(), date.getMonth() - 1, 1).toISOString().slice(0, 10);
    const endPrevISO = new Date(date.getFullYear(), date.getMonth(), 0).toISOString().slice(0, 10);

    const filterByDate: FilterByDate = (items, key, start, end) =>
      (Array.isArray(items) ? items : []).filter((item) => {
        const itemDate = normalizeDate(item[key]);
        return (
          itemDate >= start && (!end || itemDate <= end)
        );
      }).length;

    const filterUsersByRole = (role: string): UserDocument[] => {
      return userDocs.filter((user: UserDocument) => user.role === role);
    };

    // Defensive: ensure all types are correct and values are numbers
    const totalUsers = userDocs.length;
    const usersJoinedCurrentMonth = Number(
      filterByDate(userDocs, "joinedAt", startCurrentISO, undefined)
    );
    const usersJoinedLastMonth = Number(
      filterByDate(userDocs, "joinedAt", startPrevISO, endPrevISO)
    );
    const totalTrips = typeof trips.totalTrips === 'number' ? trips.totalTrips : 0;
    const tripsCreatedCurrentMonth = Number(
      filterByDate(allTrips, "createdAt", startCurrentISO, undefined)
    );
    const tripsCreatedLastMonth = Number(
      filterByDate(allTrips, "createdAt", startPrevISO, endPrevISO)
    );
    const userRoleTotal = Number(filterUsersByRole("user").length);
    const userRoleCurrentMonth = Number(
      filterByDate(filterUsersByRole("user"), "joinedAt", startCurrentISO, undefined)
    );
    const userRoleLastMonth = Number(
      filterByDate(filterUsersByRole("user"), "joinedAt", startPrevISO, endPrevISO)
    );

    return {
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
      activeUsers: 0, // Placeholder, update if you have logic for this
    };
}