"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/providers");
      const data = await res.json();
      setProviders(data);
    })();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-6 text-white">
      <div className="bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold">Welcome back</h1>
          <p className="text-gray-400 text-sm">
            Sign in to access events, check-ins, and more.
          </p>
        </div>

        {/* Providers */}
        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider: any) => (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="flex items-center justify-center w-full gap-3 py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-colors"
              >
                {provider.id === "google" && <FaGoogle className="text-xl" />}
                {provider.id === "github" && <FaGithub className="text-xl" />}
                Continue with {provider.name}
              </button>
            ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span className="flex-1 border-t border-gray-600" />
          <span>or</span>
          <span className="flex-1 border-t border-gray-600" />
        </div>

        {/* Back to site */}
        <div className="text-center text-sm text-gray-400">
          <Link href="/" className="hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}


// "use client";

// import { getProviders, signIn } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { FaGoogle, FaGithub } from "react-icons/fa";
// import Link from "next/link";

// export default function SignInPage() {
//   const [providers, setProviders] = useState<any>(null);

//   useEffect(() => {
//     (async () => {
//       const res = await getProviders();
//       setProviders(res);
//     })();
//   }, []);

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-900 p-6 text-white">
//       <div className="bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">
//         {/* Heading */}
//         <div className="text-center space-y-2">
//           <h1 className="text-3xl font-extrabold">Welcome back</h1>
//           <p className="text-gray-400 text-sm">
//             Sign in to access events, check-ins, and more.
//           </p>
//         </div>

//         {/* Providers */}
//         <div className="space-y-4">
//           {providers &&
//             Object.values(providers).map((provider: any) => (
//               <button
//                 key={provider.id}
//                 onClick={() => signIn(provider.id, { callbackUrl: "/" })}
//                 className="flex items-center justify-center w-full gap-3 py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-colors"
//               >
//                 {provider.id === "google" && (
//                   <FaGoogle className="text-xl" />
//                 )}
//                 {provider.id === "github" && (
//                   <FaGithub className="text-xl" />
//                 )}
//                 Continue with {provider.name}
//               </button>
//             ))}
//         </div>

//         {/* Divider */}
//         <div className="flex items-center gap-2 text-gray-500 text-sm">
//           <span className="flex-1 border-t border-gray-600" />
//           <span>or</span>
//           <span className="flex-1 border-t border-gray-600" />
//         </div>

//         {/* Back to site */}
//         <div className="text-center text-sm text-gray-400">
//           <Link href="/" className="hover:underline">
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }
