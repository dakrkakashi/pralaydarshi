export function StatCard({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
      <p>{detail}</p>
    </div>
  )
}