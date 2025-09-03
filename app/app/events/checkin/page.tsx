// "use client";
// import { useEffect, useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// export default function EventCheckinQR({ params }: { params: { id: string } }) {
//   const eventId = params.id;
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     (async () => {
//       // Organizer endpoint generates a check-in token
//       const res = await fetch(`/api/checkin/token?eventId=${eventId}`, {
//         method: "POST",
//       });
//       const data = await res.json(); // { token: "..." }
//       setToken(data.token);
//     })();
//   }, [eventId]);

//   if (!token) return <div className="p-6">Generating QR…</div>;

//   const payload = JSON.stringify({ token });

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-semibold">Check-in QR</h1>
//       <p>Ask attendees to present this QR at the entrance for quick scanning.</p>
//       <div className="p-4 rounded-xl border inline-block bg-white">
//         <QRCodeCanvas value={payload} size={240} includeMargin />
//       </div>
//       <div className="opacity-70 text-sm">
//         Token: <code className="break-all">{token}</code>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function EventCheckinQR({ params }: { params: { id: string } }) {
  const eventId = params.id;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Organizer endpoint generates a check-in token
      const res = await fetch(`/api/checkin/token?eventId=${eventId}`, {
        method: "POST",
      });
      const data = await res.json(); // { token: "..." }
      setToken(data.token);
    })();
  }, [eventId]);

  if (!token) return <div className="p-6">Generating QR…</div>;

  const payload = JSON.stringify({ token });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Check-in QR</h1>
      <p>Ask attendees to present this QR at the entrance for quick scanning.</p>
      <div className="p-4 rounded-xl border inline-block bg-white">
        <QRCodeCanvas value={payload} size={240} includeMargin />
      </div>
      <div className="opacity-70 text-sm">
        Token: <code className="break-all">{token}</code>
      </div>
    </div>
  );
}