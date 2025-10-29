import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { isRouteErrorResponse, Link } from "react-router";
import Container from "../components/Container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Recipe App" },
    {
      name: "description",
      content:
        "Welcome to Recipe App! Discover, share, and enjoy delicious recipes.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Welcome Home!";
  let details = "Something went wrong on the home page.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page Not Found" : "Error";
    details =
      error.status === 404
        ? "We couldn't find the home page. Please try again."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Container 
      as="main" 
      className="min-h-screen pt-20 flex flex-col justify-center items-center"
      py="lg"
    >
      <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-2">{message}</h1>
        <p className="text-gray-700 mb-6">{details}</p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
      {stack && (
        <pre className="mt-6 w-full max-w-2xl p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </Container>
  );
}
