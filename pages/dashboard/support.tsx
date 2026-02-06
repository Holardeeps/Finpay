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

const faqs = [
  { question: "How do I reset my transaction PIN?", answer: "Go to Settings > Security > Change PIN. You will need your password to authorize the change." },
  { question: "Why is my transaction pending?", answer: "Transactions can be pending due to network delays or bank processing times. Most clear within 24 hours." },
  { question: "How can I increase my transfer limit?", answer: "You can request a limit increase by verifying your identity with a government ID in the Settings tab." },
  { question: "Is my account insured?", answer: "Yes, all deposits are insured by the NDIC up to the regulatory limits." },
];

export default function Support() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
           <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 bg-gradient-to-r from-blue-50 to-purple-50 blur-3xl rounded-[100%] pointer-events-none -z-10"></div>
                 <h2 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">How can we help?</h2>
                 <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">Browse our knowledge base or get in touch with our expert team for fast assistance.</p>
                 <div className="max-w-2xl mx-auto relative group">
                    <input 
                       type="text" 
                       placeholder="Search for answers, topics, or keywords..." 
                       className="w-full pl-14 pr-4 py-5 rounded-2xl border-2 border-slate-100 bg-white shadow-xl shadow-blue-900/5 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-lg font-medium placeholder:text-slate-400"
                    />
                    <svg className="w-7 h-7 text-slate-400 absolute left-4 top-4 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                 </div>
             </div>

             <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all text-center group cursor-pointer relative overflow-hidden">
                   <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div className="relative z-10">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                         <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-2">Live Chat</h3>
                      <p className="text-slate-500 mb-4 h-10">Instant responses from our support team.</p>
                      <span className="inline-block text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-lg group-hover:bg-white transition-colors">Start Chat</span>
                   </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all text-center group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div className="relative z-10">
                      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                         <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-2">Email Support</h3>
                      <p className="text-slate-500 mb-4 h-10">Detailed solutions within 24 hours.</p>
                      <span className="inline-block text-purple-600 font-bold text-sm bg-purple-50 px-4 py-2 rounded-lg group-hover:bg-white transition-colors">Send Email</span>
                   </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all text-center group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <div className="relative z-10">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
                         <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-2">Phone Call</h3>
                      <p className="text-slate-500 mb-4 h-10">Speak directly with an expert agent.</p>
                      <span className="inline-block text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-lg group-hover:bg-white transition-colors">Call Now</span>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </span>
                   Frequently Asked Questions
                </h3>
                <div className="divide-y divide-slate-100">
                   {faqs.map((faq, index) => (
                      <div key={index} className="py-5 first:pt-0 last:pb-0">
                         <button 
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            className="w-full flex justify-between items-center text-left py-2 font-bold text-lg text-slate-800 hover:text-blue-600 transition-colors group"
                         >
                            {faq.question}
                            <span className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-all group-hover:bg-blue-50 ${openFaq === index ? 'bg-blue-100 text-blue-600 rotate-180' : 'text-slate-400'}`}>
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </span>
                         </button>
                         <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                            <p className="text-slate-600 leading-relaxed pl-1 border-l-2 border-blue-500 ml-1">
                               {faq.answer}
                            </p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                   <p className="text-slate-400 mb-6 max-w-lg mx-auto">Our team is available 24/7 to assist you with any issues you might face.</p>
                   <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                      Create a Support Ticket
                   </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
