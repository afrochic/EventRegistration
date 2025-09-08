// app/staff/scanner/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function StaffScannerPage() {
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const scannerId = "qr-reader";
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const scanner = new Html5QrcodeScanner(scannerId, config, false);

    const onScanSuccess = async (decodedText: string) => {
      await scanner.clear().catch(console.error);
      handleScan(decodedText);
    };

    scanner.render(onScanSuccess, () => {});
    return () => { scanner.clear().catch(() => {}); };
  }, []);

  async function handleScan(data: string) {
    try {
      setResult(data);
      setStatus("Checking in…");
      const parsed = JSON.parse(data); // your QR contains {"token": "..."}
      const token = parsed.token;

      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const json = await res.json();

      if (res.ok) setStatus(`✅ ${json.message}`);
      else setStatus(`❌ ${json.error || "Failed"}`);
    } catch {
      setStatus("❌ Invalid QR code");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Check-In Scanner</h1>
      <div id="qr-reader" className="w-full max-w-sm" />
      {result && <p className="mt-4 text-sm break-all">Scanned: {result}</p>}
      {status && <p className={`mt-2 ${status.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{status}</p>}
    </main>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function StaffScannerPage() {
//   const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
//   const [result, setResult] = useState<string | null>(null);
//   const [status, setStatus] = useState<string>("");

//   useEffect(() => {
//     const scannerId = "qr-reader";
//     const config = { fps: 10, qrbox: { width: 250, height: 250 } };

//     const html5QrcodeScanner = new Html5QrcodeScanner(scannerId, config, false);
//     setScanner(html5QrcodeScanner);

//     const onScanSuccess = (decodedText: string) => {
//       // Stop scanner temporarily after a scan
//       html5QrcodeScanner.pause(true);
//       handleScan(decodedText);
//     };

//     const onScanError = (errorMessage: string) => {
//       // Optionally log errors
//       // console.warn("QR Scan Error:", errorMessage);
//     };

//     html5QrcodeScanner.render(onScanSuccess, onScanError);

//     return () => {
//       html5QrcodeScanner.clear().catch(console.error);
//     };
//   }, []);

//   const handleScan = async (data: string) => {
//     if (!data) return;

//     try {
//       setResult(data);
//       setStatus("Checking in...");

//       let parsed: any;
//       try {
//         parsed = JSON.parse(data);
//       } catch {
//         setStatus("❌ Invalid QR format");
//         return;
//       }

//       const token = parsed?.token;
//       if (!token) {
//         setStatus("❌ QR code missing token");
//         return;
//       }

//       const res = await fetch("/api/checkin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       const json = await res.json();
//       if (res.ok) {
//         setStatus(`✅ Success: ${json.message}`);
//       } else {
//         setStatus(`❌ Failed: ${json.error}`);
//       }
//     } catch (err) {
//       setStatus("❌ Error processing scan");
//     }
//   };

//   const resumeScanner = () => {
//     if (scanner) {
//       scanner.resume();
//       setResult(null);
//       setStatus("");
//     }
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
//       <h1 className="text-3xl font-bold mb-6">Staff Check-In Scanner</h1>

//       <div className="w-full max-w-md">
//         <div id="qr-reader" className="w-full"></div>
//       </div>

//       {result && (
//         <p className="mt-4 text-sm text-gray-300 break-all">
//           Scanned Data: {result}
//         </p>
//       )}

//       {status && (
//         <p
//           className={`mt-2 font-semibold ${
//             status.startsWith("✅") ? "text-green-400" : "text-red-400"
//           }`}
//         >
//           {status}
//         </p>
//       )}

//       {status && (
//         <button
//           onClick={resumeScanner}
//           className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
//         >
//           Scan Next
//         </button>
//       )}
//     </main>
//   );
// }
