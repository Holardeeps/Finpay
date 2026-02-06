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

export default function Cards() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("physical");

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

        {/* Main content */}
        <div className="flex-1 ml-0 md:ml-64 pt-24 px-4 md:px-8 py-12 bg-slate-50 min-h-screen">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">My Cards</h2>
                <p className="text-slate-600 mt-1">Manage your physical and virtual cards</p>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Card
              </button>
            </div>

            {/* Cards Display Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Card 1 - Premium Black */}
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black p-8 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 opacity-80"></div>
                      <div className="w-8 h-8 rounded-full bg-red-500/80 -ml-4 mix-blend-screen"></div>
                    </div>
                    <span className="text-white/80 font-mono tracking-widest text-lg">FinPay Premium</span>
                  </div>

                  <div className="relative z-10">
                    <p className="text-slate-400 text-sm mb-2 font-medium tracking-wider">CARD NUMBER</p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl md:text-3xl text-white font-mono tracking-widest">
                        **** **** **** 4289
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <p className="text-slate-400 text-xs mb-1 font-bold">CARD HOLDER</p>
                      <p className="text-white font-medium tracking-wide uppercase">{session.user?.name || "USER NAME"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs mb-1 font-bold">EXPIRES</p>
                      <p className="text-white font-medium tracking-wide">12/28</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Blue Glass */}
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-8 flex flex-col justify-between">
                  {/* Glass effect overlays */}
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>

                  <div className="relative z-10 flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fillOpacity="0.5"/>
                         <path d="M14 2v6h6" fillOpacity="0.7"/>
                      </svg>
                    </div>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/10">Virtual</span>
                  </div>

                  <div className="relative z-10">
                    <p className="text-blue-100 text-sm mb-2 font-semibold">BALANCE</p>
                    <p className="text-3xl text-white font-bold tracking-tight">₦450,200.00</p>
                  </div>

                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <p className="text-blue-100 text-xs mb-1 font-bold">CARD NUMBER</p>
                      <p className="text-white font-mono tracking-widest text-sm">•••• •••• •••• 8832</p>
                    </div>
                    <div className="w-12 h-8">
                       {/* Visa Logo placeholder */}
                       <svg className="w-full h-full text-white" viewBox="0 0 36 12" fill="currentColor">
                         <path d="M13.6 0L10.3 11.8H7L9.6 2.3C9.8 1.4 9.6 1.1 8.7 1.1H4C2.6 1.1 1.6 1.9 1.6 3.1C1.6 5.8 5.7 6.1 5.7 9C5.7 9.9 4.8 10.3 3.9 10.3C3 10.3 1.2 10.1 0.4 9.6L0 11.6C0.8 11.9 2.1 12 3.6 12C6.9 12 9.1 10.4 9.1 8C9.1 5 5 4.8 5 2.8C5 2 5.8 1.7 6.6 1.7H9.2C10.8 1.7 11.1 2.3 11.3 3L13 11.8H16.6L13.6 0Z"/>
                         <path d="M20 0L17.5 11.8H20.9L23.4 0H20Z"/>
                         <path d="M30 0L27.6 11.8H30.9L35.6 0H33.1C32.3 0 31.6 0.2 31.4 1.1L30 0Z"/>
                       </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Card Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Freeze Card", icon: "lock", color: "red", desc: "Temporarily disable" },
                  { title: "Card Limits", icon: "chart", color: "blue", desc: "Set spending limits" },
                  { title: "Reset PIN", icon: "key", color: "purple", desc: "Change your security pin" },
                  { title: "Card Details", icon: "eye", color: "green", desc: "View full numbers" },
                ].map((action, i) => (
                  <button key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group text-left">
                    <div className={`w-12 h-12 rounded-xl bg-${action.color}-50 text-${action.color}-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                       {/* Simplified icons based on the action */}
                       {action.icon === 'lock' && (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                       )}
                       {action.icon === 'chart' && (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                       )}
                       {action.icon === 'key' && (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                       )}
                       {action.icon === 'eye' && (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       )}
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">{action.title}</h4>
                    <p className="text-xs text-slate-500">{action.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-slate-800">Recent Card Transactions</h3>
                 <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">View All</button>
               </div>
               <div className="p-4">
                 {[
                   { name: "Netflix Subscription", date: "Today, 10:23 AM", amount: "-₦4,500.00", icon: "N", color: "red" },
                   { name: "Uber Ride", date: "Yesterday, 8:45 PM", amount: "-₦2,300.00", icon: "U", color: "black" },
                   { name: "Apple Store", date: "Oct 24, 2024", amount: "-₦350,000.00", icon: "A", color: "gray" },
                   { name: "Spotify Premium", date: "Oct 22, 2024", amount: "-₦900.00", icon: "S", color: "green" },
                 ].map((tx, i) => (
                   <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
                     <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600`}>
                         {tx.icon}
                       </div>
                       <div>
                         <p className="font-semibold text-slate-900">{tx.name}</p>
                         <p className="text-xs text-slate-500">{tx.date}</p>
                       </div>
                     </div>
                     <p className="font-bold text-slate-900">{tx.amount}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
