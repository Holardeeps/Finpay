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

const tickets = [
  { 
    id: "#TRX-88219", 
    subject: "Transaction failed but account debited", 
    category: "Transactions",
    date: "Oct 24, 2024",
    status: "Open",
    priority: "High" 
  },
  { 
    id: "#ACC-12044", 
    subject: "Change of address request", 
    category: "Account Management",
    date: "Oct 20, 2024",
    status: "Closed",
    priority: "Low" 
  },
  { 
    id: "#CRD-99123", 
    subject: "Request for new physical card", 
    category: "Cards",
    date: "Oct 15, 2024",
    status: "In Progress",
    priority: "Medium" 
  },
];

export default function Tickets() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState("All");

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
           <div className="max-w-5xl mx-auto">
             <div className="flex justify-between items-end mb-8 relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 bg-blue-500 blur-3xl rounded-full opacity-10 -z-10"></div>
                <div>
                   <h2 className="text-4xl font-extrabold text-slate-900">Support Tickets</h2>
                   <p className="text-slate-500 mt-2">Track the status of your support requests.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                   New Ticket
                </button>
             </div>

             {/* Filters */}
             <div className="flex gap-2 mb-8 border-b border-slate-100 pb-1">
                {['All', 'Open', 'In Progress', 'Closed'].map((tab) => (
                   <button 
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-6 py-2 rounded-t-lg font-bold text-sm transition-all relative ${
                         filter === tab 
                         ? 'text-blue-600 bg-blue-50' 
                         : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                   >
                      {tab}
                      {filter === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
                   </button>
                ))}
             </div>

             <div className="space-y-4">
                {tickets.map((ticket) => (
                   <div key={ticket.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 ${
                            ticket.status === 'Open' ? 'bg-green-100 text-green-600' : 
                            ticket.status === 'In Progress' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                         }`}>
                            {ticket.status === 'Open' && 'O'}
                            {ticket.status === 'In Progress' && 'P'}
                            {ticket.status === 'Closed' && 'C'}
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{ticket.subject}</h3>
                               <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{ticket.id}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                               <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                                  {ticket.category}
                               </span>
                               <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                  {ticket.date}
                               </span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                             <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                                ticket.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                                ticket.priority === 'Medium' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                             }`}>
                                {ticket.priority} Priority
                             </div>
                         </div>
                         <div className={`px-4 py-2 rounded-lg text-sm font-bold w-28 text-center ${
                             ticket.status === 'Open' ? 'bg-green-50 text-green-700' : 
                             ticket.status === 'In Progress' ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-600'
                         }`}>
                             {ticket.status}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
