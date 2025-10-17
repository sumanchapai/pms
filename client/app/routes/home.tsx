import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <body className="mt-8 py-16 mx-auto px-4 max-w-lg">
      <h1>Hello, World</h1>
      <p>Welcome to my first Remix app!</p>
    </body>
  );
}
