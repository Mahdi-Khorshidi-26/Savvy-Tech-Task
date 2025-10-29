import type { Route } from "./+types/app";
import { isRouteErrorResponse, Link, Outlet } from "react-router";
import Container from "../components/Container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "App - Recipe App" },
    { name: "description", content: "Main application page for your recipes." },
  ];
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "App Error";
  let details = "We encountered an issue loading the application.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "App Page Not Found" : "Application Error";
    details =
      error.status === 404
        ? "The application page you're looking for doesn't exist."
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
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">{message}</h1>
        <p className="text-gray-700 mb-6">{details}</p>
        <Link
          to="/app"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reload App
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
