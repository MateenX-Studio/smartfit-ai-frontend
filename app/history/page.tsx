"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";

export default function History() {
    const [analyses, setAnalyses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchHistory = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
                const response = await apiFetch(`${baseUrl}/history`);

                const data = await response.json();

                if (response.ok) {
                    setAnalyses(data);
                } else {
                    setError("Could not load history.");
                }
            } catch (err) {
                setError("Could not connect to the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <div className="text-lg font-semibold">SmartFit AI</div>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                >
                    Back to dashboard
                </button>
            </nav>

            <div className="max-w-2xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-semibold mb-6 text-center">Your analysis history</h1>

                {loading && <p className="text-center text-gray-400">Loading...</p>}
                {error && <p className="text-center text-red-400">{error}</p>}

                {!loading && analyses.length === 0 && !error && (
                    <p className="text-center text-gray-400">No analyses yet. Go analyze a CV first.</p>
                )}

                <div className="space-y-4">
                    {analyses.map((item) => (
                        <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-gray-400">{item.job_description}</p>
                                <p className="text-lg font-semibold">{item.match_score}%</p>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">Missing skills: {item.missing_skills}</p>
                            <p className="text-xs text-gray-500">Suggested roles: {item.suggested_roles}</p>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="text-center py-4 text-xs text-gray-500 mt-8">
                Built by MateenX-Studio
            </footer>
        </div>
    );
}