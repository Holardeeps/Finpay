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

const activeLoans = [
  { 
    id: 1, 
    type: "Personal Loan", 
    amount: 1200000, 
    paid: 450000, 
    rate: "12%", 
    nextPayment: "Oct 25, 2024",
    status: "Active" 
  },
  { 
    id: 2, 
    type: "Car Loan", 
    amount: 5000000, 
    paid: 1200000, 
    rate: "8.5%", 
    nextPayment: "Oct 28, 2024",
    status: "Active" 
  },
];

const loanOffers = [
  {
    id: 1,
    title: "Quick Cash",
    amount: "Up to ₦500,000",
    rate: "5% monthly",
    color: "blue",
    icon: "zap"
  },
  {
    id: 2,
    title: "Business Growth",
    amount: "Up to ₦10,000,000",
    rate: "15% per annum",
    color: "purple",
    icon: "briefcase"
  },
  {
    id: 3,
    title: "Home Mortgage",
    amount: "Up to ₦50,000,000",
    rate: "11% per annum",
    color: "green",
    icon: "home"
  }
];

export default function Loans() {
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

  const creditScore = 745;
  const maxScore = 850;
  const scorePercentage = (creditScore / maxScore) * 100;

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
                   <h2 className="text-3xl font-bold text-slate-900">Loans</h2>
                   <p className="text-slate-600 mt-1">Manage your credit and apply for financing</p>
                </div>
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:-translate-y-1">
                   Check Eligibility
                </button>
             </div>

             <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Credit Score Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                   <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                   <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                   
                   <h3 className="text-lg font-medium text-slate-300 mb-6 relative z-10">Credit Score</h3>
                   <div className="relative flex items-center justify-center py-4">
                      <div className="w-40 h-40 rounded-full border-8 border-slate-700 flex items-center justify-center relative">
                         <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-400 border-r-green-400 transform -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                         <div className="text-center">
                            <span className="text-5xl font-bold block">{creditScore}</span>
                            <span className="text-xs text-green-400 font-bold uppercase tracking-wider">Excellent</span>
                         </div>
                      </div>
                   </div>
                   <div className="mt-6 flex justify-between text-sm text-slate-400">
                      <span>Low (300)</span>
                      <span>High (850)</span>
                   </div>
                   <p className="text-xs text-slate-500 mt-4 text-center">Last updated: Oct 25, 2024</p>
                </div>

                {/* Active Loans */}
                <div className="lg:col-span-2 space-y-4">
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Active Loans</h3>
                   {activeLoans.map((loan) => (
                      <div key={loan.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                               </div>
                               <div>
                                  <h4 className="text-lg font-bold text-slate-900">{loan.type}</h4>
                                  <p className="text-sm text-slate-500">Rate: {loan.rate}</p>
                               </div>
                            </div>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                               {loan.status}
                            </span>
                         </div>
                         <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                               <span className="text-slate-600">{Math.round((loan.paid / loan.amount) * 100)}% Paid</span>
                               <span className="text-slate-900">₦{loan.paid.toLocaleString()} / ₦{loan.amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                               <div 
                                 className="bg-orange-500 h-2 rounded-full" 
                                 style={{ width: `${(loan.paid / loan.amount) * 100}%` }}
                               ></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 text-right">Next Payment: <span className="text-slate-600 font-semibold">{loan.nextPayment}</span></p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Loan Offers */}
             <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6">Loan Offers for You</h3>
                <div className="grid md:grid-cols-3 gap-6">
                   {loanOffers.map((offer) => (
                      <div key={offer.id} className="group bg-white rounded-2xl p-1 shadow-sm hover:shadow-xl transition-all duration-300">
                         <div className={`h-full rounded-xl p-6 border border-slate-100 group-hover:border-${offer.color}-200 flex flex-col`}>
                            <div className={`w-14 h-14 rounded-2xl bg-${offer.color}-50 text-${offer.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                               {offer.icon === 'zap' && <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                               {offer.icon === 'briefcase' && <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                               {offer.icon === 'home' && <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-1">{offer.title}</h4>
                            <p className={`text-2xl font-bold text-${offer.color}-600 mb-2`}>{offer.amount}</p>
                            <p className="text-sm text-slate-500 mb-8">{offer.rate}</p>
                            
                            <div className="mt-auto">
                               <button className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-700 font-bold hover:bg-slate-50 transition-colors group-hover:border-slate-200 group-hover:bg-slate-900 group-hover:text-white">
                                  Apply Now
                               </button>
                            </div>
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
