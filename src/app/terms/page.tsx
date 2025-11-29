import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="m-blue" className="mb-4">Legal</Badge>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: November 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="prose prose-sm max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using My Beamer (mybeamer.co.za), you accept and agree to be
                bound by the terms and provisions of this agreement. If you do not agree
                to abide by these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">2. Use of the Service</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use our service only for lawful purposes. You are prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Using the service for any unlawful purpose</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with the proper operation of the service</li>
                <li>Collecting or harvesting any personally identifiable information</li>
                <li>Engaging in any conduct that restricts others from using the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">3. Products and Pricing</h2>
              <p className="text-muted-foreground mb-4">
                All prices are listed in South African Rand (ZAR) and include VAT unless
                otherwise stated. We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modify or discontinue any product without notice</li>
                <li>Change prices at any time without prior notice</li>
                <li>Limit quantities available for purchase</li>
                <li>Refuse or cancel any orders at our discretion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">4. Orders and Payment</h2>
              <p className="text-muted-foreground mb-4">
                By placing an order, you represent that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You are at least 18 years of age</li>
                <li>All information provided is accurate and complete</li>
                <li>You are authorized to use the payment method provided</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We reserve the right to refuse or cancel any order for any reason,
                including suspected fraud or unauthorized transactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground">
                Shipping times are estimates only. We are not responsible for delays caused
                by shipping carriers, customs, or other factors beyond our control. Risk of
                loss and title for items pass to you upon delivery to the carrier.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">6. Returns and Refunds</h2>
              <p className="text-muted-foreground">
                Returns are subject to our Return Policy. Please review our Returns page
                for complete details on eligibility, process, and timeframes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">7. Product Information</h2>
              <p className="text-muted-foreground">
                We strive to provide accurate product descriptions and images. However, we
                do not warrant that product descriptions, images, or other content are
                accurate, complete, or error-free. Products may vary slightly from images shown.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, images, and
                software, is the property of My Beamer or its content suppliers and is protected
                by South African and international copyright laws. BMW and all related marks
                are trademarks of BMW AG.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, My Beamer shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any
                loss of profits or revenues, whether incurred directly or indirectly, or any
                loss of data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless My Beamer, its officers, directors,
                employees, and agents from any claims, damages, losses, liabilities, and
                expenses arising out of your use of the service or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws
                of South Africa. Any disputes arising under these terms shall be subject to
                the exclusive jurisdiction of the courts of South Africa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be
                effective immediately upon posting to the website. Your continued use of
                the service after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
                <br /><br />
                Email: legal@mybeamer.co.za
                <br />
                Address: Johannesburg, South Africa
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
