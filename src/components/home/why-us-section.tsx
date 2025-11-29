"use client";

import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Why My BM ZA?</h2>
          <p className="text-muted-foreground">
            We're BMW enthusiasts based in Gauteng, curating the best
            aftermarket aesthetics for fellow enthusiasts across South Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-xl p-6 text-center transition-shadow hover:shadow-lg"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-14 h-14 rounded-full bg-m-blue/10 flex items-center justify-center mx-auto mb-4"
              >
                <item.icon className="h-7 w-7 text-m-blue" />
              </motion.div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
