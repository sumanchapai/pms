import Layout from "~/components/layout";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <h1>Hello, World</h1>
      <p>Welcome to my first Remix app!</p>
    </Layout>
  );
}
