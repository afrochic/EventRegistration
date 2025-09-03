"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";

type Question = { id: string; text: string; user: string; upvotes: number };

export default function LiveQA({ eventId }: { eventId: string }) {
  // Destructure the socket object from the object returned by useSocket
  const { socket } = useSocket(eventId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  // Fetch initial questions
  useEffect(() => {
    (async () => {
      const q = await fetch(`/api/qa?eventId=${eventId}`).then(r => r.json());
      setQuestions(q ?? []);
    })();
  }, [eventId]);

  // Handle real-time updates via the socket
  useEffect(() => {
    if (!socket) return;
    const onNewQuestion = (q: Question) => setQuestions(prev => [...prev, q]);
    const onUpvote = (data: { id: string; upvotes: number }) => {
      setQuestions(prev => prev.map(q => q.id === data.id ? { ...q, upvotes: data.upvotes } : q));
    };

    // Use the socket property to call on() and off()
    socket.on("live-q", onNewQuestion);
    socket.on("qa-upvote", onUpvote);

    return () => {
      socket.off("live-q", onNewQuestion);
      socket.off("qa-upvote", onUpvote);
    };
  }, [socket]);

  async function upvote(id: string) {
    await fetch(`/api/qa/${id}/upvote`, { method: "POST" });
  }

  async function submitQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    await fetch("/api/qa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, text: newQuestion }),
    });
    setNewQuestion("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Live Q&A</h3>
        <div className="space-y-3">
          {questions.map(q => (
            <div key={q.id} className="rounded-lg border p-3 flex justify-between items-center">
              <p className="flex-1">{q.text}</p>
              <button onClick={() => upvote(q.id)} className="flex items-center gap-1 opacity-70">
                <span className="text-sm">{q.upvotes}</span>
                <span>👍</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Ask a Question</h3>
        <form onSubmit={submitQuestion} className="flex gap-2">
          <input
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            placeholder="Your question..."
            className="border rounded-lg px-3 py-2 w-full"
          />
          <button type="submit" className="rounded-lg border px-3">Send</button>
        </form>
      </div>
    </div>
  );
}
// "use client";
// import { useEffect, useState } from "react";
// import {useSocket} from "@/hooks/useSocket";

// type QA = { id: string; author: string; question: string; createdAt: string; upvotes?: number };

// export default function LiveQA({ eventId }: { eventId: string }) {
//   const socket = useSocket(eventId);
//   const [items, setItems] = useState<QA[]>([]);
//   const [question, setQuestion] = useState("");

//   useEffect(() => {
//     (async () => {
//       const res = await fetch(`/api/qna?eventId=${eventId}`);
//       const data = await res.json();
//       setItems(data);
//     })();
//   }, [eventId]);

//   useEffect(() => {
//     if (!socket) return;
//     const onCreated = (q: QA) => setItems(prev => [q, ...prev]);
//     const onUpvoted = (q: QA) => setItems(prev => prev.map(p => p.id === q.id ? q : p));
//     socket.on("qna-created", onCreated);
//     socket.on("qna-upvoted", onUpvoted);
//     return () => {
//       socket.off("qna-created", onCreated);
//       socket.off("qna-upvoted", onUpvoted);
//     };
//   }, [socket]);

//   async function submit() {
//     if (!question.trim()) return;
//     await fetch(`/api/qna`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ eventId, question })
//     });
//     setQuestion("");
//   }

//   async function upvote(id: string) {
//     await fetch(`/api/qna/${id}/upvote`, { method: "POST" });
//   }

//   return (
//     <div className="space-y-3">
//       <h3 className="text-lg font-semibold">Live Q&A</h3>
//       <div className="flex gap-2">
//         <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask a question"
//                className="border rounded-lg px-3 py-2 w-full" />
//         <button onClick={submit} className="rounded-lg border px-3">Send</button>
//       </div>
//       <ul className="space-y-2">
//         {items.map(q => (
//           <li key={q.id} className="rounded-lg border p-3 flex items-start justify-between gap-3">
//             <div>
//               <div className="font-medium">{q.question}</div>
//               <div className="text-xs opacity-70">
//                 {q.author} • {new Date(q.createdAt).toLocaleTimeString()}
//               </div>
//             </div>
//             <button onClick={() => upvote(q.id)} className="text-sm rounded-lg border px-2">
//               👍 {q.upvotes ?? 0}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
