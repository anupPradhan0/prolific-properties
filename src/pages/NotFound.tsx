import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    document.title = "404 | Page Not Found | Prolific Properties";

    const upsertMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    upsertMeta('meta[name="robots"]', "name", "robots", "noindex,follow");
    upsertMeta(
      'meta[name="description"]',
      "name",
      "description",
      "The requested page could not be found. Browse premium property listings on Prolific Properties.",
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
