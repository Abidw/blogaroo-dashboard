import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Dashboard = () => {
  const { logout } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    const newBlog: Blog = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };

    setBlogs([...blogs, newBlog]);
    setTitle("");
    setContent("");
    toast({
      title: "Success",
      description: "Blog post added successfully!",
    });
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    toast({
      title: "Success",
      description: "Blog post deleted successfully!",
    });
  };

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
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <div>
                <Input
                  placeholder="Blog Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Blog Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              <Button type="submit">Add Blog Post</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;