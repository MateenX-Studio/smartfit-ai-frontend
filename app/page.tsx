// "use client";

// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      
//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
//         <div className="text-lg font-semibold">SmartFit AI</div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => router.push("/login")}
//             className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
//           >
//             Log in
//           </button>
//           <button
//             onClick={() => router.push("/signup")}
//             className="px-4 py-2 text-sm bg-white text-gray-950 rounded-lg hover:bg-gray-200 transition"
//           >
//             Sign up
//           </button>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="text-center py-16 px-6 border-b border-gray-800">
//         <h1 className="text-3xl md:text-4xl font-semibold mb-3">
//           Know if your CV fits the job
//         </h1>
//         <p className="text-gray-400 max-w-md mx-auto">
//           Upload your CV and a job description. Get a match score, missing skills, and suggestions.
//         </p>
//       </section>

//       {/* Upload area */}
//       <section className="px-6 py-10 border-b border-gray-800 max-w-xl w-full mx-auto">
//         <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center mb-4 hover:border-gray-500 transition cursor-pointer">
//           <p className="text-gray-400 text-sm">Drop your CV here (PDF, DOCX, PPTX)</p>
//         </div>
//         <textarea
//           placeholder="Paste job description..."
//           className="w-full h-24 bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm mb-4 focus:outline-none focus:border-gray-500"
//         />
//         <button
//           onClick={() => router.push("/login")}
//           className="w-full bg-white text-gray-950 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
//         >
//           Analyze my CV
//         </button>
//       </section>

//       {/* Features */}
//       <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 flex-1">
//         <div className="bg-gray-950 p-6 text-center">
//           <p className="text-sm text-gray-400">Match score</p>
//         </div>
//         <div className="bg-gray-950 p-6 text-center">
//           <p className="text-sm text-gray-400">Missing skills</p>
//         </div>
//         <div className="bg-gray-950 p-6 text-center">
//           <p className="text-sm text-gray-400">Role suggestions</p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-800">
//         Built by MateenX-Studio
//       </footer>

//     </div>
//   );
// }
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="text-lg font-semibold">SmartFit AI</div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
          >
            Log in
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 text-sm bg-white text-gray-950 rounded-lg hover:bg-gray-200 transition"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6 border-b border-gray-800">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3">
          Know if your CV fits the job
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Upload your CV and a job description. Our AI gives you a match score, points out missing skills, and suggests roles you'd be a good fit for.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-white text-gray-950 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Get started
        </button>
      </section>

      {/* How it works */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 flex-1">
        <div className="bg-gray-950 p-8 text-center">
          <p className="text-sm font-medium mb-2">1. Upload your CV</p>
          <p className="text-xs text-gray-400">PDF, DOCX, or PPTX supported</p>
        </div>
        <div className="bg-gray-950 p-8 text-center">
          <p className="text-sm font-medium mb-2">2. Add the job description</p>
          <p className="text-xs text-gray-400">Paste the role you're applying for</p>
        </div>
        <div className="bg-gray-950 p-8 text-center">
          <p className="text-sm font-medium mb-2">3. Get instant feedback</p>
          <p className="text-xs text-gray-400">Match score, missing skills, and suggestions</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-800">
        Built by MateenX-Studio
      </footer>

    </div>
  );
}