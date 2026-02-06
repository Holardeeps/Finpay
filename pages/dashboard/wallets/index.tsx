import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../../../components/Icons";

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

interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  lastTransaction: string;
}

export default function Wallets() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Wallets");

  const wallets: Wallet[] = [
    {
      id: "1",
      name: "Primary Wallet",
      balance: 50000000,
      currency: "₦",
      lastTransaction: "2 hours ago",
    },
    {
      id: "2",
      name: "Savings Wallet",
      balance: 50000000,
      currency: "₦",
      lastTransaction: "5 days ago",
    },
  ];

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm z-40">
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
        <aside className="w-64 bg-slate-50 border-r border-slate-200/50 min-h-screen pt-24 fixed left-0 top-0">
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
        <div className="flex-1 ml-64 pt-24 px-8 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900">
                  My Wallets
                </h2>
                <p className="text-slate-600 mt-2">
                  Manage and monitor all your wallets in one place
                </p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
                <svg
                  className="w-5 h-5 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Wallet
              </button>
            </div>
          </div>

          {/* Wallets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {wallets.map((wallet, index) => (
              <div
                key={wallet.id}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative p-8">
                  {/* Header with icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1 uppercase tracking-wider">
                        {wallet.name}
                      </p>
                      <p className="text-5xl font-bold text-slate-900 tracking-tight">
                        {wallet.currency}
                        {(wallet.balance / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-blue-100 transition">
                      <svg
                        className="w-7 h-7 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 my-6"></div>

                  {/* Footer with transaction info and button */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                        Last Transaction
                      </p>
                      <p className="text-sm text-slate-700 font-medium">
                        {wallet.lastTransaction}
                      </p>
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-md hover:shadow-lg">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <p className="text-slate-600 text-sm font-medium mb-2 uppercase tracking-wider">
                Total Balance
              </p>
              <p className="text-3xl font-bold text-slate-900">₦100,000,000</p>
              <p className="text-xs text-slate-500 mt-2">
                Across {wallets.length} wallets
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <p className="text-slate-600 text-sm font-medium mb-2 uppercase tracking-wider">
                Active Wallets
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {wallets.length}
              </p>
              <p className="text-xs text-slate-500 mt-2">All wallets active</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <p className="text-slate-600 text-sm font-medium mb-2 uppercase tracking-wider">
                This Month
              </p>
              <p className="text-3xl font-bold text-slate-900">₦125,500</p>
              <p className="text-xs text-slate-500 mt-2">Total transactions</p>
            </div>
          </div>

          {/* Wallet Details Table */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-8 border-b border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900">
                Wallet Details
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Complete overview of all your wallets
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-4 px-8 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Wallet Name
                    </th>
                    <th className="text-left py-4 px-8 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="text-left py-4 px-8 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-4 px-8 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="text-left py-4 px-8 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((wallet, idx) => (
                    <tr
                      key={wallet.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition group"
                    >
                      <td className="py-4 px-8 text-sm text-slate-900 font-semibold">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                            <span className="text-lg">💰</span>
                          </div>
                          {wallet.name}
                        </div>
                      </td>
                      <td className="py-4 px-8 text-sm text-slate-900 font-bold">
                        {wallet.currency}
                        {wallet.balance.toLocaleString()}
                      </td>
                      <td className="py-4 px-8">
                        <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full inline-block">
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-8 text-sm text-slate-600">
                        {wallet.lastTransaction}
                      </td>
                      <td className="py-4 px-8">
                        <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
