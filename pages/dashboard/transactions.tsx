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

const mockTransactions = [
  { id: 1, name: "Netflix Subscription", category: "Entertainment", date: "2024-10-27T10:23:00", status: "Completed", amount: -4500.00, logo: "https://logo.clearbit.com/netflix.com", color: "red" },
  { id: 2, name: "Uber Ride", category: "Transport", date: "2024-10-26T20:45:00", status: "Completed", amount: -2300.00, logo: "https://logo.clearbit.com/uber.com", color: "black" },
  { id: 3, name: "Salary Deposit", category: "Income", date: "2024-10-25T09:00:00", status: "Completed", amount: 750000.00, logo: "https://logo.clearbit.com/chase.com", color: "green" },
  { id: 4, name: "Apple Store", category: "Shopping", date: "2024-10-24T14:30:00", status: "Completed", amount: -350000.00, logo: "https://logo.clearbit.com/apple.com", color: "gray" },
  { id: 5, name: "Spotify Premium", category: "Entertainment", date: "2024-10-22T11:00:00", status: "Processing", amount: -900.00, logo: "https://logo.clearbit.com/spotify.com", color: "green" },
  { id: 6, name: "Electric Bill", category: "Utilities", date: "2024-10-20T16:15:00", status: "Completed", amount: -15000.00, logo: "https://logo.clearbit.com/coned.com", color: "yellow" },
  { id: 7, name: "Freelance Project", category: "Income", date: "2024-10-18T13:45:00", status: "Completed", amount: 120000.00, logo: "https://logo.clearbit.com/upwork.com", color: "blue" },
  { id: 8, name: "Grocery Store", category: "Food", date: "2024-10-17T18:20:00", status: "Approve", amount: -45600.00, logo: "https://logo.clearbit.com/walmart.com", color: "orange" },
];

export default function Transactions() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

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
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                   <h2 className="text-3xl font-bold text-slate-900">Transactions</h2>
                   <p className="text-slate-600 mt-1">Track and manage your financial activity</p>
                </div>
                <div className="flex gap-3">
                   <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors shadow-sm">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Export CSV
                   </button>
                </div>
             </div>

             {/* Filters and Search */}
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </div>
                   <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                   />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                   {['All', 'Income', 'Expense', 'Pending'].map((f) => (
                      <button
                         key={f}
                         onClick={() => setFilter(f)}
                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            filter === f
                               ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                               : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                         }`}
                      >
                         {f}
                      </button>
                   ))}
                </div>
             </div>

             {/* Transactions Table */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            <th className="px-6 py-4">Transaction</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Amount</th>
                            <th className="px-6 py-4"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {mockTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                                         {/* Using img tag to avoid domain config issues with next/image for external URLs */}
                                         <img 
                                           src={tx.logo} 
                                           alt={tx.name}
                                           className="w-full h-full object-cover"
                                           onError={(e) => {
                                              // Fallback to initial if image fails
                                              (e.target as HTMLImageElement).style.display = 'none';
                                              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                           }}
                                         />
                                         <div className="hidden w-full h-full flex items-center justify-center font-bold text-slate-500 bg-slate-100">
                                            {tx.name[0]}
                                         </div>
                                     </div>
                                     <div>
                                        <p className="font-semibold text-slate-900">{tx.name}</p>
                                        <p className="text-xs text-slate-500 md:hidden">{tx.date}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-4 text-slate-600 font-medium">{tx.category}</td>
                               <td className="px-6 py-4 text-slate-500 text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                               <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                     tx.status === "Completed"
                                        ? "bg-green-100 text-green-700 border-green-200"
                                        : tx.status === "Processing"
                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                        : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}>
                                     <span className={`w-1.5 h-1.5 rounded-full ${
                                        tx.status === "Completed" ? "bg-green-500" : 
                                        tx.status === "Processing" ? "bg-yellow-500 animate-pulse" : 
                                        "bg-slate-500"
                                     }`}></span>
                                     {tx.status}
                                  </span>
                               </td>
                               <td className={`px-6 py-4 text-right font-bold ${
                                  tx.amount > 0 ? "text-green-600" : "text-slate-900"
                               }`}>
                                  {tx.amount > 0 ? "+" : ""}
                                  ₦{Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white">
                   <p className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-900">1-8</span> of <span className="font-semibold text-slate-900">45</span> transactions</p>
                   <div className="flex gap-2">
                      <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-600 text-sm disabled:opacity-50" disabled>Previous</button>
                      <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-600 text-sm">Next</button>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
