import axiosPublic from "src/lib/axiosPublic";

export const getAllTrips = async () => {
  try {
    const response = await axiosPublic.get("/trips");
    // The backend returns { success: true, trips: [...] }
    if (!response.data || !Array.isArray(response.data.trips)) {
      console.log("No trips found or invalid response format.");
      return { allTrips: [], totalTrips: 0 };
    }
    return {
      allTrips: response.data.trips,
      totalTrips: response.data.trips.length,
    };
  } catch (error) {
    console.error("Error fetching trips:", error);
    return { allTrips: [], totalTrips: 0 };
  }
};

export const getTripById = async (tripId: string) => {
  try {
    const trip = await axiosPublic.get(`/trips/${tripId}`);
    
    if (!trip.data) {
      console.log(`Trip with ID ${tripId} not found.`);
      return null;
    }

    return trip.data;

  } catch (error) {
    console.error(`Error fetching trip with ID ${tripId}:`, error);
    throw error;
  }
}