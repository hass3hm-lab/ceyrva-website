import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Cloud, FileText, AlertTriangle, Linkedin, Facebook, Instagram, Twitter, Youtube, Lock, ClipboardList, Users, AlertCircle, BarChart3, Zap } from "lucide-react";
import { useState } from "react";
import { submitConsultationForm, validateConsultationForm } from "@/lib/formHandler";

/**
 * Ceyrva Homepage - One-Page Blueprint
 * 
 * Comprehensive cybersecurity & compliance advisory for healthcare and SMBs
 * Focus: Practical, founder-led, HIPAA-focused, ransomware-ready
 */

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    industry: '',
    email: '',
    phone: '',
    employeeCount: '',
    primaryNeed: [] as string[],
    message: '',
    preferredContact: 'Email'
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
            <a href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">Pricing</a>
            <a href="#consultation" className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-white to-blue-50">
        <div className="container py-20 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight mb-4">
              Cybersecurity & Compliance Support for Healthcare and Growing Businesses
            </h1>
            
            <p className="text-2xl font-semibold text-secondary mb-6">
              HIPAA Security Rule support, risk assessments, and practical security programs—built for teams that need to meet requirements, reduce ransomware risk, and stay operational.
            </p>

            <p className="text-lg text-foreground/70 mb-8 max-w-2xl">
              <strong>Founder-led engagements</strong> • <strong>Clear executive reporting</strong> • <strong>Confidential handling of sensitive environments</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg w-fit"
                onClick={() => {
                  document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a 15-Minute Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg w-fit"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Trusted, Structured, and Audit-Friendly</h2>
          
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {/* Credentials */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Expertise & Tools</h3>
              <p className="text-foreground/75 mb-4">
                <strong>Platforms:</strong> Microsoft 365 • Google Workspace • Windows/macOS • EDR/AV • Backup platforms
              </p>
              <p className="text-foreground/75">
                <strong>Focus:</strong> HIPAA Security Rule • Risk analysis • Compliance documentation • Ransomware readiness
              </p>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Industries Served</h3>
              <ul className="space-y-2 text-foreground/75">
                <li>✓ Healthcare (clinics, dental, therapy, home health, billing)</li>
                <li>✓ Professional services (law, accounting, finance, real estate)</li>
                <li>✓ SMBs (10–250 employees, cloud-first, multi-location)</li>
              </ul>
            </div>

            {/* Who I Help */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Who I Help</h3>
              <p className="text-foreground/75 leading-relaxed">
                If you accept sensitive data, use cloud email, have staff clicking links, or depend on uptime—you need baseline controls and documentation. I help you build it fast, prove it, and maintain it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">What's Driving Risk (and Fines) Right Now</h2>
          <p className="text-lg text-foreground/70 mb-16 max-w-2xl">Common security and compliance challenges we solve</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Healthcare Problems */}
            <div className="rounded-lg border border-border bg-white p-8">
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-accent" />
                Healthcare (HIPAA) Pain Points
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">You need a HIPAA Security Risk Analysis (required) and don't have one you trust</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">You're missing policies, training, access controls, device encryption, or audit evidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">Vendors ask for security documentation (BAAs, questionnaires, safeguards) and you're scrambling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">Ransomware would stop operations—backups and response steps aren't verified</span>
                </li>
              </ul>
            </div>

            {/* General Business Problems */}
            <div className="rounded-lg border border-border bg-white p-8">
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-accent" />
                General Business Pain Points
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">MFA isn't consistent; admin access isn't controlled; phishing keeps getting through</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">Backups exist, but restore readiness is unknown</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">You need to satisfy customer/vendor security questionnaires to win deals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/75">You don't have an incident response plan—only "we'll figure it out"</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-foreground font-semibold">
              <strong>Outcome:</strong> A clear plan, documented evidence, and prioritized fixes—so you can meet requirements and reduce downtime risk.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Services (Practical, Founder-Led)</h2>
          <p className="text-lg text-foreground/70 mb-16 max-w-2xl">All services are designed to be delivered by a solo founder in the first 90 days, with specialized work coordinated through trusted partners.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                num: 1,
                title: "HIPAA Security Rule Support",
                desc: "Build or improve the safeguards HIPAA expects: access controls, device security, training, incident response, vendor management, and documentation.",
                deliverables: "HIPAA safeguard checklist, evidence tracker, gaps + actions list"
              },
              {
                num: 2,
                title: "HIPAA Security Risk Assessment",
                desc: "Structured risk analysis aligned to HIPAA Security Rule, including systems, workflows, and third-party access.",
                deliverables: "Risk register, severity ratings, remediation roadmap, leadership summary"
              },
              {
                num: 3,
                title: "Policies & Procedures Pack",
                desc: "Right-sized policies your team will actually follow (acceptable use, access, backups, incident response, vendor management, etc.).",
                deliverables: "Policy set + adoption checklist"
              },
              {
                num: 4,
                title: "Security Awareness Training",
                desc: "Monthly or quarterly training + tracking to reduce phishing and credential theft.",
                deliverables: "Training plan, completion records, short quizzes"
              },
              {
                num: 5,
                title: "Vulnerability Scanning Coordination",
                desc: "Coordinate scanning with an approved tool/provider, validate scope, triage results, and produce a fix plan.",
                deliverables: "Prioritized vulnerability list, patch plan, retest checklist"
              },
              {
                num: 6,
                title: "Basic Incident Response Plan",
                desc: "A practical plan for who does what, first 24 hours checklist, vendor contacts, and communication steps.",
                deliverables: "IR playbook + tabletop exercise outline"
              },
              {
                num: 7,
                title: "Vendor & Security Questionnaires",
                desc: "Help you respond to customer/vendor security questionnaires with consistent, accurate answers and evidence.",
                deliverables: "Response library + evidence links"
              },
              {
                num: 8,
                title: "Compliance Readiness",
                desc: "For SMBs that need baseline controls and documentation for buyers/partners (HIPAA + SOC 2-Lite).",
                deliverables: "Control checklist, evidence map, readiness scorecard"
              },
              {
                num: 9,
                title: "Phishing Simulations",
                desc: "Run simple simulations to measure improvement over time.",
                deliverables: "Results + training follow-ups"
              },
              {
                num: 10,
                title: "Ongoing Monthly Support",
                desc: "Lightweight maintenance so you don't slide backwards. Includes monthly check-ins, ticket support, evidence upkeep, training cadence, quarterly mini-reviews.",
                deliverables: "Ongoing advisory, documentation updates, compliance tracking"
              }
            ].map((service) => (
              <div key={service.num} className="rounded-lg border border-border bg-white p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">
                    {service.num}
                  </div>
                  <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                </div>
                <p className="text-foreground/75 mb-4 leading-relaxed">{service.desc}</p>
                <p className="text-sm text-foreground/60">
                  <strong>Deliverables:</strong> {service.deliverables}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg"
              onClick={() => {
                document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book a 15-Minute Call to Confirm Scope
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">How It Works</h2>
          <p className="text-lg text-foreground/70 text-center mb-16 max-w-2xl mx-auto">A simple, transparent process designed to deliver results quickly</p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Quick Discovery Call",
                desc: "Confirm your environment, compliance drivers (HIPAA/vendor), and urgency."
              },
              {
                step: 2,
                title: "Scope + Fixed Deliverables",
                desc: "You get a clear scope, timeline, and what 'done' looks like."
              },
              {
                step: 3,
                title: "Assessment & Evidence Collection",
                desc: "Review configurations, policies, workflows, and documentation (non-disruptive)."
              },
              {
                step: 4,
                title: "Executive Report + 90-Day Plan",
                desc: "Prioritized actions, risk ratings, and a practical remediation roadmap."
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-foreground/75">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-accent/10 border border-accent/20 text-center">
            <p className="text-foreground font-semibold">
              <strong>Optional:</strong> Ongoing monthly support to keep controls and documentation current.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Simple Pricing (No Surprises)</h2>
          <p className="text-lg text-foreground/70 mb-16 max-w-2xl">
            Final pricing depends on employee count, systems in scope, and compliance needs. Most SMB engagements fit one of these:
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {[
              {
                name: "Starter",
                subtitle: "Baseline Readiness",
                price: "$1,500–$3,000",
                features: [
                  "Quick posture review (identity/email/backups)",
                  "Priority fixes list + 30-day plan",
                  "Basic policy starter pack"
                ]
              },
              {
                name: "Compliance",
                subtitle: "HIPAA / Audit-Ready",
                price: "$3,500–$8,500",
                highlight: true,
                features: [
                  "HIPAA risk analysis + risk register",
                  "Policies/procedures pack",
                  "Evidence tracker + remediation roadmap"
                ]
              },
              {
                name: "Resilience",
                subtitle: "Ransomware & Continuity",
                price: "$5,000–$12,000",
                features: [
                  "Backup & restore readiness review",
                  "Incident response plan + tabletop outline",
                  "Hardening priorities + executive report"
                ]
              },
              {
                name: "Ongoing",
                subtitle: "Monthly Support",
                price: "$750–$2,500/month",
                features: [
                  "Monthly check-ins + documentation upkeep",
                  "Training cadence + advisory support",
                  "Quarterly mini-review"
                ]
              }
            ].map((pkg, idx) => (
              <div 
                key={idx} 
                className={`rounded-lg border-2 p-8 ${
                  pkg.highlight 
                    ? 'border-accent bg-accent/5' 
                    : 'border-border bg-white'
                } hover:shadow-lg transition-shadow`}
              >
                <h3 className="text-2xl font-bold text-primary mb-1">{pkg.name}</h3>
                <p className="text-sm text-foreground/70 mb-4">{pkg.subtitle}</p>
                <p className="text-3xl font-bold text-accent mb-6">{pkg.price}</p>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/75">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg"
              onClick={() => {
                document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book a 15-Minute Call to Get a Firm Quote
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">About Ceyrva</h2>
          
          <p className="text-lg text-foreground/75 mb-8 leading-relaxed">
            I'm a founder-led cybersecurity and compliance advisor focused on practical security that stands up to real-world risk and audits. My approach is simple: reduce risk fast, document what matters, and leave you with a plan your team can execute. When specialized work is needed (e.g., advanced testing), I coordinate trusted contractors while remaining your single point of accountability.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { title: "Clarity over jargon", icon: "📝" },
              { title: "Evidence over opinions", icon: "✓" },
              { title: "Practical over perfect", icon: "⚙️" },
              { title: "Confidential by default", icon: "🔒" }
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{value.icon}</div>
                <p className="font-semibold text-foreground">{value.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-lg text-foreground/70 text-center mb-16">Common questions about our services and approach</p>

          <div className="space-y-6">
            {[
              {
                q: "Is a HIPAA risk analysis mandatory?",
                a: "Healthcare organizations must implement HIPAA Security Rule safeguards and perform ongoing risk management. A documented risk analysis is a core expectation in compliance programs."
              },
              {
                q: "Do you need access to our systems?",
                a: "Often yes, but access is scoped and time-boxed. We can start with documentation and admin screenshots/log exports if you prefer."
              },
              {
                q: "Will this disrupt operations?",
                a: "No. My work is designed to be non-disruptive. Any testing that could impact systems is discussed and approved in advance."
              },
              {
                q: "Do you provide 'penetration testing'?",
                a: "Not as a default. If you need specialized testing, I can coordinate it with qualified partners and integrate results into your remediation plan."
              },
              {
                q: "How long does an assessment take?",
                a: "Most SMB engagements take 1–2 weeks depending on responsiveness and scope."
              },
              {
                q: "What do we receive at the end?",
                a: "An executive summary, findings with risk ratings, evidence tracker (if compliance-focused), and a prioritized remediation plan."
              },
              {
                q: "Can you help with vendor questionnaires?",
                a: "Yes—this is common. We build a reusable response library and evidence pack to save time."
              },
              {
                q: "Do you work only with healthcare?",
                a: "No. Healthcare is a specialty, but the same security fundamentals apply across SMBs—identity, email security, backups, policies, and training."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-border rounded-lg p-6 hover:border-accent transition-colors">
                <h3 className="text-lg font-bold text-primary mb-3">{faq.q}</h3>
                <p className="text-foreground/75 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="py-20 lg:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Request a Consultation</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Tell me what you're trying to achieve (HIPAA readiness, ransomware risk reduction, vendor requirements). I respond within one business day.
          </p>

          <div className="bg-white rounded-lg border border-border p-8">
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
              
              const result = await submitConsultationForm(formData);
              setSubmitSuccess(result.success);
              setSubmitMessage(result.message);
              
              if (result.success) {
                setFormData({ 
                  fullName: '', company: '', industry: '', email: '', phone: '', 
                  employeeCount: '', primaryNeed: [], message: '', preferredContact: 'Email' 
                });
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
                <label className="block text-sm font-semibold text-foreground mb-2">Company Name *</label>
                <input 
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    formErrors.company ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Organization name"
                />
                {formErrors.company && <p className="text-red-600 text-sm mt-1">{formErrors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Industry</label>
                <select 
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select an industry</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Tech">Tech / SaaS</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Work Email *</label>
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
                <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Employee Count</label>
                <select 
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select range</option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-250">51–250</option>
                  <option value="250+">250+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">What do you need help with?</label>
                <div className="space-y-2">
                  {[
                    "HIPAA risk analysis",
                    "Policies & procedures",
                    "Security training",
                    "Incident response plan",
                    "Vendor questionnaires",
                    "Cloud security review",
                    "Ransomware readiness",
                    "Other"
                  ].map((need) => (
                    <label key={need} className="flex items-center gap-3">
                      <input 
                        type="checkbox"
                        checked={formData.primaryNeed.includes(need)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, primaryNeed: [...formData.primaryNeed, need] });
                          } else {
                            setFormData({ ...formData, primaryNeed: formData.primaryNeed.filter(n => n !== need) });
                          }
                        }}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-foreground">{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tell us more *</label>
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

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Preferred Contact Method</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio"
                      name="contact"
                      value="Email"
                      checked={formData.preferredContact === 'Email'}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio"
                      name="contact"
                      value="Phone"
                      checked={formData.preferredContact === 'Phone'}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground">Phone</span>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>🔒 Security Note:</strong> Please don't submit passwords or sensitive patient/payment data through the form.
                </p>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">What Happens Next</h3>
              <ul className="space-y-2 text-foreground/75">
                <li>✓ You'll get a reply within 1 business day</li>
                <li>✓ We schedule a 15-minute call</li>
                <li>✓ You receive a scope + price range (often same day)</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-foreground/70">
              <strong>Email:</strong> <a href="mailto:adam@ceyrva.com" className="text-accent hover:underline">adam@ceyrva.com</a>
            </p>
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
              <a href="#" title="LinkedIn" className="text-white/70 hover:text-accent transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" title="Facebook" className="text-white/70 hover:text-accent transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" title="Instagram" className="text-white/70 hover:text-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" title="Twitter" className="text-white/70 hover:text-accent transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
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
