// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handleLogin = async () => {
//         if (loading) return;
//         setLoading(true);
//         setMessage("");

//         try {
//             const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
//             const response = await fetch(`${baseUrl}/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem("access_token", data.access_token);
//                 localStorage.setItem("refresh_token", data.refresh_token);
//                 setMessage("Login successful. Redirecting...");
//                 router.push("/dashboard");
//             } else {
//                 setMessage(data.detail || "Invalid email or password.");
//             }
//         } catch (err) {
//             setMessage("Could not connect to the server. Is the backend running?");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
//             <div className="w-full max-w-sm">
//                 <h1 className="text-2xl font-semibold mb-6 text-center">Log in</h1>

//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm mb-3 focus:outline-none focus:border-gray-500"
//                 />

//                 <div className="relative mb-4">
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm pr-16 focus:outline-none focus:border-gray-500"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
//                     >
//                         {showPassword ? "Hide" : "Show"}
//                     </button>
//                 </div>

//                 <button
//                     onClick={handleLogin}
//                     disabled={loading}
//                     className="w-full bg-white text-gray-950 py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
//                 >
//                     {loading ? "Logging in..." : "Log in"}
//                 </button>

//                 {message && (
//                     <p className="text-sm text-gray-400 mt-4 text-center">{message}</p>
//                 )}
//                 <p className="text-sm text-gray-400 mt-4 text-center">
//                     Don't have an account?{" "}
//                     <button
//                         onClick={() => router.push("/signup")}
//                         className="text-white underline hover:text-gray-300"
//                     >
//                         Sign up
//                     </button>
//                 </p>
//             </div>

//             <footer className="text-center py-4 text-xs text-gray-500 mt-8">
//                 Built by MateenX-Studio
//             </footer>
//         </div>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                localStorage.setItem("access_token", session.access_token);
                localStorage.setItem("refresh_token", session.refresh_token);
                router.push("/dashboard");
            }
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                localStorage.setItem("access_token", session.access_token);
                localStorage.setItem("refresh_token", session.refresh_token);
                router.push("/dashboard");
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    const handleLogin = async () => {
        if (loading) return;
        setLoading(true);
        setMessage("");

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                setMessage("Login successful. Redirecting...");
                router.push("/dashboard");
            } else {
                setMessage(data.detail || "Invalid email or password.");
            }
        } catch (err) {
            setMessage("Could not connect to the server. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-semibold mb-6 text-center">Log in</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm mb-3 focus:outline-none focus:border-gray-500"
                />

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm pr-16 focus:outline-none focus:border-gray-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-white text-gray-950 py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>

                {message && (
                    <p className="text-sm text-gray-400 mt-4 text-center">{message}</p>
                )}
                <p className="text-sm text-gray-400 mt-4 text-center">
                    Don't have an account?{" "}
                    <button
                        onClick={() => router.push("/signup")}
                        className="text-white underline hover:text-gray-300"
                    >
                        Sign up
                    </button>
                </p>
            </div>

            <footer className="text-center py-4 text-xs text-gray-500 mt-8">
                Built by MateenX-Studio
            </footer>
        </div>
    );
}