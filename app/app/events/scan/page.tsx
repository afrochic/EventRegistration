// app/app/scanner/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function ScannerPage() {
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleScan(data: string | null) {
    if (!data) return;

    setResult(data);
    setStatus("Checking...");

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data }),
      });

      const json = await res.json();
      if (res.ok) {
        setStatus(`✅ ${json.message} — ${json.user?.name}`);
      } else {
        setStatus(`❌ ${json.error}`);
      }
    } catch (err) {
      setStatus("⚠️ Error contacting server");
    }
  }

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Event Check-in Scanner</h1>
      <div className="w-80 h-80 border rounded-lg overflow-hidden">
        <QrReader
          delay={300}
          onError={(err) => console.error(err)}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {status && (
        <div className="mt-4 p-2 bg-white shadow rounded text-center">{status}</div>
      )}
    </main>
  );
}


// "use client";
// import dynamic from "next/dynamic";
// import { useState } from "react";
// import {useSocket} from "@/hooks/useSocket";

// // Dynamically import the QR reader to prevent server-side rendering issues.
// const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

// export default function EventScan({ params }: { params: { id: string } }) {
//   const eventId = params.id;
//   useSocket(eventId);
//   const [result, setResult] = useState<string>("");

//   async function processToken(raw: string) {
//     try {
//       const { token } = JSON.parse(raw);
//       const res = await fetch(`/api/checkin/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });
//       const data = await res.json();
//       if (data.ok) {
//         setResult(`✅ Checked in: ${data.checkin?.id}`);
//       } else {
//         setResult(`❌ ${data.error || "Invalid token"}`);
//       }
//     } catch {
//       setResult("❌ Invalid QR payload");
//     }
//   }

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-semibold">Scan Attendee QR</h1>
//       <div className="rounded-xl overflow-hidden border max-w-sm">
//         <QrReader
//           delay={300}
//           onError={(e: any) => setResult(`Camera error: ${String(e)}`)}
//           onScan={(value: string | null) => {
//             if (value) processToken(value);
//           }}
//           style={{ width: "100%" }}
//         />
//       </div>
//       <div>{result}</div>
//     </div>
//   );
// }
