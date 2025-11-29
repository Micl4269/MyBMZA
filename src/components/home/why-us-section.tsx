import { MapPin, Truck, Shield, Wrench, LucideIcon } from "lucide-react";

interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const whyUsItems: WhyUsItem[] = [
  {
    icon: MapPin,
    title: "Gauteng Based",
    description: "Local stock means faster shipping and easier returns",
  },
  {
    icon: Truck,
    title: "Nationwide Shipping",
    description: "We deliver to every corner of South Africa",
  },
  {
    icon: Shield,
    title: "Curated Quality",
    description: "Every part tested for fitment and build quality",
  },
  {
    icon: Wrench,
    title: "Plug & Play",
    description: "Solutions designed for easy DIY installation",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Why My Beemer?</h2>
          <p className="text-muted-foreground">
            We're BMW enthusiasts based in Gauteng, curating the best
            aftermarket aesthetics for fellow enthusiasts across South Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsItems.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-xl p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-m-blue/10 flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                <item.icon className="h-7 w-7 text-m-blue" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
