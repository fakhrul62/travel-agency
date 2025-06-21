import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  FaUser,
  FaEdit,
  FaEnvelope,
  FaCheckCircle,
  FaHistory,
  FaSuitcase,
  FaStar,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaHeart,
  FaCrown,
  FaBell,
  FaGift,
} from "react-icons/fa";
import gsap from "gsap";
import useAuth from "src/hook/useAuth";
import useUserProfile from "src/hook/useUserProfile";
import "../signup.css";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { userProfile, isProfileLoading, error } = useUserProfile();

  // Animation refs
  const avatarRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef.current) {
      gsap.fromTo(
        avatarRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }
      );
    }
    if (detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
    }
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.7, delay: 0.4, ease: "power2.out" }
      );
    }
    if (badgesRef.current) {
      gsap.fromTo(
        badgesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: "power2.out" }
      );
    }
    if (notificationsRef.current) {
      gsap.fromTo(
        notificationsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <img
          src="/assets/icons/loader.svg"
          alt="Loading"
          className="w-12 h-12 animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load profile.
      </div>
    );
  }

  if (!userProfile) {
    return <div className="text-center mt-10">No profile data found.</div>;
  }

  // Example: Profile completion (fake, replace with real logic if available)
  const profileFields = [
    "name",
    "email",
    "photoURL",
    "phone",
    "address",
    "birthday",
  ];
  const completedFields = profileFields.filter((f) => (userProfile as any)[f]);
  const completion = Math.round(
    (completedFields.length / profileFields.length) * 100
  );

  // Example user stats (replace with real data if available)
  const userStats = [
    {
      label: "Trips Taken",
      value: 12,
      icon: <FaSuitcase className="text-blue-600" />,
    },
    {
      label: "Reviews",
      value: 7,
      icon: <FaStar className="text-yellow-500" />,
    },
    {
      label: "Last Active",
      value: "2 days ago",
      icon: <FaHistory className="text-blue-400" />,
    },
  ];

  // Example user badges (replace with real data if available)
  const userBadges = [
    { label: "Explorer", icon: <FaCrown className="text-yellow-500" /> },
    { label: "Loyal", icon: <FaHeart className="text-pink-500" /> },
    { label: "Early Bird", icon: <FaGift className="text-purple-500" /> },
  ];

  // Example notifications (replace with real data if available)
  const notifications = [
    {
      message: "You have a new trip suggestion!",
      icon: <FaBell className="text-blue-400" />,
    },
    {
      message: "Your review was liked by 3 people.",
      icon: <FaStar className="text-yellow-400" />,
    },
  ];

  return (
    <>
      <main className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl shadow-2xl flex flex-col items-center gap-0 overflow-hidden border border-[#d1d5db]">
        {/* Avatar & Basic Info */}
        <Helmet>
          <title>Profile | ToureChol</title>
          <meta
            name="description"
            content="View and manage your ToureChol profile."
          />
        </Helmet>
        <div
          className="flex flex-col items-center w-full pt-12 pb-6 bg-white relative border-b border-[#e5e7eb]"
          ref={avatarRef}
        >
          <div className="absolute top-4 right-8 flex gap-2">
            <span className="bg-[#f3f4f6] text-[#444] px-3 py-1 rounded-full text-xs font-bold shadow">
              Level 5
            </span>
            <span className="bg-[#222] text-white px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1">
              <FaCrown className="inline text-white" /> VIP
            </span>
          </div>
          <img
            src={userProfile.photoURL || "/assets/images/david.webp"}
            alt={userProfile.name || userProfile.email}
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover mb-3 ring-4 ring-[#e5e7eb]"
          />
          <h1
            className="text-3xl font-extrabold mb-1 flex items-center gap-2 text-[#222]"
            style={{ fontFamily: "Inter, Arial, sans-serif" }}
          >
            {userProfile.name}
          </h1>
          <p className="text-base opacity-90 flex items-center gap-2 text-[#444] font-medium">
            <FaEnvelope className="inline mr-1" />
            {userProfile.email}
          </p>
          <span className="mt-2 px-4 py-1 bg-[#f3f4f6] rounded-full text-sm font-semibold border border-[#e5e7eb] flex items-center gap-2 text-[#444] shadow">
            <FaCheckCircle className="text-green-400" /> {userProfile.role}
          </span>
        </div>
        {/* Badges */}
        <div
          ref={badgesRef}
          className="w-full flex flex-row flex-wrap justify-center gap-3 py-3 bg-[#fafbfc] border-b border-[#e5e7eb]"
        >
          {userBadges.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1 px-4 py-2 bg-white rounded-full text-xs font-bold border border-[#e5e7eb] shadow hover:scale-105 transition-transform duration-200 text-[#444]"
            >
              {badge.icon} {badge.label}
            </span>
          ))}
        </div>
        {/* Profile Completion & Details */}
        <div className="w-full px-10 py-8 flex flex-col gap-8 bg-white" ref={detailsRef}>
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[#444] font-semibold">
                Profile Completion
              </span>
              <span className="text-xs text-[#444] font-bold">
                {completion}%
              </span>
            </div>
            <div className="w-full bg-[#f3f4f6] rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(userProfile).map(([key, value]) => {
              if (["_id", "name", "email", "photoURL", "role"].includes(key))
                return null;
              let icon = null;
              if (key === "address")
                icon = <FaMapMarkerAlt className="text-[#222] mr-1" />;
              if (key === "birthday")
                icon = <FaBirthdayCake className="text-[#222] mr-1" />;
              return (
                <div
                  key={key}
                  className="bg-[#fafbfc] rounded-xl p-5 shadow flex flex-col border border-[#e5e7eb] hover:bg-[#f3f4f6] transition-colors duration-200"
                >
                  <span className="text-xs text-[#444] font-semibold mb-1 uppercase tracking-wider flex items-center">
                    {icon}
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <span className="text-base text-[#222] break-all font-medium">
                    {String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* User Stats */}
        <div ref={statsRef} className="w-full px-10 pb-8">
          <h3 className="text-lg font-bold text-[#222] mb-3 tracking-wide">
            Your Activity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 bg-[#fafbfc] rounded-xl p-5 shadow hover:scale-105 transition-transform duration-200 border border-[#e5e7eb]"
              >
                <div className="text-3xl text-[#222]">{stat.icon}</div>
                <span className="block text-2xl font-extrabold text-[#222]">
                  {stat.value}
                </span>
                <span className="block text-xs text-[#444] font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Notifications */}
        <div ref={notificationsRef} className="w-full px-10 pb-8">
          <h3 className="text-lg font-bold text-[#222] mb-3 tracking-wide">
            Notifications
          </h3>
          <div className="flex flex-col gap-2">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#fafbfc] rounded-xl p-4 shadow hover:bg-[#f3f4f6] transition-colors duration-200 border border-[#e5e7eb]"
              >
                <span className="text-xl text-[#222]">{n.icon}</span>
                <span className="text-sm font-medium text-[#444]">
                  {n.message}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="w-full px-10 pb-10 flex flex-col md:flex-row gap-4 justify-center bg-[#fafbfc] border-t border-[#e5e7eb]">
          <button className="flex-1 flex justify-center items-center px-4 py-3 rounded-xl bg-[#222] hover:bg-[#444] text-white text-base font-bold gap-2 shadow transition-colors duration-200">
            <FaEdit /> Edit Profile
          </button>
          <button className="flex-1 flex justify-center items-center px-4 py-3 rounded-xl bg-[#444] hover:bg-[#222] text-white text-base font-bold gap-2 shadow transition-colors duration-200">
            <FaEdit /> Change Password
          </button>
        </div>
      </main>
    </>
  );
};

export default Profile;
