import { Link, useLocation } from "react-router";
import { useState } from "react";
import { useNavigation } from "react-router";
import Container from "./Container";

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const navItems = [
    { label: "Home", path: "/" },
    // { label: "Discover", path: "/discover" },
    { label: "App", path: "/app" },
    // { label: "Settings", path: "/settings" },
    { label: "About Me", path: "/about-me" },
  ];

  const closeMenu = () => setIsOpen(false);

  const MenuIcon = () => (
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const CloseIcon = () => (
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const LoadingSpinner = () => (
    <svg
      className="w-5 h-5 animate-spin"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <>
      {/* Loading Indicator - Prominent overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-red-600 to-red-500 h-1 shadow-lg">
          <div
            className="h-full bg-white/30 animate-pulse"
            style={{
              animation: "progress 1.5s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Loading Toast Notification */}
      {isLoading && (
        <div className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 border-l-4 border-red-600">
          <LoadingSpinner />
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">Loading...</p>
            <p className="text-sm text-gray-600">Fetching page content</p>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav
        className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-200 ${isLoading ? "opacity-75" : "opacity-100"}`}
      >
        <Container size="2xl" className="py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 hover:text-red-600 transition-colors"
          >
            Savvy Tech Team Task
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all relative group ${
                  isLoading
                    ? "pointer-events-none cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                } ${
                  isActive(item.path) &&
                  (item.path === "/" ? location.pathname === "/" : true)
                    ? "text-red-600"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform origin-left ${
                    isActive(item.path) &&
                    (item.path === "/" ? location.pathname === "/" : true)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={isLoading}
            className={`lg:hidden ml-auto p-2 hover:bg-gray-100 rounded-lg transition-colors ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </Container>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isLoading ? "opacity-75" : "opacity-100"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-red-600 transition-colors"
          >
            Recipe App
          </Link>
          <button
            onClick={closeMenu}
            disabled={isLoading}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isLoading
                      ? "pointer-events-none cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  } ${
                    isActive(item.path) &&
                    (item.path === "/" ? location.pathname === "/" : true)
                      ? "bg-red-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
