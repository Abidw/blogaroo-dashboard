import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
  views?: number;
}

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      const blogs = JSON.parse(storedBlogs);
      const foundBlog = blogs.find((b: Blog) => b.id === id);
      
      if (foundBlog) {
        // Increment views
        const updatedBlogs = blogs.map((b: Blog) => {
          if (b.id === id) {
            return { ...b, views: (b.views || 0) + 1 };
          }
          return b;
        });
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        setBlog({ ...foundBlog, views: (foundBlog.views || 0) + 1 });
      }
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
          <Link to="/">
            <Button variant="outline" className="mt-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{blog.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{blog.date}</p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose lg:prose-lg">
              {blog.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;