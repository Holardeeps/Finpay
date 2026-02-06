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

const myAssets = [
  { 
    id: 1, 
    name: "Bitcoin", 
    symbol: "BTC", 
    amount: "0.45 BTC", 
    value: 65400000, 
    change: "+2.4%", 
    isPositive: true,
    logo: "https://logo.clearbit.com/bitcoin.org" 
  },
  { 
    id: 2, 
    name: "Tesla Inc.", 
    symbol: "TSLA", 
    amount: "12 Shares", 
    value: 4500000, 
    change: "-1.2%", 
    isPositive: false,
    logo: "https://logo.clearbit.com/tesla.com" 
  },
  { 
    id: 3, 
    name: "Apple Inc.", 
    symbol: "AAPL", 
    amount: "25 Shares", 
    value: 5800000, 
    change: "+0.8%", 
    isPositive: true,
    logo: "https://logo.clearbit.com/apple.com" 
  },
  { 
    id: 4, 
    name: "Ethereum", 
    symbol: "ETH", 
    amount: "5.2 ETH", 
    value: 12400000, 
    change: "+4.5%", 
    isPositive: true,
    logo: "https://logo.clearbit.com/ethereum.org" 
  },
];

const trendingAssets = [
  {
    id: 1,
    name: "Nvidia",
    symbol: "NVDA",
    price: 125000,
    change: "+15.4%",
    isPositive: true,
    logo: "https://logo.clearbit.com/nvidia.com"
  },
  {
    id: 2,
    name: "Netflix",
    symbol: "NFLX",
    price: 45000,
    change: "-2.1%",
    isPositive: false,
    logo: "https://logo.clearbit.com/netflix.com"
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    price: 14500,
    change: "+8.7%",
    isPositive: true,
    logo: "https://logo.clearbit.com/solana.com"
  }
];

export default function Investments() {
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
                   <h2 className="text-3xl font-bold text-slate-900">Investments</h2>
                   <p className="text-slate-600 mt-1">Track your portfolio and discover new assets</p>
                </div>
                <div className="flex gap-3">
                   <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-all">
                      Sell
                   </button>
                   <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                      Buy Asset
                   </button>
                </div>
             </div>

             {/* Portfolio Overview */}
             <div className="bg-slate-900 rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
                 <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
                 
                 <div className="relative z-10">
                    <p className="text-slate-400 font-medium mb-1">Total Portfolio Value</p>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">₦88,100,000.00</h3>
                    <div className="flex items-center gap-2">
                       <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                          +5.24%
                       </span>
                       <span className="text-slate-400 text-sm">vs last month</span>
                    </div>
                    
                    {/* Simulated Chart Line */}
                    <div className="mt-8 h-16 flex items-end gap-1">
                       {[30, 45, 35, 55, 45, 60, 50, 75, 65, 80, 70, 90, 85, 100].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-blue-500/20 to-blue-500 rounded-t-sm transition-all hover:opacity-80" style={{ height: `${h}%` }}></div>
                       ))}
                    </div>
                 </div>
             </div>

             <div className="grid lg:grid-cols-3 gap-8">
                {/* Your Assets */}
                <div className="lg:col-span-2">
                   <h3 className="text-xl font-bold text-slate-800 mb-6">Your Assets</h3>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="divide-y divide-slate-100">
                         {myAssets.map((asset) => (
                            <div key={asset.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full border border-slate-100 p-1 bg-white">
                                     <img src={asset.logo} alt={asset.name} className="w-full h-full object-contain rounded-full" />
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{asset.name}</h4>
                                     <p className="text-sm text-slate-500">{asset.amount} • {asset.symbol}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                   <p className="font-bold text-slate-900">₦{asset.value.toLocaleString()}</p>
                                   <p className={`text-xs font-bold ${asset.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                                      {asset.change}
                                   </p>
                                </div>
                            </div>
                         ))}
                      </div>
                      <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
                         <button className="text-blue-600 font-semibold text-sm hover:underline">View All Holdings</button>
                      </div>
                   </div>
                </div>

                {/* Trending & Watchlist */}
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-6">Trending</h3>
                   <div className="grid gap-4">
                      {trendingAssets.map((asset) => (
                         <div key={asset.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="w-10 h-10 rounded-full border border-slate-100 p-1 bg-white">
                                   <img src={asset.logo} alt={asset.name} className="w-full h-full object-contain rounded-full" />
                                </div>
                                <div className={`px-2 py-1 rounded-lg text-xs font-bold ${asset.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                   {asset.change}
                                </div>
                            </div>
                            <h4 className="font-bold text-slate-900">{asset.symbol}</h4>
                            <div className="flex justify-between items-end mt-1">
                               <p className="text-sm text-slate-500">{asset.name}</p>
                               <p className="font-bold text-slate-900">₦{asset.price.toLocaleString()}</p>
                            </div>
                         </div>
                      ))}
                      
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white mt-4 relative overflow-hidden">
                         <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2">Investment Academy</h4>
                            <p className="text-blue-100 text-sm mb-4">Learn the basics of crypto and stock market investing.</p>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">Start Learning</button>
                         </div>
                         <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
