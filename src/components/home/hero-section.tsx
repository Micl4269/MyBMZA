"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { VehicleSelector } from "@/components/vehicle/vehicle-selector";
import { AnimatedMStripe } from "@/components/animations/motion";
import { ChevronRight, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-m-blue/5 via-m-blue/3 to-background py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-m-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-m-red/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4"
          >
            <MapPin className="h-4 w-4" />
            <span>Gauteng Based | Nationwide Delivery</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight"
          >
            Premium BMW{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-m-blue to-m-blue-dark">
              Aftermarket Aesthetics
            </span>
          </motion.h1>

          {/* Animated M-stripe under heading */}
          <AnimatedMStripe size="md" className="max-w-48 mx-auto mb-6" />

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Curated plug-and-play solutions for the discerning BMW enthusiast.
            Transform your ride with quality parts that fit perfectly.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/supplier-products">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="primary" className="shadow-lg shadow-m-blue/20">
                  Shop All Products
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Vehicle Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <VehicleSelector />
        </motion.div>
      </div>
    </section>
  );
}
