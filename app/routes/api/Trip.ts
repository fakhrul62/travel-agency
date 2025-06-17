import useAxiosPublic from "src/hook/useAxiosPublic";

export const getAllTrips = async () => {
  const axiosPublic = useAxiosPublic();
  try {
    const allTrips = await axiosPublic.get("/trips");
    
    if (!allTrips.data || allTrips.data.length === 0) {
      console.log("No trips found.");
      return {allTrips: [], totalTrips: 0};
    }

    return {
        allTrips : allTrips.data,
        totalTrips: allTrips.data.length
    }

  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};

export const getTripById = async (tripId: string) => {
  const axiosPublic = useAxiosPublic();
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