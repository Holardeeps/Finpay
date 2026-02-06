import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme based on preference or default to light
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <>
      <Head>
        <title>FinPay - The Future of Finance</title>
        <meta
          name="description"
          content="Experience the next generation of financial management."
        />
      </Head>
      <main className="relative min-h-screen bg-white dark:bg-[#050511] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300 selection:bg-blue-500/30">
        {/* Abstract Background Gradients */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-400/20 dark:bg-cyan-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-sky-400/10 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.03] invert dark:invert-0" />
        </div>

        {/* Navigation */}
        <nav className="relative z-50 border-b border-gray-200 dark:border-white/5 bg-white/70 dark:bg-black/20 backdrop-blur-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="font-bold text-white">F</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">FinPay</span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {session ? (
                <button
                  onClick={() => signOut()}
                  className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="px-5 py-2 text-sm font-medium bg-slate-900 dark:bg-white/10 text-white hover:bg-slate-800 dark:hover:bg-white/20 border border-transparent dark:border-white/10 rounded-full transition-all backdrop-blur-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10">
          {!session ? (
            // Landing Page View
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
              {/* Hero Section */}
              <div className="text-center max-w-4xl mx-auto mb-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8 animate-fade-in-up">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  Now available in early access
                </div>
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
                  Master Your Money <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400">
                    With Precision
                  </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Experience a financial platform designed for the modern era.
                  Real-time analytics, seamless payments, and bank-grade
                  security in one beautiful interface.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() =>
                      signIn("google", {
                        redirect: true,
                        callbackUrl: "/dashboard",
                      })
                    }
                    className="group relative px-8 py-4 bg-blue-600 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                    <span className="relative flex items-center justify-center gap-3">
                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Get Started with Google
                    </span>
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    title: "Smart Payments",
                    desc: "Send and receive money instantly with zero fees across supported networks.",
                    icon: (
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ),
                    color: "group-hover:bg-blue-500/10",
                    border: "group-hover:border-blue-500/30",
                  },
                  {
                    title: "Global Security",
                    desc: "Bank-grade encryption and biometric verification keep your assets safe.",
                    icon: (
                      <svg
                        className="w-6 h-6 text-cyan-600 dark:text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    ),
                    color: "group-hover:bg-cyan-500/10",
                    border: "group-hover:border-cyan-500/30",
                  },
                  {
                    title: "Real-time Analytics",
                    desc: "Deep insights into your spending habits with AI-powered categorization.",
                    icon: (
                      <svg
                        className="w-6 h-6 text-sky-600 dark:text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    ),
                    color: "group-hover:bg-sky-500/10",
                    border: "group-hover:border-sky-500/30",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className={`group p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300 ${feature.border}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-blue-50 dark:bg-white/5 flex items-center justify-center mb-6 transition-colors ${feature.color}`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Logged In Dashboard Placeholder
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                 <div className="mb-12">
                <div className="mb-6 flex justify-center">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-white/10 shadow-2xl"
                    />
                  )}
                </div>
                <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{session.user?.name?.split(' ')[0]}</span></h2>
                <p className="text-xl text-slate-600 dark:text-gray-400">Your finances are looking good today.</p>
              </div>

              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 p-10 max-w-md w-full">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
