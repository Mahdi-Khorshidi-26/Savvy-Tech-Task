import { Link } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import Container from "../components/Container";

export function Welcome() {
  return (
    <main className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-amber-900"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-orange-900"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl dark:bg-red-900"></div>
        </div>

        <Container size="2xl" className="relative py-16 sm:py-24 lg:py-32">
          {/* Logo
          <div className="text-center mb-12">
            <div className="inline-block w-32 sm:w-40 mb-8">
              <img
                src={logoLight}
                alt="Recipe App"
                className="w-full dark:hidden"
              />
              <img
                src={logoDark}
                alt="Recipe App"
                className="hidden w-full dark:block"
              />
            </div>
          </div> */}

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <p className="text-orange-600 dark:text-orange-400">
                Savvy Tech Team
              </p>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Organize, discover, and master your favorite recipes. Keep your
              pantry organized and never run out of inspiration in the kitchen.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/app"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
        
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <div className="relative bg-white dark:bg-gray-800 py-16 sm:py-24">
        <Container size="2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose RecipeHub?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-orange-500 to-red-500 text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="relative bg-linear-to-r from-orange-500 to-red-500 py-16 sm:py-20">
        <Container size="xl" className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to transform your cooking?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Start managing your recipes today and unlock endless culinary
            possibilities.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-orange-600 bg-white rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Launch App
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-8">
        <Container size="2xl" className="text-center">
          <p className="text-sm">
            Made with <span className="text-red-500">❤️</span>by Mahdi Khorshidi
            for Savvy Tech Team
          </p>
        </Container>
      </footer>
    </main>
  );
}

const features = [
  {
    title: "Organize Your Pantry",
    description:
      "Keep track of all your ingredients, organize them by shelves, and always know what you have on hand.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10"
        />
      </svg>
    ),
  },
  {
    title: "Discover New Recipes",
    description:
      "Browse through an endless collection of recipes, find inspiration, and expand your culinary horizons.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    title: "Personalize Your Experience",
    description:
      "Customize your profile, save your favorite recipes, and get recommendations tailored just for you.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];
