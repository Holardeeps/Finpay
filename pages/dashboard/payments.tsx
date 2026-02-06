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

const beneficiaries = [
  { id: 1, name: "Sarah Connor", username: "@sarahC", avatar: "https://i.pravatar.cc/150?u=sarah" },
  { id: 2, name: "John Wick", username: "@babaYaga", avatar: "https://i.pravatar.cc/150?u=john" },
  { id: 3, name: "Bruce Wayne", username: "@batman", avatar: "https://i.pravatar.cc/150?u=bruce" },
  { id: 4, name: "Diana Prince", username: "@wonder", avatar: "https://i.pravatar.cc/150?u=diana" },
  { id: 5, name: "Clark Kent", username: "@superman", avatar: "https://i.pravatar.cc/150?u=clark" },
];

export default function Payments() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("p2p");

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
                   <h2 className="text-3xl font-bold text-slate-900">Send Money</h2>
                   <p className="text-slate-600 mt-1">Transfer funds securely to anyone, anywhere</p>
                </div>
             </div>

             <div className="grid lg:grid-cols-3 gap-8">
               {/* Left Column: Payment Form */}
               <div className="lg:col-span-2">
                 <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { id: 'p2p', label: 'Send to Friend', icon: 'user', desc: 'Instant P2P' },
                        { id: 'bank', label: 'Bank Transfer', icon: 'bank', desc: 'To any bank' },
                        { id: 'qr', label: 'Scan QR Code', icon: 'qrcode', desc: 'Scan to pay' },
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border-2 ${
                            paymentMethod === method.id 
                            ? 'bg-blue-50 border-blue-600 shadow-md transform scale-[1.02]' 
                            : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center transition-colors ${
                              paymentMethod === method.id 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                          }`}>
                              {method.id === 'p2p' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                              {method.id === 'bank' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>}
                              {method.id === 'qr' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}
                          </div>
                          <span className={`font-bold text-sm ${paymentMethod === method.id ? 'text-blue-900' : 'text-slate-700'}`}>{method.label}</span>
                          <span className="text-[10px] text-slate-400 font-medium mt-1">{method.desc}</span>
                          {paymentMethod === method.id && (
                             <div className="absolute top-3 right-3 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                             </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-6">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Recipient</label>
                          <div className="relative group">
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold group-focus-within:text-blue-500 transition-colors">@</span>
                             </div>
                             <input 
                               type="text" 
                               value={recipient}
                               onChange={(e) => setRecipient(e.target.value)}
                               placeholder="username, email, or phone"
                               className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-lg text-slate-900 placeholder:text-slate-400"
                             />
                             <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                <button className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Contacts</button>
                             </div>
                          </div>
                       </div>

                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Amount</label>
                          <div className="relative group">
                             <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold text-3xl group-focus-within:text-blue-600 transition-colors">₦</span>
                             </div>
                             <input 
                               type="text" 
                               value={amount}
                               onChange={(e) => setAmount(e.target.value)}
                               placeholder="0.00"
                               className="w-full pl-12 pr-4 py-8 bg-slate-50 border border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-extrabold text-5xl text-slate-900 placeholder:text-slate-300 tracking-tight"
                             />
                          </div>
                          <div className="flex justify-between items-center mt-3 px-1">
                             <p className="text-xs font-medium text-slate-500">Transaction Fee: <span className="text-slate-700">₦0.00</span></p>
                             <p className="text-xs font-medium text-slate-500">Balance: <span className="font-bold text-slate-800">₦450,200.00</span></p>
                          </div>
                       </div>

                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Note (Optional)</label>
                          <input 
                             type="text" 
                             placeholder="What's this for?"
                             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                       </div>

                       <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 transition-all">
                          Send Money Now
                       </button>
                    </div>
                 </div>
               </div>

               {/* Right Column: Quick Actions & Beneficiaries */}
               <div className="space-y-8">
                  {/* Beneficiaries Widget */}
                  <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">Quick Send</h3>
                        <Link href="/dashboard/settings" legacyBehavior>
                           <a className="text-xs font-bold text-blue-600 hover:underline">Manage</a>
                        </Link>
                     </div>
                     <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                           <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-100 hover:border-blue-300 transition-colors">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                           </div>
                           <span className="text-xs font-medium text-slate-500">New</span>
                        </div>
                        {beneficiaries.map((user) => (
                           <div key={user.id} onClick={() => setRecipient(user.username)} className="flex flex-col items-center gap-2 group cursor-pointer">
                              <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-cyan-400 group-hover:scale-105 transition-transform">
                                 <div className="w-full h-full rounded-full bg-white p-0.5">
                                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                 </div>
                              </div>
                              <span className="text-xs font-medium text-slate-600 w-16 text-center truncate">{user.name.split(' ')[0]}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Promo Banner */}
                  <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
                      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
                      <div className="relative z-10">
                         <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                            <span className="text-xl">🚀</span>
                         </div>
                         <h3 className="text-lg font-bold mb-2">Free Transfers?</h3>
                         <p className="text-sm text-slate-300 mb-4 leading-relaxed">Refer a friend today and get 5 free transfers to any bank account instantly.</p>
                         <button className="text-sm font-bold text-white bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                            Get Rewards
                         </button>
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
