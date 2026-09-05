"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";

export default function Dashboard() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            router.push("/login");
        }
    }, []);

    const handleAnalyze = async () => {
        if (!file || !jobDescription) {
            setError("Please upload a CV and enter a job description.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        const formData = new FormData();
        formData.append("cv_file", file);
        formData.append("job_description", jobDescription);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
            const response = await apiFetch(`${baseUrl}/analyze`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
            } else {
                setError(data.detail || "Something went wrong.");
            }
        } catch (err) {
            setError("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <div className="text-lg font-semibold">SmartFit AI</div>
                <div className="flex gap-3">
                    <button
                        onClick={() => router.push("/history")}
                        className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                    >
                        History
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                    >
                        Log out
                    </button>
                </div>
            </nav>

            <div className="max-w-xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-semibold mb-6 text-center">Analyze your CV</h1>

                <label className="block border-2 border-dashed border-gray-700 rounded-xl p-8 text-center mb-4 hover:border-gray-500 transition cursor-pointer">
                    <input
                        type="file"
                        accept=".pdf,.docx,.pptx"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className="hidden"
                    />
                    <p className="text-gray-400 text-sm">
                        {file ? file.name : "Click to upload your CV (PDF, DOCX, PPTX)"}
                    </p>
                </label>

                <textarea
                    placeholder="Paste job description..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-28 bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm mb-4 focus:outline-none focus:border-gray-500"
                />

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full bg-white text-gray-950 py-3 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
                >
                    {loading ? "Analyzing... this may take a moment" : "Analyze my CV"}
                </button>

                {error && <p className="text-sm text-red-400 mt-4 text-center">{error}</p>}

                {result && (
                    <div className="mt-8 space-y-4">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-1">Match score</p>
                            <p className="text-3xl font-semibold">{result.match_score}%</p>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-2">Missing skills</p>
                            <ul className="text-sm space-y-1">
                                {result.missing_skills?.map((skill: string, i: number) => (
                                    <li key={i} className="text-gray-300">• {skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-2">Suggestions</p>
                            <ul className="text-sm space-y-1">
                                {result.suggestions?.map((s: string, i: number) => (
                                    <li key={i} className="text-gray-300">• {s}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                            <p className="text-sm text-gray-400 mb-2">Suggested roles</p>
                            <ul className="text-sm space-y-1">
                                {result.suggested_roles?.map((r: string, i: number) => (
                                    <li key={i} className="text-gray-300">• {r}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <footer className="text-center py-4 text-xs text-gray-500 mt-8">
                Built by MateenX-Studio
            </footer>
        </div>
    );
}