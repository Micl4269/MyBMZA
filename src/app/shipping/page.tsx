import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, Package, AlertCircle } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="m-blue" className="mb-4">Shipping Information</Badge>
          <h1 className="text-4xl font-bold mb-4">Delivery & Shipping</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We ship to all provinces in South Africa. Learn about our shipping
            options, delivery times, and costs.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Truck className="h-5 w-5 text-m-blue" />
            Shipping Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Standard Shipping</h3>
                <Badge variant="secondary">Most Popular</Badge>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  5-7 business days
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  All provinces
                </li>
              </ul>
              <p className="mt-4 font-semibold">
                R99 <span className="text-sm font-normal text-muted-foreground">or FREE over R1,500</span>
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Express Shipping</h3>
                <Badge variant="m-blue">Fastest</Badge>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  2-3 business days
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Major cities
                </li>
              </ul>
              <p className="mt-4 font-semibold">R199</p>
            </div>
          </div>
        </div>

        {/* Delivery Times */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5 text-m-blue" />
            Estimated Delivery Times
          </h2>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Province</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Standard</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Express</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-3 text-sm">Gauteng</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">3-5 days</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">1-2 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">Western Cape</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">4-6 days</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">2-3 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">KwaZulu-Natal</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">4-6 days</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">2-3 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">Eastern Cape</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">5-7 days</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">3-4 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-sm">Other Provinces</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">5-7 days</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">3-4 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground">
            * Delivery times are estimates and may vary based on location and product availability.
            Business days exclude weekends and public holidays.
          </p>
        </div>

        {/* Order Processing */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Package className="h-5 w-5 text-m-blue" />
            Order Processing
          </h2>

          <div className="bg-card border border-border rounded-xl p-6">
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-m-blue text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                <div>
                  <p className="font-medium text-foreground">Order Confirmation</p>
                  <p className="text-sm">You'll receive an email confirming your order within minutes.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-m-blue text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                <div>
                  <p className="font-medium text-foreground">Processing</p>
                  <p className="text-sm">Orders are processed within 1-2 business days.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-m-blue text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                <div>
                  <p className="font-medium text-foreground">Shipped</p>
                  <p className="text-sm">Once shipped, you'll receive tracking information via email.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-m-blue text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                <div>
                  <p className="font-medium text-foreground">Delivery</p>
                  <p className="text-sm">Your package will be delivered to your specified address.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Important Notes</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>Large or heavy items may have additional shipping costs.</li>
                <li>Remote areas may experience longer delivery times.</li>
                <li>We are not responsible for delays caused by couriers.</li>
                <li>Please ensure someone is available to receive the package.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
