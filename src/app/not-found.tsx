import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* M-stripe decoration */}
        <div className="flex justify-center gap-1 mb-8">
          <div className="w-16 h-1.5 bg-[#00A1E1] rounded-full"></div>
          <div className="w-16 h-1.5 bg-[#DD052B] rounded-full"></div>
          <div className="w-16 h-1.5 bg-[#00A1E1] rounded-full"></div>
        </div>

        {/* 404 display */}
        <div className="mb-6">
          <span className="text-8xl font-bold text-gray-200">404</span>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-m-blue text-white font-medium rounded-lg hover:bg-m-blue/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/supplier-products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse Products
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular destinations</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/supplier-products"
              className="text-sm text-m-blue hover:underline"
            >
              All Products
            </Link>
            <Link
              href="/supplier-products?category=exterior"
              className="text-sm text-m-blue hover:underline"
            >
              Exterior
            </Link>
            <Link
              href="/supplier-products?category=interior"
              className="text-sm text-m-blue hover:underline"
            >
              Interior
            </Link>
            <Link
              href="/contact"
              className="text-sm text-m-blue hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
