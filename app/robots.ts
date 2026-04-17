export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/admin"],
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/admin"],
      },
    ],
    sitemap: "https://www.prolificproperties.in/sitemap.xml",
    host: "https://www.prolificproperties.in",
  };
}
