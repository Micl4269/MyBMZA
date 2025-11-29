import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-m-blue rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 text-center relative">
        {/* M-stripe - CSS only */}
        <div className="max-w-32 mx-auto mb-8 h-1.5 w-full overflow-hidden">
          <div
            className="h-full w-full"
            style={{
              background: "linear-gradient(90deg, #81C4FF 0%, #81C4FF 33.33%, #16588E 33.33%, #16588E 66.66%, #E7222E 66.66%, #E7222E 100%)",
            }}
          />
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
          Ready to Transform Your BMW?
        </h2>

        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Join thousands of BMW enthusiasts who trust My BM ZA for premium
          aftermarket aesthetics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/supplier-products">
            <Button
              size="lg"
              className="bg-m-blue hover:bg-m-blue-dark text-white shadow-lg shadow-m-blue/30 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Browse All Products
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-400 text-white hover:bg-white hover:text-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
