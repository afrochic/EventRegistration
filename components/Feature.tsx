// components/Feature.tsx
export default function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}
