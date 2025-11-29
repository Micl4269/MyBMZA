import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Truck, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      {/* Hero Section */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <Badge variant="m-blue" className="mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            South Africa's Premier
            <br />
            <span className="text-m-blue">BMW Parts</span> Destination
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My Beamer is your destination for quality aftermarket BMW parts and accessories.
            We're passionate about BMWs and committed to helping enthusiasts find the parts
            they need at competitive prices.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded by BMW enthusiasts, for BMW enthusiasts. My Beamer was born out of
                a simple frustration: finding quality aftermarket parts for BMWs in
                South Africa shouldn't be so difficult.
              </p>
              <p>
                We offer a curated selection of parts, accessories, and upgrades for your BMW.
                Whether you're restoring a classic E30 or modifying a new G20, we've got
                you covered.
              </p>
              <p>
                Our team personally vets every product we sell, ensuring quality and
                fitment so you can shop with confidence.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="font-semibold text-lg mb-6">Why Choose My Beamer?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium">Quality Assured</p>
                  <p className="text-sm text-muted-foreground">
                    Every product is vetted for quality and compatibility
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Nationwide Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Fast shipping to anywhere in South Africa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Secure Shopping</p>
                  <p className="text-sm text-muted-foreground">
                    Safe payment options with buyer protection
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Passion for BMWs</p>
                  <p className="text-sm text-muted-foreground">
                    Run by enthusiasts who understand your needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "5,000+", label: "Products Available" },
            { value: "2,500+", label: "Happy Customers" },
            { value: "9", label: "Provinces Served" },
            { value: "24/7", label: "Online Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <p className="text-3xl font-bold text-m-blue mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Promise */}
        <div className="bg-m-blue text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Promise to You</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We're committed to providing the best shopping experience for BMW parts
            in South Africa. If you're ever not satisfied with your purchase, our
            dedicated support team is here to make it right.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
              Quality Guarantee
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
              Hassle-Free Returns
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
              Expert Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
