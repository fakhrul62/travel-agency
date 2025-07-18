declare interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imageUrl: string;
}

declare interface UserData extends BaseUser {
  itineraryCreated: number | string;
  status: "user" | "admin";
  user: any;
  _id: string;
  photoURL: any;
  tripCreated: number | string;
  email: string;
  role: string;
  joinedAt: any;
  name: string;
}

// +types/Dashboard.ts
declare interface LoaderData {
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


declare type User = BaseUser;

declare interface Country {
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap?: string;
  flag?: string;
}

declare interface DropdownItem {
  name: string;
}

declare interface SelectProps {
  data: Country[] | DropdownItem[];
  onValueChange: (value: string) => void;
  id: string;
  label: string;
  placeholder: string;
}

declare interface PillProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

declare interface Activity {
  time: string;
  description: string;
}

declare interface DayPlan {
  day: number;
  location: string;
  activities: Activity[];
}

declare interface Location {
  city: string;
  coordinates: [number, number];
  openStreetMap: string;
}

declare interface Trip {
  _id: any;
  id: string;
  name: string;
  description: string;
  estimatedPrice: string;
  duration: number;
  budget: string;
  travelStyle: string;
  interests: string;
  groupType: string;
  country: string;
  imageUrls: string[];
  itinerary: DayPlan[];
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: Location;
  payment_link: string;
}

declare interface TripCardProps {
  id: string;
  name: string;
  location: string;
  imageUrls: string;
  travelStyle: string;
  tags: string[];
  estimatedPrice: string;
}

declare interface StatsCard {
  headerTitle: string;
  total: number;
  lastMonth: number;
  currentMonth: number;
}

declare interface UserInfo {
  email: string;
  _id: any;
  password: string;
  name: string;
  joinedAt: string;
  accountId: string;
}

declare interface TrendResult {
  trend: "increment" | "decrement" | "no change";
  percentage: number;
}

declare interface DashboardStats {
  totalUsers: number;
  usersJoined: {
    currentMonth: number;
    lastMonth: number;
  };
  userRole: {
    total: number;
    currentMonth: number;
    lastMonth: number;
  };
  totalTrips: number;
  tripsCreated: {
    currentMonth: number;
    lastMonth: number;
  };
}

declare interface CreateTripResponse {
  id?: string;
}

declare interface DestinationProps {
  containerClass?: string;
  bigCard?: boolean;
  activityCount: number;
  rating: number;
  bgImage: string;
  title: string;
}

type GetAllTripsResponse = {
  allTrips: Models.Document[];
  total: number;
};

declare interface UsersItineraryCount {
  imageUrl: string;
  name: string;
  count: number;
}

declare interface TripsInterest {
  imageUrl: string;
  name: string;
  interest: string;
}

declare interface InfoPillProps {
  text: string;
  image: string;
}

declare interface TripFormData {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
}
