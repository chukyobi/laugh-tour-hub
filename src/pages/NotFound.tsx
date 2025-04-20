
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Looks like you've ventured off the stage. The page you're looking for
        doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
