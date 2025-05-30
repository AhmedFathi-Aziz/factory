import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background animate-fade-in px-4">
      <div className="max-w-lg w-full text-center p-8 rounded-xl shadow-professional bg-white dark:bg-card animate-scale-in">
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or has been moved.<br />
          Please check the URL or return to the homepage.
        </p>
        <Link href="/" className="btn-professional px-6 py-2 rounded-lg shadow-professional-lg hover-lift transition-smooth">
          Back to Factory Home
        </Link>
      </div>
      <div className="mt-8 w-32 h-32 animate-gentle-bounce">
        <img src="/images/factory-404.svg" alt="Factory Not Found" className="w-full h-full object-contain" />
      </div>
    </div>
  );
} 