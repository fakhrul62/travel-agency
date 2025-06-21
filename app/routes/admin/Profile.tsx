import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FaUserShield, FaUsersCog, FaHistory, FaCheckCircle, FaUserEdit } from "react-icons/fa";
import gsap from "gsap";
import useAuth from "src/hook/useAuth";
import useUserProfile from "src/hook/useUserProfile";
import "../../signup.css";

const AdminProfile: React.FC = () => {
  const { user } = useAuth();
  const { userProfile, isProfileLoading, error } = useUserProfile();

  // Animation refs
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      );
    }
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );
    }
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, delay: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, []);

  // Example admin stats (replace with real data if available)
  const adminStats = [
    { label: "Users Managed", value: 128, icon: <FaUsersCog className="text-blue-600" /> },
    { label: "Recent Logins", value: 5, icon: <FaHistory className="text-blue-600" /> },
    { label: "Active Sessions", value: 2, icon: <FaCheckCircle className="text-green-600" /> },
  ];

  // Example admin badges
  const adminBadges = [
    { label: "Super Admin", icon: <FaUserShield className="text-blue-400" /> }
  ];

  // Example admin notifications
  const adminNotifications = [
    { message: "System update scheduled for tomorrow.", icon: <FaHistory className="text-blue-400" /> },
    { message: "3 new users registered today.", icon: <FaUsersCog className="text-green-500" /> },
    { message: "Backup completed successfully.", icon: <FaCheckCircle className="text-green-400" /> },
  ];

  // Example admin quick links
  const quickLinks = [
    { label: "Manage Users", href: "/admin/users", icon: <FaUsersCog className="text-blue-600" /> },
    { label: "System Logs", href: "/admin/logs", icon: <FaHistory className="text-yellow-600" /> },
    { label: "Settings", href: "/admin/settings", icon: <FaUserEdit className="text-blue-400" /> },
  ];

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <img src="/assets/icons/loader.svg" alt="Loading" className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Failed to load profile.</div>;
  }

  if (!userProfile) {
    return <div className="text-center mt-10">No profile data found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Admin Profile | ToureChol</title>
        <meta name="description" content="View and manage admin profile on ToureChol." />
      </Helmet>
      <div className="w-full h-full">
        <main ref={mainRef} className="max-w-4xl mx-auto mt-6 md:mt-12 bg-white rounded-3xl shadow-2xl flex flex-col items-center gap-0 overflow-hidden border border-[#d1d5db] w-full px-2 sm:px-4 md:px-0">
          {/* Sidebar */}
          <section ref={sidebarRef} className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-500 text-white p-12 md:w-1/3 w-full h-full gap-6 relative">
            <div className="absolute top-6 right-8 flex gap-2">
              {adminBadges.map(badge => (
                <span key={badge.label} className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-xs font-bold border border-white/30 shadow hover:scale-105 transition-transform duration-200">
                  {badge.icon} {badge.label}
                </span>
              ))}
            </div>
            <FaUserShield className="w-14 h-14 mb-2 text-white/80 drop-shadow" />
            <img
              src={userProfile.photoURL || "/assets/images/david.webp"}
              alt={userProfile.name || userProfile.email}
              className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover mb-4 ring-4 ring-blue-300"
            />
            <h1 className="text-3xl font-extrabold mb-1 flex items-center gap-2 drop-shadow">{userProfile.name} <span className="ml-2 px-3 py-1 bg-green-500/80 rounded text-sm font-bold shadow">Admin</span></h1>
            <p className="text-base opacity-90 font-medium">{userProfile.email}</p>
            <span className="mt-2 px-4 py-1 bg-white/20 rounded-full text-sm font-semibold border border-white/30 flex items-center gap-2"><FaCheckCircle className="text-green-300" /> Active</span>
            <div className="mt-8 w-full flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Quick Links</span>
              {quickLinks.map(link => (
                <a key={link.label} href={link.href} className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600/80 hover:bg-blue-800 text-white text-sm font-semibold shadow transition-colors duration-200">
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
          </section>
          {/* Main Content */}
          <section ref={mainRef} className="flex-1 w-full p-12 flex flex-col gap-8 bg-white/90">
            <h2 className="text-3xl text-zinc-800 mb-4 flex items-center gap-2 drop-shadow font-league">Profile Details <FaUserEdit className="text-blue-400" /></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col border border-blue-100">
                <span className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">Role</span>
                <span className="text-lg text-gray-800 break-all font-semibold">{userProfile.role}</span>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col border border-blue-100">
                <span className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">Account Created</span>
                <span className="text-lg text-gray-800 break-all font-semibold">{(userProfile as any).createdAt ? new Date((userProfile as any).createdAt).toLocaleString() : "N/A"}</span>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col border border-blue-100">
                <span className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">Last Login</span>
                <span className="text-lg text-gray-800 break-all font-semibold">{(userProfile as any).lastLogin ? new Date((userProfile as any).lastLogin).toLocaleString() : "N/A"}</span>
              </div>
              {Object.entries(userProfile).map(([key, value]) => {
                if (["_id", "name", "email", "photoURL", "role", "createdAt", "lastLogin"].includes(key)) return null;
                return (
                  <div key={key} className="bg-blue-50 rounded-xl p-6 shadow flex flex-col border border-blue-100 hover:bg-blue-100/60 transition-colors duration-200">
                    <span className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <span className="text-lg text-gray-800 break-all font-semibold">{String(value)}</span>
                  </div>
                );
              })}
            </div>
            {/* Admin Stats */}
            <div ref={statsRef} className="w-full px-3 md:px-10 pb-6 md:pb-8">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 tracking-wide">Admin Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {adminStats.map(stat => (
                  <div key={stat.label} className="flex flex-col items-center gap-2 bg-gradient-to-br from-blue-100 to-white rounded-xl p-6 shadow hover:scale-105 transition-transform duration-200">
                    <div className="text-3xl">{stat.icon}</div>
                    <span className="block text-2xl font-extrabold text-blue-800 drop-shadow">{stat.value}</span>
                    <span className="block text-xs text-blue-600 font-bold uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Admin Notifications */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 tracking-wide">Notifications</h3>
              <div className="flex flex-col gap-2">
                {adminNotifications.map((n, i) => (
                  <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 shadow hover:bg-blue-100/60 transition-colors duration-200">
                    <span className="text-xl">{n.icon}</span>
                    <span className="text-sm text-blue-700 font-medium">{n.message}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Admin Actions */}
            <div className="w-full flex flex-col md:flex-row gap-4 justify-center mt-10 bg-gradient-to-t from-blue-50 via-white to-blue-100 border-t border-blue-100 pt-8">
              <button className="flex-1 flex justify-center items-center px-4 py-3 rounded-xl bg-blue-700 hover:bg-blue-900 text-white text-base font-bold gap-2 shadow transition-colors duration-200">
                <FaUserEdit /> Edit Profile
              </button>
              <button className="flex-1 flex justify-center items-center px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-700 text-white text-base font-bold gap-2 shadow transition-colors duration-200">
                <FaUsersCog /> Manage Users
              </button>
              <button className="flex-1 flex justify-center items-center px-4 py-3 rounded-xl bg-blue-400 hover:bg-blue-600 text-white text-base font-bold gap-2 shadow transition-colors duration-200">
                <FaHistory /> View Logs
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminProfile;
