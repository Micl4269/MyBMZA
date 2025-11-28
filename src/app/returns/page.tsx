import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RotateCcw, CheckCircle, XCircle, Mail, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="m-blue" className="mb-4">Returns & Refunds</Badge>
          <h1 className="text-4xl font-bold mb-4">Return Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. If you're not
            happy, we're here to help.
          </p>
        </div>

        {/* Return Window */}
        <div className="bg-m-blue/10 border border-m-blue/20 rounded-xl p-6 mb-12 text-center">
          <RotateCcw className="h-10 w-10 text-m-blue mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">14-Day Return Window</h2>
          <p className="text-muted-foreground">
            You have 14 days from the date of delivery to initiate a return.
          </p>
        </div>

        {/* Eligibility */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold">Return Eligibility</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold">Eligible for Return</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Items in original, unused condition</li>
                <li>Products in original packaging</li>
                <li>Items with all tags and labels attached</li>
                <li>Wrong item received</li>
                <li>Defective or damaged products</li>
                <li>Items not matching description</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-5 w-5 text-m-red" />
                <h3 className="font-semibold">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Items installed or used</li>
                <li>Products without original packaging</li>
                <li>Electrical items that have been tested</li>
                <li>Custom or special order items</li>
                <li>Items damaged by customer</li>
                <li>Returns after 14-day window</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold">How to Return an Item</h2>

          <div className="bg-card border border-border rounded-xl p-6">
            <ol className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-m-blue text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium">Contact Us</p>
                  <p className="text-sm text-muted-foreground">
                    Email us at returns@mybmza.co.za with your order number and reason
                    for return. Include photos if the item is damaged or defective.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-m-blue text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium">Receive Return Authorization</p>
                  <p className="text-sm text-muted-foreground">
                    We'll review your request and send you a Return Merchandise
                    Authorization (RMA) number within 24-48 hours.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-m-blue text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium">Ship the Item</p>
                  <p className="text-sm text-muted-foreground">
                    Pack the item securely in its original packaging and ship it to
                    our returns address. Include the RMA number on the package.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-m-blue text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  4
                </span>
                <div>
                  <p className="font-medium">Receive Refund</p>
                  <p className="text-sm text-muted-foreground">
                    Once we receive and inspect the item, we'll process your refund
                    within 5-7 business days.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Refund Information */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold">Refund Information</h2>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <h3 className="font-medium mb-1">Refund Method</h3>
              <p className="text-sm text-muted-foreground">
                Refunds will be issued to the original payment method used at checkout.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Processing Time</h3>
              <p className="text-sm text-muted-foreground">
                Refunds are processed within 5-7 business days after we receive and
                inspect the returned item. Bank processing may take an additional 3-5 days.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Shipping Costs</h3>
              <p className="text-sm text-muted-foreground">
                Original shipping costs are non-refundable unless the return is due to
                our error (wrong item, defective product, etc.). Return shipping is the
                customer's responsibility.
              </p>
            </div>
          </div>
        </div>

        {/* Exchanges */}
        <div className="bg-card border border-border rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold mb-4">Exchanges</h2>
          <p className="text-muted-foreground mb-4">
            We currently don't offer direct exchanges. To exchange an item, please
            return the original item for a refund and place a new order for the
            replacement item.
          </p>
          <p className="text-sm text-muted-foreground">
            Tip: Place your new order before returning the original item to ensure
            the replacement is available.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-secondary/50 border border-border rounded-xl p-6 text-center">
          <Mail className="h-10 w-10 text-m-blue mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Questions About Returns?</h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help with any questions about our return policy.
          </p>
          <Link href="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
