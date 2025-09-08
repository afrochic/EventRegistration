// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function StaffLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (res.ok && data.user.role === "STAFF") {
//       localStorage.setItem("token", data.token);
//       router.push("/staff/dashboard"); // redirect to staff portal
//     } else {
//       setError(data.error || "Unauthorized");
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//       <form
//         onSubmit={handleLogin}
//         className="bg-gray-800 p-6 rounded shadow-lg w-96"
//       >
//         <h1 className="text-xl font-bold mb-4">Staff Login</h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 rounded text-black"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-3 p-2 rounded text-black"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p className="text-red-400 mb-2">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function StaffLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/staff/dashboard";

  const [email, setEmail] = useState("staff@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/staff/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (res.ok) {
      router.push(next); // ✅ redirect after login
    } else {
      setError(json.error || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Staff Login</h1>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded"
        >
          Login
        </button>
      </form>
    </main>
  );
}
