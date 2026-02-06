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

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Dashboard");

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
        <aside className="w-64 bg-slate-50 border-r border-gray-200 min-h-screen pt-24 fixed left-0 top-0">
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
          {/* Welcome greeting */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back! 👋
            </h2>
            <p className="text-slate-600 mt-2">{session.user?.email}</p>
          </div>

          {/* Total Balance Card */}
          <div className="mb-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border border-blue-200">
            <div className="mb-2">
              <p className="text-xs font-medium text-slate-700 mb-2">
                Total Balance
              </p>
              <p className="text-4xl font-bold text-blue-900">
                ₦100,000,000.00
              </p>
              <p className="text-xs text-slate-600 mt-2">Across 2 wallets</p>
            </div>

            <div className="border-t border-blue-300 my-6"></div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-medium text-slate-700 mb-2">
                  Available Balance
                </p>
                <p className="text-lg font-bold text-blue-900">₦100,000,000</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700 mb-2">
                  On Hold
                </p>
                <p className="text-lg font-bold text-blue-900">₦0.00</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700 mb-2">
                  Active Wallets
                </p>
                <p className="text-lg font-bold text-blue-900">2</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-slate-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Send Money */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Send Money
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  Transfer to contacts
                </p>
              </button>

              {/* Add Money */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-green-500"
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
                </div>
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Add Money
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  Fund your account
                </p>
              </button>

              {/* Pay Bills */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Pay Bills
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  Electricity, water, etc
                </p>
              </button>

              {/* Invest */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7H7v10h6V7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 7v10"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Invest
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  Grow your wealth
                </p>
              </button>

              {/* Transactions */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Transactions
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  ₦125,500
                </p>
              </button>

              {/* Active Loans */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-indigo-500"
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
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Active Loans
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  ₦2,500,000
                </p>
              </button>

              {/* Investments */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7H7v10h6V7z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Investments
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  ₦850,000
                </p>
              </button>

              {/* Expected Returns */}
              <button className="bg-white rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-8 h-8 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Expected Returns
                </p>
                <p className="text-xs text-slate-600 text-center mt-1">
                  +12.5%
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
