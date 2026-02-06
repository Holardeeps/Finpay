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

const upcomingBills = [
  { id: 1, name: "Electricity Bill", provider: "ConEd", amount: 15400.00, dueDate: "Due in 3 days", logo: "https://logo.clearbit.com/coned.com", color: "yellow", icon: "E" },
  { id: 2, name: "Home Internet", provider: "Xfinity", amount: 25000.00, dueDate: "Due in 5 days", logo: "https://logo.clearbit.com/xfinity.com", color: "purple", icon: "W" },
  { id: 3, name: "Mobile Plan", provider: "Verizon", amount: 18500.00, dueDate: "Due in 12 days", logo: "https://logo.clearbit.com/verizon.com", color: "red", icon: "M" },
  { id: 4, name: "Car Insurance", provider: "Geico", amount: 45000.00, dueDate: "Due in 15 days", logo: "https://logo.clearbit.com/geico.com", color: "blue", icon: "C" },
];

const billCategories = [
  { name: "Utilities", icon: "lightning", color: "yellow" },
  { name: "Internet", icon: "wifi", color: "purple" },
  { name: "Mobile", icon: "phone", color: "red" },
  { name: "Housing", icon: "home", color: "green" },
  { name: "Subscriptions", icon: "play", color: "pink" },
  { name: "Insurance", icon: "shield", color: "blue" },
];

const paymentHistory = [
  { id: 1, name: "Electricity Bill", provider: "ConEd", date: "Oct 20, 2024", amount: 14200.00, status: "Paid", logo: "https://logo.clearbit.com/coned.com" },
  { id: 2, name: "Netflix Premium", provider: "Netflix", date: "Oct 18, 2024", amount: 4500.00, status: "Auto-Paid", logo: "https://logo.clearbit.com/netflix.com" },
  { id: 3, name: "Water Bill", provider: "City Water", date: "Oct 15, 2024", amount: 5200.00, status: "Paid", logo: null },
  { id: 4, name: "Home Internet", provider: "Xfinity", date: "Oct 12, 2024", amount: 25000.00, status: "Paid", logo: "https://logo.clearbit.com/xfinity.com" },
];

export default function Bills() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

        {/* Main Content */}
        <div className="flex-1 ml-0 md:ml-64 pt-24 px-4 md:px-8 py-12 bg-slate-50 min-h-screen w-full">
           <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                   <h2 className="text-3xl font-bold text-slate-900">Bills & Payments</h2>
                   <p className="text-slate-600 mt-1">Manage your recurring payments and services</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                   Add New Bill
                </button>
             </div>

             {/* Due Soon Section */}
             <div className="mb-12">
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                 Due Soon
               </h3>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {upcomingBills.map((bill) => (
                   <div key={bill.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100">
                             <img 
                               src={bill.logo} 
                               alt={bill.provider} 
                               className="w-full h-full object-contain" 
                               onError={(e) => {
                                 (e.target as HTMLImageElement).style.display = 'none';
                                 (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                               }}
                             />
                             <span className="hidden text-xl font-bold text-slate-400">{bill.icon}</span>
                         </div>
                         <span className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 rounded-full border border-red-100">
                           {bill.dueDate}
                         </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{bill.name}</h4>
                      <p className="text-sm text-slate-500 mb-4">{bill.provider}</p>
                      <div className="flex items-end justify-between">
                         <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Amount</p>
                            <p className="text-xl font-bold text-slate-900">₦{bill.amount.toLocaleString()}</p>
                         </div>
                         <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Categories Grid */}
             <div className="mb-12">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {billCategories.map((cat) => (
                    <button key={cat.name} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group">
                       <div className={`w-12 h-12 rounded-full bg-${cat.color}-50 text-${cat.color}-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          {cat.icon === 'lightning' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                          {cat.icon === 'wifi' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>}
                          {cat.icon === 'phone' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                          {cat.icon === 'home' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                          {cat.icon === 'play' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                          {cat.icon === 'shield' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                       </div>
                       <span className="text-sm font-semibold text-slate-700">{cat.name}</span>
                    </button>
                  ))}
                </div>
             </div>

             {/* Payment History */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="text-lg font-bold text-slate-800">Payment History</h3>
                   <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                   {paymentHistory.map((payment) => (
                      <div key={payment.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5">
                               {payment.logo ? (
                                 <img src={payment.logo} alt={payment.provider} className="w-full h-full object-contain" />
                               ) : (
                                 <span className="font-bold text-slate-400 text-sm">{payment.name[0]}</span>
                               )}
                            </div>
                            <div>
                               <p className="font-semibold text-slate-900">{payment.name}</p>
                               <p className="text-xs text-slate-500">{payment.date} • {payment.provider}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="font-bold text-slate-900">-₦{payment.amount.toLocaleString()}</p>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                               {payment.status}
                            </span>
                         </div>
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
