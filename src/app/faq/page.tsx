"use client";

import { useState } from "react";
import Link from "next/link";
import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";
import { FAQSchema } from "@/components/seo/json-ld";
import { ChevronDown, Car, Truck, CreditCard, RotateCcw, Package, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "BMW Compatibility",
    icon: <Car className="h-5 w-5" />,
    faqs: [
      {
        question: "How do I know if a part fits my BMW?",
        answer: "Each product listing includes compatibility information showing which BMW models and chassis codes (like E90, F30, G20) the part fits. You can also use our vehicle selector at the top of the page to filter products for your specific BMW. If you're unsure, contact us with your VIN and we'll confirm compatibility."
      },
      {
        question: "What do the chassis codes like E90, F30, G20 mean?",
        answer: "BMW uses internal chassis codes to identify different generations of each model. For example, E90 is the 2006-2011 3 Series, F30 is the 2012-2019 3 Series, and G20 is the 2019+ 3 Series. These codes help ensure you get the exact right part for your specific BMW generation."
      },
      {
        question: "Do your parts fit right-hand drive (RHD) BMWs?",
        answer: "Yes! All our parts are compatible with right-hand drive South African BMWs. Where there are differences between LHD and RHD versions (like interior trim), we specify the correct variant for SA vehicles."
      },
      {
        question: "Are these OEM or aftermarket parts?",
        answer: "We offer high-quality aftermarket parts that are designed to fit and function like OEM parts. Our products go through quality checks to ensure proper fitment and durability. We don't sell genuine BMW OEM parts."
      }
    ]
  },
  {
    title: "Shipping & Delivery",
    icon: <Truck className="h-5 w-5" />,
    faqs: [
      {
        question: "How long does delivery take?",
        answer: "Standard delivery typically takes 3-7 business days depending on your location. Express delivery is available for 1-3 business day delivery. Gauteng usually receives orders faster, while more remote areas may take the full delivery window."
      },
      {
        question: "How much does shipping cost?",
        answer: "Shipping costs depend on your province and order total. Free shipping is available on orders over a certain amount (varies by province). You'll see the exact shipping cost at checkout before payment."
      },
      {
        question: "Do you deliver nationwide?",
        answer: "Yes! We deliver to all 9 provinces in South Africa. We use trusted courier partners to ensure your parts arrive safely."
      },
      {
        question: "How do I track my order?",
        answer: "Once your order ships, you'll receive an email with tracking information. You can also track your order by visiting our order tracking page and entering your order number."
      }
    ]
  },
  {
    title: "Payment",
    icon: <CreditCard className="h-5 w-5" />,
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept payments via PayFast (credit/debit cards, Instant EFT, Mobicred) and Yoco (credit/debit cards). All payments are processed securely through these trusted South African payment providers."
      },
      {
        question: "Is it safe to pay online?",
        answer: "Absolutely! We use industry-standard SSL encryption and trusted payment gateways (PayFast and Yoco) to protect your payment information. We never store your card details on our servers."
      },
      {
        question: "Can I pay with EFT?",
        answer: "Yes, you can use Instant EFT through PayFast at checkout. This allows you to pay directly from your bank account without needing a credit card."
      },
      {
        question: "When will I be charged?",
        answer: "Payment is processed immediately when you complete checkout. Your card will be charged or EFT debited right away, and we'll begin processing your order as soon as payment is confirmed."
      }
    ]
  },
  {
    title: "Returns & Exchanges",
    icon: <RotateCcw className="h-5 w-5" />,
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We offer a 14-day return policy for unused items in original packaging. If you receive a defective or incorrect item, we'll cover return shipping and send the correct item or provide a full refund."
      },
      {
        question: "How do I return an item?",
        answer: "Contact our support team via email or the contact form with your order number and reason for return. We'll provide return instructions and, if applicable, a return shipping label."
      },
      {
        question: "What if I ordered the wrong part?",
        answer: "If you ordered the wrong part, you can return it within 14 days for an exchange or store credit, provided it's unused and in original packaging. Return shipping for incorrect orders is the customer's responsibility."
      },
      {
        question: "How long do refunds take?",
        answer: "Once we receive your return, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days depending on your bank."
      }
    ]
  },
  {
    title: "Orders & Products",
    icon: <Package className="h-5 w-5" />,
    faqs: [
      {
        question: "How do I check if an item is in stock?",
        answer: "Product availability is shown on each product page. Items marked 'In Stock' are ready to ship. You can also filter products by availability using the 'In Stock Only' filter on the products page."
      },
      {
        question: "Can I cancel or modify my order?",
        answer: "Orders can be cancelled or modified within 2 hours of placing them, before they enter processing. Contact us immediately if you need to make changes. Once an order is shipped, it cannot be cancelled."
      },
      {
        question: "Do you offer installation?",
        answer: "We don't offer installation services directly, but all our parts are designed for DIY installation or can be installed by any qualified mechanic or BMW specialist. Most products include installation guides or we can point you to resources."
      },
      {
        question: "What if my item arrives damaged?",
        answer: "If your item arrives damaged, take photos of the packaging and product, then contact us within 48 hours. We'll arrange a replacement or refund at no cost to you."
      }
    ]
  }
];

// Flatten all FAQs for schema
const allFaqs = faqCategories.flatMap(cat => cat.faqs);

function FAQAccordion({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:text-m-blue transition-colors"
      >
        <span className="font-medium pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-muted-foreground">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQCategorySection({ category }: { category: FAQCategory }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="bg-secondary/50 px-6 py-4 flex items-center gap-3 border-b border-border">
        <div className="w-10 h-10 bg-m-blue/10 rounded-lg flex items-center justify-center text-m-blue">
          {category.icon}
        </div>
        <h2 className="font-semibold text-lg">{category.title}</h2>
      </div>
      <div className="px-6">
        {category.faqs.map((faq, index) => (
          <FAQAccordion
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={allFaqs} />

      <div className="min-h-screen bg-secondary/30">
        <MStripe size="sm" />

        {/* Hero Section */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
            <Badge variant="m-blue" className="mb-4">Help Center</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked
              <br />
              <span className="text-m-blue">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, payments, and more.
              Can't find what you're looking for? <Link href="/contact" className="text-m-blue hover:underline">Contact us</Link>.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* FAQ Categories */}
          <div className="space-y-6">
            {faqCategories.map((category, index) => (
              <FAQCategorySection key={index} category={category} />
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-12 bg-m-blue text-white rounded-xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-6">
              Our team is here to help! Reach out and we'll get back to you as soon as possible.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-m-blue px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
