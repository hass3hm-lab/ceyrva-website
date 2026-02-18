import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Cloud, FileText, AlertTriangle, Linkedin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import SecurityBadge from "@/components/SecurityBadge";
import TestimonialsSection from "@/components/TestimonialsSection";
import { submitConsultationForm, validateConsultationForm } from "@/lib/formHandler";

/**
 * Ceyrva Homepage - Modern Minimalist Design
 * 
 * Design Philosophy:
 * - Clean, professional layout with generous whitespace
 * - Deep slate blue (#1a365d) for authority and trust
 * - Vibrant teal (#0d9488) for CTAs and key elements
 * - Asymmetric content flow with staggered sections
 * - Smooth, subtle animations on scroll and interaction
 * - Typography: Plus Jakarta Sans for headings, Inter for body
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/ceyrva-logo-shield.png" alt="Ceyrva Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">Ceyrva</span>
          </a>
          <div className="flex gap-8 items-center">
            <a href="#services" className="text-sm font-medium hover:text-accent transition-colors">Services</a>
            <a href="#approach" className="text-sm font-medium hover:text-accent transition-colors">Approach</a>
            <a href="#consultation" className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-white to-blue-50">
        <div className="container py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Ceyrva
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-secondary">
                  Cybersecurity & Risk Advisory
                </p>
              </div>
              
              <p className="text-lg text-foreground/80 max-w-lg leading-relaxed">
                Practical security assessments for growing organizations. We help businesses reduce cyber risk, strengthen cloud security, and meet compliance requirements with clear, structured guidance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg"
                  onClick={() => {
                    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Request a Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg"
                  onClick={() => {
                    document.getElementById('approach')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn How It Works
                </Button>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/p8sNjDW0k5T66X8g3MmIMe/sandbox/P6ptKInKyJ0OYPJmI7AdgK-img-1_1771388773000_na1fn_Y2V5cnZhLWhlcm8tbWFpbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDhzTmpEVzBrNVQ2Nlg4ZzNNbUlNZS9zYW5kYm94L1A2cHRLSW5LeUowT1lQSm1JN0FkZ0staW1nLTFfMTc3MTM4ODc3MzAwMF9uYTFmbl9ZMlY1Y25aaExXaGxjbTh0YldGcGJnLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UytL1I~AYl9fvUc7KV7nMsO1ZRVGSz1H8qyMcERnkCNkic~t3eshzwmvq6QuCu3qDn7pB7ZffR56CUPNklfM~VCQw0gjH-AApSCRFYTmXLnzA~G3yIjE-FPwDPyE-FVqaAGmJ0k-jwm8rCgze86OJ5~1qj9VKmIBsiAOGxfH2eg64b8VQdcypKpML-wwVsVeunIjBQhdj4475GM~bHbWxZkYGaVPyBUEE2f0IqlY0UPXxul113j3TejbKNvctYIm-gMQz5LbLKFVrOMxnUz5Q5Id3qaNhQiMjMZs8-cLFZJuL~k1mc8Aipv-~Bsl1~KaMx878AAI21llKdqCmGArlg__"
                  alt="Security Assessment Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What We Do</h2>
            <p className="text-lg text-foreground/70">Comprehensive security services designed for growing organizations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Service 1 */}
            <div className="group rounded-lg overflow-hidden bg-white border border-border hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/p8sNjDW0k5T66X8g3MmIMe/sandbox/00VGmFWafLtKw3gql5DSiP-img-1_1771452149000_na1fn_c2VjdXJpdHktcmlzay1hc3Nlc3NtZW50.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDhzTmpEVzBrNVQ2Nlg4ZzNNbUlNZS9zYW5kYm94LzAwVkdtRldhZkx0S3czZ3FsNURTaVAtaW1nLTFfMTc3MTQ1MjE0OTAwMF9uYTFmbl9jMlZqZFhKcGRIa3RjbWx6YXkxaGMzTmxjM050Wlc1MC5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=E0cCaACoQjcxmhy24pA8ojo3zUvLB~8qlIdNV43VTNuqbxOmo7gJx9bL-9rASUV3WHsoeh0aRk33DhGSpFgZ4RkCfI~s0jA5sZxE4vwPLh25hk4Uqw7hIopQ1wFBUk29CmBlnAwTbuaiUfMZFRPeVm0SHtp3dPnK4vMFgt8zsVDwzmPn1o~mBfsp1q-AAWJJtYhzlySoHUVgfa53vYLi3SfvSVVzVtb4U~TZwaMzeFsRy3MBw--K8ZLrIkrNVwWQGzrYqwvVwkhxthz-YOiLb26lhudsrn4ab52AcAg~GF5od9TftZC1PvOcafiUz74hCF9X5Z0KRgDbz7vA491ABA__"
                  alt="Security Risk Assessments"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Security Risk Assessments</h3>
                <p className="text-foreground/75 leading-relaxed">
                  Our expert team analyzes your entire security posture—from identity and access management to cloud configurations, backup strategies, and security policies. We deliver a comprehensive report with prioritized findings and a clear remediation roadmap tailored to your business risk tolerance and resources.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group rounded-lg overflow-hidden bg-white border border-border hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/p8sNjDW0k5T66X8g3MmIMe/sandbox/00VGmFWafLtKw3gql5DSiP-img-2_1771452146000_na1fn_Y2xvdWQtaWRlbnRpdHktc2VjdXJpdHk.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDhzTmpEVzBrNVQ2Nlg4ZzNNbUlNZS9zYW5kYm94LzAwVkdtRldhZkx0S3czZ3FsNURTaVAtaW1nLTJfMTc3MTQ1MjE0NjAwMF9uYTFmbl9ZMnh2ZFdRdGFXUmxiblJwZEhrdGMyVmpkWEpwZEhrLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kepoN3a84EGPSfGd46pS3RsuBgXH0IhBUk1Om84AYI3RE0HVHNBqnceTaAzzlww7qwiTbkgn3QaR9A4K1v5OKD4xik89t9pJvmGYtc9Wes6St6ql7zn8FRIdyBdfOqx-nCV1KmerdMjZFBwJSDt-ELwpzB~LOW2yejES3X2UF64INDNYEL7Do0cK3Vu9nHCVlcgzXK2tKmuCcR1K-H9PWZNomtRGQ4G6SpyybfkTgBZBYcqw1n3U-p-eFMgNYeygsW41aS~rCjmLGJvSMBm3tAag5oKKJfYhvXkTOD6vKIdfzKxurt4IcdgAJhLHXeVkVdv74B6iMnnoX3iyUnCoHA__"
                  alt="Cloud & Identity Security Reviews"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Cloud & Identity Security Reviews</h3>
                <p className="text-foreground/75 leading-relaxed">
                  We evaluate your cloud infrastructure and identity systems across Microsoft 365, Google Workspace, and other platforms. Our assessment covers multi-factor authentication enforcement, administrative access controls, conditional access policies, data sharing risks, and compliance posture to ensure your cloud environment is secure and properly configured.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group rounded-lg overflow-hidden bg-white border border-border hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/p8sNjDW0k5T66X8g3MmIMe/sandbox/00VGmFWafLtKw3gql5DSiP-img-3_1771452133000_na1fn_Y29tcGxpYW5jZS1hZHZpc29yeQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDhzTmpEVzBrNVQ2Nlg4ZzNNbUlNZS9zYW5kYm94LzAwVkdtRldhZkx0S3czZ3FsNURTaVAtaW1nLTNfMTc3MTQ1MjEzMzAwMF9uYTFmbl9ZMjl0Y0d4cFlXNWpaUzFoWkhacGMyOXllUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WJsx0HrZdXeEcv2hcYDxVTrfLOVZbuC5hcyN4EmKpe0AFU1V2XWvDIskVgynQTmGhxEK3LOB5dI7X7YOWLyZ4V5~ehnH4uzwPdiYFuJ34AmmG57jARd1IpAJgyAC6tYUQ7CrihTUziqDzbLhzjYx5pT9CYNBUW8N0BFOIPnxL0UvE-EqD7D8i~wGvCGvcz3r5eEFSzSG43UinNCeyrUGQVY5uAk-WVp3lmzsLI3Lkpxbge~xWYc7yKjMteGtH-BHIa1M-SZkBFiaf7hiwELut6vStRSK2wfCgyO2KCpGlQ9Ts6oQ16vhFXSqgXp-kBbi-mH41FBJctcLZ6O4iClSDA__"
                  alt="Compliance & Readiness Advisory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Compliance & Readiness Advisory</h3>
                <p className="text-foreground/75 leading-relaxed">
                  Preparing for HIPAA, SOC 2, GDPR, or vendor security assessments? We help you understand regulatory requirements, identify gaps in your current controls, and build a practical roadmap to achieve compliance. Our guidance is tailored to your industry and organizational context.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="group rounded-lg overflow-hidden bg-white border border-border hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/p8sNjDW0k5T66X8g3MmIMe/sandbox/00VGmFWafLtKw3gql5DSiP-img-4_1771452147000_na1fn_cmFuc29td2FyZS1wcm90ZWN0aW9u.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDhzTmpEVzBrNVQ2Nlg4ZzNNbUlNZS9zYW5kYm94LzAwVkdtRldhZkx0S3czZ3FsNURTaVAtaW1nLTRfMTc3MTQ1MjE0NzAwMF9uYTFmbl9jbUZ1YzI5dGQyRnlaUzF3Y201MFpXTjBhVzl1LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=sx-92~0XzoJHAi~Vsi0j96JFtEzz5mxBMs4WTCInEMx1WDiLy~YD~BcbyO6Q9ir8P~leJWUf1p5OZvgg~RltB0qhnYstPqXymcxKfyBitjYw9L3Lgl~ZU0PsgMULwc5RwveFUJIGwsVViK3OsM7N22iqJPB-YgF8yF5RedCGBZrqRx8CGbNpodiH0UvAt5~XSXAmAQ-PmOt2SuEa4lVvV0lzn-wLWF2mJVJOlVZWPy4CyAYIrlgUbS6z937kUbJ~MI0MM3M5Tfx8oQVR-dfa9F-7pWiDrn-~lVon~uXO38euTqG7bVbKJ3Pwn2qQrFoO3EDrnIAYCINB5XQsUkjgZA__"
                  alt="Ransomware & Business Continuity Review"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Ransomware & Business Continuity Review</h3>
                <p className="text-foreground/75 leading-relaxed">
                  Ransomware threats are evolving rapidly. We evaluate your backup strategies, disaster recovery capabilities, incident response readiness, and business continuity plans. Our assessment identifies gaps and provides recommendations to minimize downtime and operational disruption in the event of a security incident.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Who We Serve</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl">We work with organizations across industries, from healthcare to SaaS, that are serious about security</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Healthcare providers & medical practices",
              "Professional services firms (law, accounting, finance)",
              "Small to mid-sized businesses (10–250 employees)",
              "SaaS & technology startups",
              "Organizations preparing for audits",
              "Organizations preparing for security reviews"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 rounded-lg bg-white border border-border hover:border-accent transition-colors">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-foreground font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="approach" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Approach</h2>
          <p className="text-lg text-foreground/70 mb-16 max-w-2xl">A structured, evidence-based methodology designed for clarity and actionability</p>

          {/* Process Visualization */}
          <div className="mb-16 hidden lg:block">
            <img 
              src="https://private-us-east-1.manuscdn.com/sessionFile/p8sNjDW0k5T66X8g3MmIMe/sandbox/P6ptKInKyJ0OYPJmI7AdgK-img-3_1771388764000_na1fn_Y2V5cnZhLWFwcHJvYWNoLXZpc3VhbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvcDhzTmpEVzBrNVQ2Nlg4ZzNNbUlNZS9zYW5kYm94L1A2cHRLSW5LeUowT1lQSm1JN0FkZ0staW1nLTNfMTc3MTM4ODc2NDAwMF9uYTFmbl9ZMlY1Y25aaExXRndjSEp2WVdOb0xYWnBjM1ZoYkEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PWyjgyShlgGTE9~en7psnOLHsR-dyHMEx08cHN1P--hUfcCZE41nGy95mgvzm4hD4F9B4CVK-IsVbI~RijBruHIHFcO5vFXrqiLGitjNgiioLBfuTYTfAzLEkLD8OqAf8WOzJQBaoqU96rZgS4geKHdcIW4D7sTNaDCK1kZ235NwkhC1rxCMRTtdh9QIengRYVwhf6OMcQ-Zl4KA1badad7WiBvJVPgwmYX1x6QrKaMu2h42h~Aq0Kj-1F6OqvAaDg2oX1D6p4eB4~6ANtdfi1MH0Q6zrENgKlnQs1h8weAcI7b7XAlnKnSiof4rnojuTs~hkNbqJbWcbY7T-Hutqg__"
              alt="Our Approach Process"
              className="w-full h-auto"
            />
          </div>

          {/* Text Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">1</div>
              <h3 className="text-2xl font-bold text-primary">Discovery & Scoping</h3>
              <p className="text-foreground/75">Understand your business operations, technology stack, and risk priorities.</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">2</div>
              <h3 className="text-2xl font-bold text-primary">Structured Assessment</h3>
              <p className="text-foreground/75">Evidence-based evaluation of controls, configurations, and documentation.</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">3</div>
              <h3 className="text-2xl font-bold text-primary">Executive Report & Plan</h3>
              <p className="text-foreground/75">Clear findings, risk ratings, and prioritized action steps tailored to your environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ceyrva Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Why Ceyrva</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl">What sets us apart</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {[
              "Clear, business-focused reporting",
              "Practical remediation guidance — not just findings",
              "Confidential and structured engagements",
              "Designed for growing organizations, not enterprise overhead",
              "Flexible advisory model that scales with your needs"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 rounded-lg bg-white border border-border">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-foreground font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Consultation Section */}
      <section id="consultation" className="py-20 lg:py-28 bg-white">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Request a Consultation</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Complete the form below and a member of Ceyrva will respond within one business day. All inquiries are handled confidentially.
          </p>

          {/* Secure Consultation Form */}
          <div className="bg-white rounded-lg border border-border p-8 mb-8">
            {/* Security Notice */}
            <div className="mb-8 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-700">
                <strong>🔒 Secure Connection:</strong> Your information is encrypted with SSL/TLS and will be protected according to our Privacy Policy.
              </p>
            </div>

            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitSuccess 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <p className="font-semibold">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setFormErrors({});
              
              // Validate form
              const errors = validateConsultationForm(formData);
              if (errors.length > 0) {
                const errorMap: { [key: string]: string } = {};
                errors.forEach(err => {
                  errorMap[err.field] = err.message;
                });
                setFormErrors(errorMap);
                setIsSubmitting(false);
                return;
              }
              
              // Submit form
              const result = await submitConsultationForm(formData);
              setSubmitSuccess(result.success);
              setSubmitMessage(result.message);
              
              if (result.success) {
                setFormData({ fullName: '', company: '', email: '', phone: '', message: '' });
              }
              
              setIsSubmitting(false);
            }} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    formErrors.fullName ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Your name" 
                />
                {formErrors.fullName && <p className="text-red-600 text-sm mt-1">{formErrors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Company *</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    formErrors.company ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Your company" 
                />
                {formErrors.company && <p className="text-red-600 text-sm mt-1">{formErrors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    formErrors.email ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="your@email.com" 
                />
                {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone *</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    formErrors.phone ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="(555) 123-4567" 
                />
                {formErrors.phone && <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tell us about your organization *</label>
                <textarea 
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    formErrors.message ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="What security challenges are you facing?" 
                />
                {formErrors.message && <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>}
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-foreground/70">
                <strong>Email:</strong> <a href="mailto:adam@ceyrva.com" className="text-accent hover:underline">adam@ceyrva.com</a>
              </p>
            </div>
            
            {/* Security Badges */}
            <SecurityBadge />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/ceyrva-logo-shield.png" alt="Ceyrva Logo" className="h-8 w-8" />
                <h3 className="text-2xl font-bold">Ceyrva</h3>
              </div>
              <p className="text-white/80">Cybersecurity & Risk Advisory</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <a href="mailto:adam@ceyrva.com" className="text-white/80 hover:text-white transition-colors">
                adam@ceyrva.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <a href="/privacy-policy" className="text-white/80 hover:text-white transition-colors block mb-2">Privacy Policy</a>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex justify-center gap-6 mb-8">
              {/* LinkedIn - Update URL when ready */}
              <a href="#" title="LinkedIn" className="text-white/70 hover:text-accent transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              {/* Facebook - Update URL when ready */}
              <a href="#" title="Facebook" className="text-white/70 hover:text-accent transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              {/* Instagram - Update URL when ready */}
              <a href="#" title="Instagram" className="text-white/70 hover:text-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              {/* Twitter - Update URL when ready */}
              <a href="#" title="Twitter" className="text-white/70 hover:text-accent transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              {/* YouTube - Update URL when ready */}
              <a href="#" title="YouTube" className="text-white/70 hover:text-accent transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="text-center text-white/70">
              <p>© 2026 Ceyrva. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
