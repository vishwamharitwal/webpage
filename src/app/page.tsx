"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, CheckCircle, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

import ConstellationGrid from "@/components/ui/constellation-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { MagneticButton } from "@/components/ui/magnetic-button";

const heroTexts = [
  "predictable growth.",
  "more qualified leads.",
  "higher ROI.",
  "market dominance."
];

const services = [
  { num: "01", title: "Web Architecture & Development", desc: "Fast, bespoke digital experiences designed with intentional user pathways, modern development standards, and seamless CRM integrations.", outcome: "Lower bounce rates, higher on-site conversion, and a commanding market presence." },
  { num: "02", title: "Strategic Brand Identity", desc: "Cohesive visual and verbal brand systems that articulate your true market value across every customer touchpoint.", outcome: "Differentiated market positioning that eliminates price resistance and builds enterprise equity." },
  { num: "03", title: "Performance Marketing", desc: "Data-backed media buying on Meta, Google, and LinkedIn with continuous testing of ad creative, audiences, and landing pages.", outcome: "Predictable customer acquisition cost (CAC) and scalable return on ad spend (ROAS)." },
  { num: "04", title: "Content Production & Media", desc: "High-fidelity storytelling that builds category authority. Intentional video, photography, and written assets built to educate prospects.", outcome: "Shorter sales cycles and an evergreen library of conversion assets." },
  { num: "05", title: "Social & Brand Distribution", desc: "Systematic channel management that engages your target decision-makers, turning passive audiences into active brand advocates.", outcome: "Compound organic visibility without continuous media spend." },
  { num: "06", title: "Pipeline & B2B Lead Gen", desc: "Integrated multi-channel funnels and precision outreach systems designed to fill your sales pipeline with qualified decision-makers.", outcome: "A steady, forecastable flow of sales-ready opportunities." },
  { num: "07", title: "AI & Marketing Automation", desc: "Custom automations for lead routing, automated nurture flows, and operational workflows that eliminate human error.", outcome: "Instant response times, reduced operational overhead, and higher lead-to-close rates." }
];

const faqs = [
  { q: "How is MarketiX Media different from a traditional marketing agency?", a: "Traditional agencies sell individual activities. MarketiX Media operates as a growth partner. We build integrated systems that connect your branding, digital infrastructure, paid acquisition, and automation into a unified engine with clear revenue objectives." },
  { q: "What size business do you work with?", a: "We partner with ambitious founders, directors, and executives who have established product-market fit and are ready to systematically scale their customer acquisition. Our clients typically range from scaling local market leaders to established regional enterprises." },
  { q: "How quickly can we expect to see results?", a: "Infrastructure and branding projects typically take 3 to 6 weeks from kickoff to deployment. For performance marketing and acquisition funnels, baseline data and initial lead flow are established within the first 14–30 days of campaign launch, followed by continuous optimization." },
  { q: "Do you work on long-term retainers or project-based scopes?", a: "Both. We build core infrastructure (websites, brand identities, automated funnels) on milestone-based project scopes. For ongoing scaling, performance marketing, and continuous optimization, we operate on dedicated monthly growth partnerships." },
  { q: "Will our team have direct access to your strategists?", a: "Yes. We believe in clear communication. You will have a dedicated Slack/communication channel with direct access to your lead strategist, designers, and media buyers, alongside scheduled bi-weekly strategy reviews." },
  { q: "How do you measure and report success?", a: "We track metrics that tie directly to your bottom line: Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), Qualified Pipeline Value, and Conversion Rate. You receive access to a live, transparent dashboard tracking performance 24/7." },
  { q: "Do we need to provide all the content and assets?", a: "No. While we rely on your team for domain knowledge and historical insights, our in-house team handles copywriting, art direction, creative production, and technical architecture from start to finish." },
  { q: "What does the onboarding process look like?", a: "Once you complete your initial discovery call and approve the scope of work, we initiate a 7-day deep discovery sprint. We gather access, align on business KPIs, audit existing assets, and immediately begin strategic execution." }
];

const differences = [
  { t: "Systems Over Silos", d: "We align brand identity, performance media, web engineering, and sales automation into one cohesive architecture." },
  { t: "Outcome-First Engineering", d: "We measure success by pipeline volume, customer acquisition velocity, and commercial growth—not impressions or clicks." },
  { t: "Institutional Speed", d: "Agile sprints and a dedicated in-house team ensure your go-to-market assets launch in weeks, not quarters." },
  { t: "Modern Tech Stack", d: "Built using high-performance frameworks, modern CMS platforms, and advanced automation infrastructure." },
  { t: "Radical Transparency", d: "Clear reporting dashboards, direct communication channels, and bi-weekly strategic reviews. No hidden fees or black-box retainers." },
  { t: "Senior Attention", d: "You work directly with strategic minds and technical operators who understand business models, margins, and market dynamics." }
];

