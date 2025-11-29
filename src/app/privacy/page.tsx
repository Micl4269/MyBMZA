import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="m-blue" className="mb-4">Legal</Badge>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: November 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <div className="prose prose-sm max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                My Beemer ("we", "our", or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website mybeemer.co.za. Please read this
                privacy policy carefully. By using our website, you consent to the practices
                described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Information We Collect</h2>

              <h3 className="font-semibold mt-4 mb-2">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Create an account</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us via email or forms</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This information may include your name, email address, phone number, shipping
                address, billing address, and payment information.
              </p>

              <h3 className="font-semibold mt-4 mb-2">Automatically Collected Information</h3>
              <p className="text-muted-foreground">
                When you visit our website, we automatically collect certain information,
                including your IP address, browser type, operating system, referring URLs,
                access times, and pages viewed. We may also collect information about your
                device and how you interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> Third parties who perform services on our
                  behalf, such as payment processing, shipping, and email delivery
                </li>
                <li>
                  <strong>Business Partners:</strong> Trusted partners who help us operate our
                  business, subject to confidentiality agreements
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our
                  rights, safety, or the safety of others
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your browsing
                experience, analyze website traffic, and personalize content. You can control
                cookies through your browser settings, but disabling cookies may affect the
                functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to
                protect your personal information. However, no method of transmission over
                the Internet or electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Under the Protection of Personal Information Act (POPIA), you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your information</li>
                <li>Object to the processing of your information</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to fulfill the
                purposes for which it was collected, comply with legal obligations, resolve
                disputes, and enforce our agreements. Order information is typically retained
                for 7 years for accounting and legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our website is not intended for children under 18 years of age. We do not
                knowingly collect personal information from children. If you believe we have
                collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites. We are not responsible
                for the privacy practices or content of these websites. We encourage you to
                review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of
                any changes by posting the new policy on this page and updating the "Last
                updated" date. Your continued use of our website after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions or concerns about this Privacy Policy or our data
                practices, please contact us at:
                <br /><br />
                Email: privacy@mybeemer.co.za
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
