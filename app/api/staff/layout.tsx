// app/staff/layout.tsx
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-5xl mx-auto p-4 flex items-center gap-4">
          <a href="/staff" className="font-bold">Staff Portal</a>
          <nav className="ml-auto flex items-center gap-4">
            <a href="/staff/scanner" className="underline">Scanner</a>
            <form action="/api/staff/logout" method="POST">
              <button className="text-sm border px-2 py-1 rounded" type="submit">Logout</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  );
}
