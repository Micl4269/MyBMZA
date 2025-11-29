"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedMStripe } from "@/components/animations/motion";

export function CTASection() {
  return (
    <section className="py-16 bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-m-blue rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative">
        <AnimatedMStripe size="md" className="max-w-32 mx-auto mb-8" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-2xl lg:text-3xl font-bold mb-4"
        >
          Ready to Transform Your BMW?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-gray-400 mb-8 max-w-xl mx-auto"
        >
          Join thousands of BMW enthusiasts who trust My BM ZA for premium
          aftermarket aesthetics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/supplier-products">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-m-blue hover:bg-m-blue-dark text-white shadow-lg shadow-m-blue/30"
              >
                Browse All Products
              </Button>
            </motion.div>
          </Link>
          <Link href="/contact">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-foreground"
              >
                Contact Us
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
