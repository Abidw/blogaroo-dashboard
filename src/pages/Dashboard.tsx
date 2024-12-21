import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Blog Dashboard</h2>
        <p className="text-muted-foreground">Start managing your blog posts here.</p>
      </main>
    </div>
  );
};

export default Dashboard;