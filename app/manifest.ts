import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AvaElis Health",
    short_name: "AvaElis",
    description: "A boutique longevity practice with Dr. Danny Cai.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2EBDD",
    theme_color: "#9A7536",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
