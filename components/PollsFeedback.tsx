// "use client";
// import { useEffect, useState } from "react";
// import { useSocket } from "@/hooks/useSocket";

// type Poll = { id: string; question: string; options: { id: string; text: string; votes: number }[] };

// export default function PollsFeedback({ eventId }: { eventId: string }) {
//   const socket = useSocket(eventId);
//   const [poll, setPoll] = useState<Poll | null>(null);
//   const [feedback, setFeedback] = useState("");

//   useEffect(() => {
//     (async () => {
//       const p = await fetch(`/api/polls/current?eventId=${eventId}`).then(r => r.json());
//       setPoll(p ?? null);
//     })();
//   }, [eventId]);

//   useEffect(() => {
//     if (!socket) return;
//     const onPollUpdated = (p: Poll) => { if (p.id === poll?.id) setPoll(p); };
//     socket.on("poll-updated", onPollUpdated);
//     return () => { socket.off("poll-updated", onPollUpdated); };
//   }, [socket, poll?.id]);

//   async function vote(optionId: string) {
//     if (!poll) return;
//     await fetch(`/api/polls/${poll.id}/vote`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ optionId })
//     });
//   }

//   async function sendFeedback() {
//     if (!feedback.trim()) return;
//     await fetch(`/api/feedback`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ eventId, text: feedback })
//     });
//     setFeedback("");
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold">Live Poll</h3>
//         {!poll ? (
//           <div className="opacity-70 text-sm">No active poll</div>
//         ) : (
//           <div className="rounded-lg border p-4 space-y-2">
//             <div className="font-medium">{poll.question}</div>
//             <div className="grid gap-2">
//               {poll.options.map(o => (
//                 <button key={o.id} onClick={() => vote(o.id)} className="rounded-lg border px-3 py-2 flex justify-between">
//                   <span>{o.text}</span>
//                   <span className="opacity-70 text-sm">{o.votes}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <div>
//         <h3 className="text-lg font-semibold">Feedback</h3>
//         <div className="flex gap-2">
//           <input
//             value={feedback}
//             onChange={e => setFeedback(e.target.value)}
//             placeholder="What should we improve?"
//             className="border rounded-lg px-3 py-2 w-full"
//           />
//           <button onClick={sendFeedback} className="rounded-lg border px-3">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";

type Poll = {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
};

export default function PollsFeedback({ eventId }: { eventId: string }) {
  // Destructure the socket object correctly from the hook's return value
  const { socket } = useSocket(eventId);
  const [poll, setPoll] = useState<Poll | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    (async () => {
      const p = await fetch(`/api/polls/current?eventId=${eventId}`).then((r) =>
        r.json()
      );
      setPoll(p ?? null);
    })();
  }, [eventId]);

  useEffect(() => {
    if (!socket) return;
    const onPollUpdated = (p: Poll) => {
      if (p.id === poll?.id) setPoll(p);
    };
    
    // Call the methods on the socket object
    socket.on("poll-updated", onPollUpdated);
    
    return () => {
      socket.off("poll-updated", onPollUpdated);
    };
  }, [socket, poll?.id]);

  async function vote(optionId: string) {
    if (!poll) return;
    await fetch(`/api/polls/${poll.id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId }),
    });
  }

  async function sendFeedback() {
    if (!feedback.trim()) return;
    await fetch(`/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, text: feedback }),
    });
    setFeedback("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Live Poll</h3>
        {!poll ? (
          <div className="opacity-70 text-sm">No active poll</div>
        ) : (
          <div className="rounded-lg border p-4 space-y-2">
            <div className="font-medium">{poll.question}</div>
            <div className="grid gap-2">
              {poll.options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => vote(o.id)}
                  className="rounded-lg border px-3 py-2 flex justify-between"
                >
                  <span>{o.text}</span>
                  <span className="opacity-70 text-sm">{o.votes}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Feedback</h3>
        <div className="flex gap-2">
          <input
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What should we improve?"
            className="border rounded-lg px-3 py-2 w-full"
          />
          <button onClick={sendFeedback} className="rounded-lg border px-3">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}