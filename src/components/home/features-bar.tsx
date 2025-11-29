import { Truck, Shield, Wrench, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Truck,
    title: "Nationwide Shipping",
    description: "Fast delivery across South Africa from our Gauteng warehouse",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every product tested for perfect OEM fitment and durability",
  },
  {
    icon: Wrench,
    title: "Plug & Play",
    description: "Easy installation with no modifications required",
  },
];

export function FeaturesBar() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 py-6 px-4 md:px-8"
            >
              <div className="w-12 h-12 rounded-full bg-m-blue/10 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-m-blue" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
