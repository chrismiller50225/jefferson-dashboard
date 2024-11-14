import JeffersonDashboard from '@/components/dashboard/jefferson-dashboard-main';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-7xl">
        <JeffersonDashboard />
      </div>
    </main>
  );
}