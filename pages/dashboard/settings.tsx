import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../../components/Icons";

const navItems = [
  { label: "Dashboard", icon: "Dashboard", href: "/dashboard" },
  { label: "Wallets", icon: "Wallets", href: "/dashboard/wallets" },
  { label: "Cards", icon: "Cards", href: "/dashboard/cards" },
  {
    label: "Transactions",
    icon: "Transactions",
    href: "/dashboard/transactions",
  },
  { label: "Bills", icon: "Bills", href: "/dashboard/bills" },
  { label: "Payments", icon: "Payments", href: "/dashboard/payments" },
  { label: "Loans", icon: "Loans", href: "/dashboard/loans" },
  { label: "Investments", icon: "Investments", href: "/dashboard/investments" },
  { label: "Support", icon: "Support", href: "/dashboard/support" },
  { label: "My Tickets", icon: "Tickets", href: "/dashboard/tickets" },
  { label: "Settings", icon: "Settings", href: "/dashboard/settings" },
];

export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile State
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.j@example.com");
  const [bio, setBio] = useState("Frontend Developer & Fintech Enthusiast");

  // Notifications State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6 animate-fadeIn">
             {/* Hero Profile Card */}
             <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 p-8 border border-slate-100 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-blue-500/20"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                   <div className="relative">
                      <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg">
                         <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
                             <img src="https://i.pravatar.cc/300?u=alex" alt="Profile" className="w-full h-full object-cover" />
                         </div>
                      </div>
                      <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors border border-slate-100">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </button>
                   </div>
                   <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-extrabold text-slate-900">{name}</h3>
                      <p className="text-slate-500 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span>
                         Active Status
                         <span className="text-slate-300">•</span>
                         Joined Oct 2023
                      </p>
                      <div className="flex gap-3 justify-center md:justify-start">
                         <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-100">Premium Member</span>
                         <span className="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold border border-purple-100">Verified ID</span>
                      </div>
                   </div>
                   <div className="flex flex-col gap-3 min-w-[140px]">
                      <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Login Streak</p>
                         <p className="text-2xl font-black text-slate-900">12 Days</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Personal Details Form */}
             <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   Edit Details
                </h4>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">Full Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300" />
                   </div>
                   <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">Email Address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300" />
                   </div>
                   <div className="md:col-span-2 group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-500 transition-colors">Bio Description</label>
                      <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={2} className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 resize-none"></textarea>
                   </div>
                </div>
                <div className="mt-8 flex justify-end">
                   <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300">
                      Save All Changes
                   </button>
                </div>
             </div>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6 animate-fadeIn">
             {/* Security Health */}
             <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-green-500/20 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                   <div>
                      <h3 className="text-2xl font-bold mb-1">Security Status: Excellent</h3>
                      <p className="text-green-100 text-sm">Your account is well protected.</p>
                   </div>
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                {/* 2FA Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-full group hover:border-blue-200 transition-all">
                   <div>
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                      <h4 className="font-bold text-lg text-slate-900">Two-Factor Auth</h4>
                      <p className="text-sm text-slate-500 mt-2">Extra security layer using your mobile device.</p>
                   </div>
                   <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                      <button className="text-slate-400 font-bold text-sm hover:text-slate-900">Configure</button>
                   </div>
                </div>

                {/* Password Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-full group hover:border-purple-200 transition-all">
                   <div>
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                      </div>
                      <h4 className="font-bold text-lg text-slate-900">Password</h4>
                      <p className="text-sm text-slate-500 mt-2">Last changed 3 months ago.</p>
                   </div>
                   <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
                      <div className="flex gap-1">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                      </div>
                      <button className="text-blue-600 font-bold text-sm hover:underline">Update</button>
                   </div>
                </div>
             </div>

             {/* Sessions Map Visual */}
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-lg text-slate-900 mb-6">Active Sessions</h4>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 shadow-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                         </div>
                         <div>
                            <p className="font-bold text-slate-900">MacBook Pro</p>
                            <p className="text-xs text-slate-500">Lagos, Nigeria • <span className="text-green-600 font-bold">Current Session</span></p>
                         </div>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-red-50 hover:border-red-100 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 shadow-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                         </div>
                         <div>
                            <p className="font-bold text-slate-900">iPhone 14</p>
                            <p className="text-xs text-slate-500">London, UK • 2 days ago</p>
                         </div>
                      </div>
                      <button className="text-xs font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">Revoke Access</button>
                   </div>
                </div>
             </div>
          </div>
        );
      case "notifications":
        return (
          <div className="animate-fadeIn">
             <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-xl font-bold text-slate-900">Alert Center</h3>
                    <p className="text-slate-500 text-sm mt-1">Control how we communicate with you.</p>
                </div>
                <div className="divide-y divide-slate-100">
                   {[
                      { label: "Account Activity", desc: "Logins, new devices, and security alerts.", state: emailNotifs, setter: setEmailNotifs, icon: 'shield-check' },
                      { label: "Transactions", desc: "Money sent, received, and bill payments.", state: pushNotifs, setter: setPushNotifs, icon: 'currency-dollar' },
                      { label: "Marketing", desc: "Product updates, news, and exclusive offers.", state: marketingNotifs, setter: setMarketingNotifs, icon: 'sparkles' },
                   ].map((item, idx) => (
                      <div key={idx} className="p-6 md:p-8 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => item.setter(!item.state)}>
                         <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.state ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                               <p className="font-bold text-slate-900 text-lg">{item.label}</p>
                               <p className="text-sm text-slate-500 max-w-sm">{item.desc}</p>
                            </div>
                         </div>
                         <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${item.state ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-200'}`}>
                            <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${item.state ? 'translate-x-6' : 'translate-x-0'}`}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        );
      case "preferences":
        return (
          <div className="space-y-6 animate-fadeIn">
             {/* Theme Selection */}
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Visual Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                   <button className="flex flex-col items-center gap-3 group">
                      <div className="w-full aspect-video bg-white border-2 border-blue-600 rounded-xl shadow-lg relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                         <div className="absolute top-2 left-2 w-16 h-8 bg-slate-100 rounded-lg"></div>
                         <div className="absolute top-12 left-2 right-2 h-2 bg-slate-100 rounded"></div>
                         <div className="absolute right-2 bottom-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                         </div>
                      </div>
                      <span className="font-bold text-blue-900">Light</span>
                   </button>
                   <button className="flex flex-col items-center gap-3 group">
                      <div className="w-full aspect-video bg-slate-900 border-2 border-slate-100 rounded-xl shadow-sm relative overflow-hidden group-hover:border-slate-400 transition-all group-hover:scale-[1.02]">
                         <div className="absolute top-2 left-2 w-16 h-8 bg-slate-800 rounded-lg"></div>
                         <div className="absolute top-12 left-2 right-2 h-2 bg-slate-800 rounded"></div>
                      </div>
                      <span className="font-bold text-slate-500 group-hover:text-slate-900">Dark</span>
                   </button>
                   <button className="flex flex-col items-center gap-3 group">
                      <div className="w-full aspect-video bg-gradient-to-br from-white to-slate-900 border-2 border-slate-100 rounded-xl shadow-sm relative overflow-hidden group-hover:border-slate-400 transition-all group-hover:scale-[1.02]">
                         <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold opacity-50">AUTO</div>
                      </div>
                      <span className="font-bold text-slate-500 group-hover:text-slate-900">System</span>
                   </button>
                </div>
             </div>

             {/* Regional Settings */}
             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Regional</h3>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="border border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Currency</p>
                      <div className="flex items-center justify-between">
                         <span className="text-lg font-bold text-slate-900">Nigerian Naira (₦)</span>
                         <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                   </div>
                   <div className="border border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Display Language</p>
                      <div className="flex items-center justify-between">
                         <span className="text-lg font-bold text-slate-900">English (United Kingdom)</span>
                         <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Delete Account */}
             <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between items-center">
                <div>
                   <h4 className="font-bold text-slate-900">Delete Account</h4>
                   <p className="text-sm text-slate-500">Permanently remove your data and access.</p>
                </div>
                <button className="text-red-500 font-bold text-sm bg-red-50 px-6 py-3 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors">
                   Delete Account
                </button>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 shadow-sm z-40">
        <div className="max-w-full px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center transform hover:scale-110 transition">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              FinPay
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-slate-700 font-medium">
              {session.user?.name}
            </span>
             <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition border border-slate-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-50 border-r border-gray-200 min-h-screen pt-24 fixed left-0 top-0 hidden md:block">
          <nav className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} legacyBehavior>
                <a
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer ${
                    router.pathname === item.href
                      ? "bg-blue-100 text-blue-900 font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {Icons[item.icon as keyof typeof Icons]}
                  <span>{item.label}</span>
                </a>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-0 md:ml-64 pt-24 px-4 md:px-8 py-12 bg-slate-50 min-h-screen w-full">
           <div className="max-w-5xl mx-auto">
             <div className="mb-10 text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Settings & Preferences</h2>
                <p className="text-slate-500 mt-2 text-lg">Control your profile, security, and notification settings.</p>
             </div>

             <div className="flex flex-col lg:flex-row gap-8">
                {/* Modern Floating Sidebar */}
                <div className="w-full lg:w-72 flex-shrink-0">
                   <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-3 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-32">
                      <nav className="space-y-2">
                         {[
                            { id: 'profile', label: 'Identity & Profile', icon: 'user', desc: 'Avatar, Name, Bio' },
                            { id: 'security', label: 'Security & Login', icon: 'lock', desc: '2FA, Password' },
                            { id: 'notifications', label: 'Notifications', icon: 'bell', desc: 'Email, Push' },
                            { id: 'preferences', label: 'App Preferences', icon: 'adjustments', desc: 'Theme, Currency' },
                         ].map((tab) => (
                            <button
                               key={tab.id}
                               onClick={() => setActiveTab(tab.id)}
                               className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all duration-300 group ${
                                  activeTab === tab.id
                                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-[1.02]'
                                  : 'text-slate-600 hover:bg-slate-50'
                               }`}
                            >
                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === tab.id ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
                                   {tab.id === 'profile' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                   {tab.id === 'security' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                                   {tab.id === 'notifications' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
                                   {tab.id === 'preferences' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
                               </div>
                               <div>
                                   <p className={`font-bold ${activeTab === tab.id ? 'text-white' : 'text-slate-900'}`}>{tab.label}</p>
                                   <p className={`text-xs ${activeTab === tab.id ? 'text-slate-400' : 'text-slate-400'}`}>{tab.desc}</p>
                               </div>
                            </button>
                         ))}
                      </nav>
                   </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                   {renderContent()}
                </div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