const methodology = [
  { p: "Phase 01: Discover", h: "We diagnose before we prescribe.", d: "We conduct a rigorous audit of your existing market position, unit economics, conversion bottlenecks, competitors, and growth objectives." },
  { p: "Phase 02: Strategize", h: "We architect your growth roadmap.", d: "We map user journeys, design conversion funnels, define media budgets, establish performance benchmarks, and plan channel strategy." },
  { p: "Phase 03: Build & Deploy", h: "We engineer the growth assets.", d: "Our team crafts brand identities, develops custom digital platforms, produces ad creative, builds automations, and launches paid acquisition campaigns." },
  { p: "Phase 04: Optimize & Scale", h: "We compound performance.", d: "Through multivariate testing, audience refinement, conversion rate optimization (CRO), and system automation, we continuously improve ROI." }
];

const sectors = [
  { s: "Real Estate & Development", f: "High-intent lead generation, project launch branding, and digital showrooms." },
  { s: "Healthcare & Clinics", f: "Patient acquisition funnels, local search dominance, and trust-first brand platforms." },
  { s: "Manufacturing & B2B", f: "Inbound lead systems, institutional website platforms, and category positioning." },
  { s: "Education & Institutes", f: "Seasonal student enrollment campaigns, automated nurture pipelines, and brand equity." },
  { s: "Hospitality & Restaurants", f: "Brand discovery, local footfall campaigns, and automated reservation funnels." },
  { s: "Professional Services", f: "Authority positioning, organic distribution, and high-ticket client acquisition." }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(preloaderTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030407]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold tracking-tighter text-white flex items-baseline"
            >
              Marketi<span className="text-4xl md:text-5xl text-accent -mx-[2px]">X</span>&nbsp;Media<span className="text-accent">.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col min-h-screen overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-44 pb-32 flex flex-col items-center text-center">
        <ConstellationGrid />

        <div className="container mx-auto px-6 md:px-12 z-10 pointer-events-none relative">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl z-10 mx-auto pointer-events-auto">
            <motion.p variants={fadeIn} className="text-accent font-semibold tracking-wider uppercase mb-6 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              BUILT FOR SCALE
            </motion.p>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
              Businesses don’t need more marketing.<br />
              They need{" "}
              <span className="text-secondary/60 relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroTextIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 top-0 whitespace-nowrap text-accent"
                  >
                    {heroTexts[heroTextIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Invisible placeholder to maintain width */}
                <span className="opacity-0 pointer-events-none">market dominance.</span>
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-secondary/70 mb-12 max-w-3xl mx-auto leading-relaxed mt-4">
              We build integrated growth systems—combining brand strategy, high-conversion digital platforms, performance marketing, and AI automation. One dedicated growth partner. Zero operational friction.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <MagneticButton
                href="https://wa.me/917340021807?text=Hi%20MarketiX%20Media,%20I'm%20interested%20in%20booking%20a%20Strategy%20Session."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-blue-700 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 block"
              >
                <span className="relative z-10 flex items-center gap-2">Book a Strategy Session <ArrowRight size={20} /></span>
              </MagneticButton>
              <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 border border-white/10 backdrop-blur-sm">
                Explore the Growth System <ArrowDown size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none"></div>
      </section>

      {/* 2. TRUST & STANDARDS */}
      <section className="border-y border-white/5 bg-[#0d121c] py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 md:px-12"
        >
          <div className="max-w-3xl mb-16">
            <p className="text-accent font-semibold uppercase tracking-wider mb-4">THE STANDARD</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built on precision. Driven by business outcomes.</h2>
            <p className="text-xl text-secondary/70">We don’t rely on vanity metrics, inflated case studies, or buzzwords. We earn trust through strategic clarity, institutional-grade execution, and clear accountability.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Single-Point Accountability</h3>
              <p className="text-secondary/60 leading-relaxed">Strategy, creative, and technical engineering under one roof.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Commercial Focus</h3>
              <p className="text-secondary/60 leading-relaxed">Every campaign, design, and line of code is tied directly to pipeline and revenue.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Senior In-House Execution</h3>
              <p className="text-secondary/60 leading-relaxed">Your business is built by experienced practitioners, never outsourced to unvetted subcontractors.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. ABOUT MARKETIX MEDIA */}
      <section className="bg-white text-slate-900 py-32">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <p className="text-accent font-semibold uppercase tracking-wider mb-4">OUR POSITIONING</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Marketing generates noise.<br />Systems generate revenue.</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 space-y-6 text-lg text-slate-600"
          >
            <p>Most ambitious businesses stall for a simple reason: fragmentation. They hire one agency for web design, another for ad management, and individual freelancers for content. The result is brand dilution, broken tracking, and wasted capital.</p>
            <p className="text-slate-900 font-medium">MarketiX Media operates as your embedded growth engine. We eliminate the chaos between brand perception and performance marketing, engineering cohesive systems that turn cold attention into long-term commercial value.</p>
          </motion.div>
        </div>
      </section>

      {/* 4. THE GROWTH SUITE */}
      <section id="services" className="bg-[#0a0f18] py-32 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20">
            <p className="text-accent font-semibold uppercase tracking-wider mb-4">THE GROWTH SUITE</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Integrated Services</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full"
              >
                <SpotlightCard className="h-full p-8 group">
                  <span className="text-accent/50 font-mono text-sm mb-4 block">{s.num}</span>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="text-secondary/60 mb-6 leading-relaxed">{s.desc}</p>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl mt-auto">
                    <span className="text-xs text-secondary/40 uppercase tracking-wider font-semibold block mb-1">Business Outcome</span>
                    <p className="text-sm font-medium text-white">{s.outcome}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY MARKETIX MEDIA & 6. OUR APPROACH */}
      <section id="approach" className="bg-slate-50 text-slate-900 py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-24">

            {/* Why Us */}
            <div>
              <p className="text-accent font-semibold uppercase tracking-wider mb-4">THE DIFFERENCE</p>
              <h2 className="text-4xl font-bold tracking-tight mb-12">Why modern operators choose a growth partner over a traditional agency.</h2>

              <div className="space-y-10">
                {differences.map((item, i) => (
                  <div key={i}>
                    <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                      <span className="text-accent text-sm">{(i + 1).toString().padStart(2, '0')}</span>
                      {item.t}
                    </h4>
                    <p className="text-slate-600 pl-8">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div>
              <div className="sticky top-32 bg-white border border-slate-200 shadow-xl p-10 rounded-3xl">
                <p className="text-accent font-semibold uppercase tracking-wider mb-4">THE METHODOLOGY</p>
                <h2 className="text-3xl font-bold tracking-tight mb-12">Four steps to predictable scale.</h2>

                <div className="relative border-l border-slate-200 pl-8 space-y-12">
                  {methodology.map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-white border-2 border-accent"></div>
                      <span className="text-xs text-accent uppercase tracking-wider font-semibold mb-2 block">{step.p}</span>
                      <h4 className="text-lg font-bold mb-3">{step.h}</h4>
                      <p className="text-slate-600 text-sm">{step.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO & 8. INDUSTRIES */}
      <section id="portfolio" className="bg-[#0a0f18] py-32 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <p className="text-accent font-semibold uppercase tracking-wider mb-4">PORTFOLIO</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Systems in action.<br />Results by design.</h2>
              <p className="text-secondary/60 text-lg">A selection of digital platforms, brand identities, and performance campaigns engineered for ambitious organizations across diverse markets.</p>
            </div>
            <a href="#" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
              View Case Studies <ArrowRight size={16} />
            </a>
          </div>

          <div className="mb-32">
            <div className="w-full h-96 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-8 overflow-hidden group relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-secondary/40 font-mono">[ Portfolio Highlight Reel / Case Study Visuals ]</p>
            </div>
          </div>

          {/* Industries */}
          <div id="industries">
            <p className="text-accent font-semibold uppercase tracking-wider mb-4">SECTOR EXPERTISE</p>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Built for complex, high-value business models.</h2>
            <p className="text-secondary/60 text-lg max-w-2xl mb-16">Our frameworks adapt to organizations where customer lifetime value is high, trust is paramount, and sales cycles require precision.</p>

            <div className="grid md:grid-cols-2 gap-6">
              {sectors.map((ind, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <SpotlightCard className="p-8 h-full">
                    <h4 className="text-xl font-bold mb-3">{ind.s}</h4>
                    <p className="text-secondary/60 leading-relaxed">{ind.f}</p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. FAQS */}
      <section className="bg-white text-slate-900 py-32 border-t border-slate-100">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <p className="text-accent font-semibold uppercase tracking-wider mb-4 text-center">FAQS</p>
          <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">Direct answers to critical questions.</h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-slate-100 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-lg pr-8">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform ${openFaq === i ? "rotate-180 text-accent" : "text-slate-400"}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-200 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section id="contact" className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-accent/10 rounded-full blur-[100px] -z-10"></div>
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <p className="text-accent font-semibold uppercase tracking-wider mb-4">START THE CONVERSATION</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Ready to replace marketing noise with predictable growth?</h2>
          <p className="text-xl text-secondary/70 mb-12 leading-relaxed">
            Schedule a 30-minute growth assessment with our senior team. We’ll analyze your current acquisition channels, identify conversion leaks, and outline an actionable growth architecture for your business.
          </p>
          <MagneticButton
            href="https://wa.me/917340021807?text=Hi%20MarketiX%20Media,%20I'm%20interested%20in%20booking%20a%20Strategy%20Session."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-blue-700 text-white font-bold rounded-full transition-colors mb-6"
          >
            <span className="relative z-10 flex items-center gap-2">Schedule Your Strategy Session <ArrowRight size={20} /></span>
          </MagneticButton>
          <p className="text-sm text-secondary/40">No aggressive sales tactics. Direct, strategic analysis with actionable takeaways.</p>
        </div>
      </section>

    </main>
    </>
  );
}
