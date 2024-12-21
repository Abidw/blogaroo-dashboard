import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  // In a real app, this would fetch from an API
  const blogs = []; // This would be populated from your backend

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog</h1>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {blog.content.substring(0, 150)}...
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  {blog.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl text-muted-foreground">No blog posts yet.</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;