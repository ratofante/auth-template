import type { Route } from "./+types/about";
import { AboutView } from "@/views/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <AboutView />;
}
