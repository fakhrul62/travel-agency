import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import gsap from "gsap";
import { FaSuitcase, FaStar, FaMapMarkerAlt, FaGift, FaBell, FaPlane, FaChartLine, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "app/routes/api/Trip";

import useUserProfile from "src/hook/useUserProfile";

const UserDashboard: React.FC = () => {
  const { userProfile } = useUserProfile();
  const { data } = useQuery({
    queryKey: ["allTrips"],
    queryFn: getAllTrips,
  });
  const userTrips = React.useMemo(() => {
    if (!userProfile || !data?.allTrips) return [];
    return data.allTrips.filter((trip: any) => trip.userId === userProfile.email);
  }, [userProfile, data]);

  // Animation refs
  const welcomeRef = useRef<HTMLDivElement>(null);
  const tripsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (welcomeRef.current) {
      gsap.fromTo(welcomeRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" });
    }
    if (tripsRef.current) {
      gsap.fromTo(tripsRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power2.out" });
    }
    if (statsRef.current) {
      gsap.fromTo(statsRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, delay: 0.4, ease: "back.out(1.7)" });
    }
    if (notificationsRef.current) {
      gsap.fromTo(notificationsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.6, ease: "power2.out" });
    }
    if (rewardsRef.current) {
      gsap.fromTo(rewardsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.8, ease: "power2.out" });
    }
  }, []);

  // Example user stats
  const stats = [
    { label: "Trips Taken", value: userTrips.length, icon: <FaSuitcase className="text-blue-600" /> },
    { label: "Trips Created", value: userTrips.length, icon: <FaGift className="text-blue-600" /> },
    { label: "Favorite Places", value: 4, icon: <FaMapMarkerAlt className="text-pink-500" /> },
  ];

  // Example notifications
  const notifications = [
    { message: "Your trip to Bali is coming up!", icon: <FaPlane className="text-blue-400" /> },
    { message: "You earned a new badge!", icon: <FaGift className="text-purple-500" /> },
    { message: "2 friends liked your review.", icon: <FaHeart className="text-pink-400" /> },
  ];

  // Example rewards
  const rewards = [
    { label: "Loyalty Points", value: 1200, icon: <FaGift className="text-yellow-500" /> },
    { label: "Next Reward", value: "Free Trip Upgrade", icon: <FaChartLine className="text-blue-600" /> },
  ];

  // Example trips
  const trips = [
    { name: "Bali Adventure", date: "2025-07-10", status: "Upcoming" },
    { name: "Paris Getaway", date: "2025-05-15", status: "Completed" },
    { name: "Tokyo Tour", date: "2025-03-22", status: "Completed" },
  ];

  return (
    <>
      <Helmet>
        <title>User Dashboard | ToureChol</title>
        <meta name="description" content="Your personal dashboard for trips and account info." />
        
      </Helmet>
      <div className="p-0 md:p-8 bg-white min-h-screen">
        {/* Welcome */}
        <div ref={welcomeRef} className="mb-8">
          <h1
            className="text-3xl md:text-4xl mb-2"
            style={{ fontFamily: 'League Gothic, sans-serif', letterSpacing: '0.01em', textTransform: 'uppercase', color: '#222' }}
          >
            Welcome, {userProfile?.name || "User"}!
          </h1>
          <p className="text-lg font-medium" style={{ color: '#444' }}>Ready for your next adventure?</p>
        </div>
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col items-center gap-2 bg-white rounded-xl p-6 shadow border border-[#eee] hover:scale-105 transition-transform duration-200">
              <div className="text-3xl" style={{ color: '#222' }}>{stat.icon}</div>
              <span className="block text-2xl font-extrabold" style={{ color: '#222' }}>{stat.value}</span>
              <span className="block text-xs font-bold uppercase tracking-wider" style={{ color: '#888' }}>{stat.label}</span>
            </div>
          ))}
        </div>
        {/* Trips */}
        <div ref={tripsRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#222' }}>Your Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map(trip => (
              <div key={trip.name} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-[#eee] hover:bg-[#fafafa] transition-colors duration-200">
                <span className="text-lg font-bold" style={{ color: '#222' }}>{trip.name}</span>
                <span className="text-xs" style={{ color: '#888' }}>{trip.date}</span>
                <span className={`text-xs font-semibold rounded px-2 py-1 ${trip.status === "Upcoming" ? "bg-[#222] text-[#fff]" : "bg-[#eee] text-[#222]"}`}>{trip.status}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Notifications */}
        <div ref={notificationsRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#222' }}>Notifications</h2>
          <div className="flex flex-col gap-2">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow border border-[#eee] hover:bg-[#fafafa] transition-colors duration-200">
                <span className="text-xl" style={{ color: '#222' }}>{n.icon}</span>
                <span className="text-sm font-medium" style={{ color: '#444' }}>{n.message}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Rewards */}
        <div ref={rewardsRef} className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#222' }}>Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map(r => (
              <div key={r.label} className="flex items-center gap-3 bg-white rounded-xl p-6 shadow border border-[#eee] hover:scale-105 transition-transform duration-200">
                <span className="text-2xl" style={{ color: '#222' }}>{r.icon}</span>
                <div>
                  <span className="block text-xl font-bold" style={{ color: '#222' }}>{r.value}</span>
                  <span className="block text-xs font-bold uppercase tracking-wider" style={{ color: '#888' }}>{r.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
