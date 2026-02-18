import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * Privacy Policy Page - US Standard Compliance
 * 
 * This privacy policy complies with:
 * - California Consumer Privacy Act (CCPA)
 * - General Data Protection Regulation (GDPR)
 * - CAN-SPAM Act
 * - State privacy laws
 */

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-primary">Ceyrva</div>
          <a href="/" className="flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-16 max-w-4xl">
        <h1 className="text-5xl font-bold text-primary mb-2">Privacy Policy</h1>
        <p className="text-lg text-foreground/70 mb-12">Effective Date: February 18, 2026</p>

        <div className="space-y-12">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">1. Introduction</h2>
            <p className="text-foreground/80 leading-relaxed">
              Ceyrva ("Company," "we," "us," or "our") is committed to protecting your privacy and ensuring you have a positive experience on our website and when using our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services. By accessing and using our website and services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">2. Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">2.1 Information You Provide Directly</h3>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  We collect information you voluntarily provide to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and job title</li>
                  <li><strong>Consultation Information:</strong> Details about your organization's security needs and challenges</li>
                  <li><strong>Communication:</strong> Messages, inquiries, and feedback you send us</li>
                  <li><strong>Account Information:</strong> If you create an account, username, password, and profile information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">2.2 Information Collected Automatically</h3>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li><strong>Device Information:</strong> Browser type, operating system, device type, and device identifiers</li>
                  <li><strong>Usage Information:</strong> Pages visited, time spent on pages, links clicked, and referral sources</li>
                  <li><strong>Location Information:</strong> General geographic location based on IP address (not precise GPS)</li>
                  <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to track your activity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">2.3 Third-Party Information</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We may receive information about you from third parties, including analytics providers, advertising partners, and publicly available sources, which we may combine with other information we collect about you.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">3. How We Use Your Information</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use the information we collect for various purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>To provide, maintain, and improve our services</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To personalize your experience on our website</li>
              <li>To analyze website usage and improve our offerings</li>
              <li>To comply with legal obligations and protect our rights</li>
              <li>To detect and prevent fraud and security incidents</li>
              <li>To conduct business operations and transactions</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">4. How We Share Your Information</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">4.1 Service Providers</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We may share information with third-party service providers who perform services on our behalf, including email providers, hosting providers, analytics services, and payment processors. These providers are contractually obligated to use your information only as necessary to provide services to us.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">4.2 Legal Requirements</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We may disclose your information when required by law or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">4.3 Business Transfers</h3>
                <p className="text-foreground/80 leading-relaxed">
                  If Ceyrva is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will provide notice before your information becomes subject to a different privacy policy.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">5. Data Security</h2>
            <p className="text-foreground/80 leading-relaxed">
              We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80 mt-4">
              <li>Encryption of data in transit using SSL/TLS protocols</li>
              <li>Secure storage of sensitive information</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection and privacy</li>
              <li>Incident response procedures</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              While we strive to protect your information, no security system is impenetrable. We cannot guarantee absolute security of your information.
            </p>
          </section>

          {/* Your Privacy Rights */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">6. Your Privacy Rights</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">6.1 California Residents (CCPA)</h3>
                <p className="text-foreground/80 leading-relaxed">
                  California residents have the right to: (1) know what personal information is collected; (2) know whether personal information is sold or disclosed; (3) delete personal information; (4) opt-out of the sale or sharing of personal information; and (5) non-discrimination for exercising their rights.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">6.2 EU Residents (GDPR)</h3>
                <p className="text-foreground/80 leading-relaxed">
                  If you are located in the European Union, you have the right to: (1) access your personal data; (2) rectify inaccurate data; (3) erase your data; (4) restrict processing; (5) data portability; (6) object to processing; and (7) withdraw consent.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">6.3 How to Exercise Your Rights</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To exercise any of these rights, please contact us at <a href="mailto:adam@ceyrva.com" className="text-accent hover:underline">adam@ceyrva.com</a> with your request. We will respond within 30 days or as required by applicable law.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">7. Cookies and Tracking Technologies</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use cookies, web beacons, and similar tracking technologies to enhance your experience on our website. These technologies help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Remember your preferences and login information</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Deliver targeted advertising</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">8. Third-Party Links</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our website may contain links to third-party websites and services that are not operated by Ceyrva. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites before providing your information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">9. Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information promptly. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Data Retention */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">10. Data Retention</h2>
            <p className="text-foreground/80 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. The retention period may vary depending on the context of the processing and our legal obligations. When information is no longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">11. International Data Transfers</h2>
            <p className="text-foreground/80 leading-relaxed">
              Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using our services, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">12. Changes to This Privacy Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website and updating the "Effective Date" at the top of this policy. Your continued use of our services after such modifications constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">13. Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, concerns about our privacy practices, or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-blue-50 border border-border rounded-lg p-6 space-y-3">
              <p className="text-foreground">
                <strong>Ceyrva</strong><br />
                Cybersecurity & Risk Advisory
              </p>
              <p className="text-foreground">
                <strong>Email:</strong> <a href="mailto:adam@ceyrva.com" className="text-accent hover:underline">adam@ceyrva.com</a>
              </p>
              <p className="text-foreground/80 text-sm">
                We will respond to your inquiry within 30 days or as required by applicable law.
              </p>
            </div>
          </section>

          {/* Compliance Notice */}
          <section className="space-y-4 mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-semibold text-primary">Compliance Notice</h3>
            <p className="text-foreground/70 text-sm">
              This Privacy Policy complies with the California Consumer Privacy Act (CCPA), General Data Protection Regulation (GDPR), CAN-SPAM Act, and other applicable privacy laws. We are committed to maintaining the highest standards of data protection and privacy.
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-16 pt-8 border-t border-border">
          <a href="/">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
