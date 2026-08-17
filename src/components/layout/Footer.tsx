import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f18] py-16 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold tracking-tighter text-secondary mb-4">
            MarketiX Media<span className="text-accent">.</span>
          </h2>
          <p className="text-secondary/60 mb-6">
            Engineering growth systems for ambitious businesses.
          </p>
          <p className="text-secondary/40 text-sm">Jaipur, Rajasthan, India.</p>
        </div>

        <div>
          <h3 className="font-semibold text-secondary mb-4">Growth Suite</h3>
          <ul className="space-y-3">
            <li><Link href="#services" className="text-secondary/60 hover:text-accent transition-colors">Web Architecture</Link></li>
            <li><Link href="#services" className="text-secondary/60 hover:text-accent transition-colors">Brand Identity</Link></li>
            <li><Link href="#services" className="text-secondary/60 hover:text-accent transition-colors">Performance Media</Link></li>
            <li><Link href="#services" className="text-secondary/60 hover:text-accent transition-colors">Content & Media</Link></li>
            <li><Link href="#services" className="text-secondary/60 hover:text-accent transition-colors">AI Automation</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-secondary mb-4">Company</h3>
          <ul className="space-y-3">
            <li><Link href="#approach" className="text-secondary/60 hover:text-accent transition-colors">Our Approach</Link></li>
            <li><Link href="#portfolio" className="text-secondary/60 hover:text-accent transition-colors">Featured Work</Link></li>
            <li><Link href="#industries" className="text-secondary/60 hover:text-accent transition-colors">Industries</Link></li>
            <li><Link href="https://wa.me/917340021807?text=Hi%20MarketiX%20Media,%20I'm%20interested%20in%20booking%20a%20Strategy%20Session." target="_blank" rel="noopener noreferrer" className="text-secondary/60 hover:text-accent transition-colors">Book a Call</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-secondary mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><Link href="#" className="text-secondary/60 hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-secondary/60 hover:text-accent transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-secondary/60 hover:text-accent transition-colors">Confidentiality</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-secondary/40">
        <p>© 2026 MarketiX Media. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for scale.</p>
      </div>
    </footer>
  );
}
