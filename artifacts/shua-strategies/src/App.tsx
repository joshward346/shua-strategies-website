import { type ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { ArrowUpRight, Check, Clock3, FileText, Instagram, Linkedin, Mail, Menu, MoveRight, ShieldCheck, Target, Users, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';

const CALENDLY_URL = 'https://calendly.com/josh-shuastrategies/15min';
const MCAT_STRATEGY_STRIPE_URL = 'https://buy.stripe.com/7sYdRb52taAfftb9oR08g01';
const MCAT_COACHING_STRIPE_URL = 'https://buy.stripe.com/dRm5kF9iJ4bR94NasV08g02';
const SECONDARY_SPRINT_STRIPE_URL = 'https://buy.stripe.com/4gM28tbqRfUz6WFeJb08g03';
const INTERVIEW_PREP_STRIPE_URL = 'https://buy.stripe.com/dRm00lbqR37NbcVbwZ08g04';
const FUTURE_PHYSICIAN_FORM_URL = 'https://forms.gle/in9YXos86zgdUPq17';
const CARS_GUIDE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdto8kRDV_AGEOO4u-73HK4YskwFXj6WzhGpg0yO2z344IBuw/viewform';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/mcat', label: 'MCAT' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/future-physician', label: 'Future Physician' },
  { href: '/results', label: 'Results' },
  { href: '/resources', label: 'Resources' },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const url = `https://shuastrategies.com${window.location.pathname === '/' ? '' : window.location.pathname}`;
    document.title = `${title} · Shua Strategies`;
    const tags: [string, string, string][] = [
      ['name', 'description', description],
      ['property', 'og:title', `${title} · Shua Strategies`],
      ['property', 'og:description', description],
      ['property', 'og:type', 'website'],
      ['property', 'og:url', url],
    ];
    tags.forEach(([attribute, key, content]) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description]);
}

function useScrollReset() {
  useLayoutEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target) {
      target.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
}

function useReveals() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return <span className="brand-lockup" data-testid="brand-logo">
    <img className="brand-monogram-image" src="/shua-strategies-monogram.png" alt="" aria-hidden="true" />
    <img className="brand-wordmark-image" src="/shua-strategies-wordmark.png" alt="Shua Strategies" />
  </span>;
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="container-wide">
        <div className="nav-inner">
          <Link href="/" className="brand-mark" data-testid="link-home-logo" onClick={() => setOpen(false)}><Logo /></Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
          </nav>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="nav-cta" data-testid="link-nav-book">Book a free 15-minute call <ArrowUpRight size={14} /></a>
          <button type="button" className="mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)} data-testid="button-mobile-navigation">{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {open && <nav className="mobile-panel" aria-label="Mobile navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="nav-link" onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="nav-cta" onClick={() => setOpen(false)} data-testid="link-mobile-book">Book a free 15-minute call <ArrowUpRight size={14} /></a>
        </nav>}
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="footer">
    <div className="container-wide">
      <div className="footer-grid">
        <div><Logo /><p className="footer-copy">Physician-led strategy for ambitious students building a thoughtful path to medicine.</p></div>
        <div><h3>Explore</h3><div className="footer-links">
          <Link href="/about" data-testid="link-footer-about">Meet Joshua</Link>
          <Link href="/mcat" data-testid="link-footer-mcat">MCAT strategy</Link>
          <Link href="/admissions" data-testid="link-footer-admissions">Admissions advising</Link>
          <Link href="/future-physician" data-testid="link-footer-future-physician">Future Physician</Link>
          <Link href="/results" data-testid="link-footer-results">Results</Link>
           <Link href="/resources" data-testid="link-footer-resources">Free resources</Link>
           <Link href="/book" data-testid="link-footer-book">Book a call</Link>
        </div></div>
        <div><h3>Stay close</h3><div className="footer-links">
          <a href="mailto:josh@shuastrategies.com" data-testid="link-footer-email"><Mail size={13} /> josh@shuastrategies.com</a>
          <a href="https://www.linkedin.com/company/shua-strategies" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin"><Linkedin size={13} /> Shua Strategies</a>
          <a href="https://www.instagram.com/shuastrategies/" target="_blank" rel="noreferrer" data-testid="link-footer-instagram"><Instagram size={13} /> Shua Strategies</a>
        </div></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Shua Strategies</span><span>Guiding the next generation of physicians.</span><span>GOOGLE ANALYTICS · META PIXEL PLACEHOLDERS</span></div>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  useScrollReset();
  useReveals();
  return <div className="site-shell page-enter"><Header />{children}<Footer /></div>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? 'light' : ''}`}>{children}</div>;
}

function CTA({ children = 'Book a free 15-minute call', href = CALENDLY_URL }: { children?: ReactNode; href?: string }) {
  if (href.startsWith('http')) {
    return <a href={href} target="_blank" rel="noreferrer" className="btn-primary" data-testid="link-primary-cta">{children}<ArrowUpRight size={15} /></a>;
  }
  return <Link href={href} className="btn-primary" data-testid="link-primary-cta">{children}<ArrowUpRight size={15} /></Link>;
}

function TrustStrip() {
  const items = [['MD', 'Washington University School of Medicine'], ['Cornell', 'Undergraduate foundation'], ['99th percentile', 'MCAT CARS score'], ['5+ years', 'Admissions advising & MCAT coaching']];
  return <section className="trust-strip" aria-label="Joshua Ward credentials"><div className="container-wide trust-grid">{items.map(([value, label], index) => <div className="trust-item reveal" key={value} data-testid={`text-trust-${index}`}><div className="trust-value">{value}</div><div className="trust-label">{label}</div></div>)}</div></section>;
}

function OfferRow({ number, name, price, copy, scope, action, href = '/book', externalHref }: { number: string; name: string; price: string; copy: string; scope: string; action: string; href?: string; externalHref?: string }) {
  return <article className="offer-row reveal" data-testid={`card-offer-${number}`}>
    <span className="offer-num">{number}</span>
    <div><h3 className="offer-name">{name}</h3><p className="offer-copy">{copy}</p></div>
    <p className="offer-scope">{scope}</p>
    <div className="offer-action"><p className="offer-price">{price}</p>{externalHref ? <a href={externalHref} target="_blank" rel="noreferrer" className="text-link" data-testid={`link-offer-${number}`}>{action} <ArrowUpRight size={14} /></a> : <Link href={href} className="text-link" data-testid={`link-offer-${number}`}>{action} <ArrowUpRight size={14} /></Link>}</div>
  </article>;
}

function Pathway({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return <section className="pathway"><div className="pathway-head"><div><div className="pathway-kicker">{kicker}</div><h2 className="pathway-title">{title}</h2></div></div>{children}</section>;
}

function CheckoutCTA({ href, action }: { href: string; action: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: 18 }} data-testid={`link-stripe-checkout-${action.toLowerCase().replaceAll(' ', '-')}`}>{action} <ArrowUpRight size={15} /></a>;
}

function EmailGate({ title, formUrl }: { title: string; formUrl?: string }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const slug = title.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-');
  if (formUrl) {
    return <div className="email-gate">
      <a href={formUrl} target="_blank" rel="noreferrer" className="btn-primary" data-testid={`link-resource-form-${slug}`}>Send it to me <ArrowUpRight size={14} /></a>
    </div>;
  }
  return sent ? <p className="form-message" data-testid={`status-resource-${slug}`}>It’s on its way. MailerLite delivery will be connected here.</p> : <div className="email-gate">
    <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSent(true); }}>
      <label className="sr-only" htmlFor={`email-${slug}`}>Email address</label>
      <input id={`email-${slug}`} className="field" type="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} data-testid={`input-resource-${slug}`} />
      <button className="btn-primary" type="submit" data-testid={`button-resource-submit-${slug}`}>Send it to me <ArrowUpRight size={14} /></button>
    </form>
    <p className="placeholder-note">MAILERLITE EMBED GOES HERE · replace this form with the approved embed</p>
  </div>;
}

function TimeSensitiveSupportContent() {
  return <>
    <div className="split-heading reveal"><Eyebrow>Time-sensitive support</Eyebrow><div><p className="manifesto">For the moments when timing is everything.</p><p className="section-intro">Two focused sprints for students moving through secondaries and interview invites on a tight calendar.</p></div></div>
    <div className="pathway">
      <OfferRow number="04" name="Secondary Essay Sprint" price="$1,000" copy="Up to 5 schools' secondary essays, fully reviewed and returned within 48 hours. Additional schools available at $200 each." scope="Up to 5 schools · 48-hour turnaround · additional schools $200 each" action="Book Your Secondary Sprint" externalHref={SECONDARY_SPRINT_STRIPE_URL} />
      <OfferRow number="05" name="Interview Prep Intensive" price="$750" copy="A prep conversation on interview strategy, followed by two recorded mock interviews with individualized feedback between sessions." scope="Strategy conversation · 2 recorded mock interviews · individualized feedback" action="Book Your Interview Prep" externalHref={INTERVIEW_PREP_STRIPE_URL} />
    </div>
  </>;
}

function Home() {
  usePageMeta('Strategy for the path to medicine', 'Physician-led MCAT coaching and medical school admissions advising from Joshua Ward, MD.');
  return <Shell><main>
    <section className="hero"><div className="container-wide hero-grid">
      <div className="hero-copy reveal"><Eyebrow>Physician-led strategy · high-touch advising</Eyebrow><h1 className="display-xl" style={{ marginTop: 23 }}>You probably don’t need <span className="accent-italic">more.</span></h1><p className="body-lg muted">You need a sharper way to use what you already have — and a trusted person who can see what is actually holding you back.</p><div className="hero-actions"><CTA>Book a free 15-minute call</CTA><Link href="/mcat" className="btn-secondary" data-testid="link-hero-mcat">Explore MCAT strategy <MoveRight size={15} /></Link></div><div className="hero-note"><span className="hero-note-line" /> For ambitious premeds who are ready to replace noise with direction.</div></div>
      <div className="hero-art reveal delay-2" aria-label="Joshua Ward, MD, founder"><div className="floating-card top"><div className="float-label">Personal track record</div><div className="float-value">99th percentile CARS</div></div><div className="portrait-placeholder"><img className="portrait-photo" src="/joshua-ward-headshot.png" alt="Joshua Ward, MD, founder of Shua Strategies" /></div><div className="floating-card bottom"><div className="float-label">The working principle</div><div className="float-value">Strategy before volume</div></div></div>
    </div></section>
    <TrustStrip />
    <section className="section"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>The strategic layer</Eyebrow><div><p className="manifesto">The resources are not the problem. It’s knowing what to do with them — <em>and why.</em></p><p className="section-intro">UWorld, Anki, AAMC materials, prep books: ambitious students usually have plenty of resources. Shua Strategies helps diagnose the real constraint, build a personal sequence, and coach the execution.</p></div></div><div className="principles">{[['01', 'Read it correctly.', 'A score, transcript, or draft is information — not a verdict.'], ['02', 'Put it in order.', 'Put the right resource in the right place, instead of adding another tab.'], ['03', 'Make it hold.', 'A plan has to survive an ordinary Tuesday, not just a burst of motivation.']].map(([number, title, copy], index) => <div className={`principle reveal delay-${index + 1}`} key={number} data-testid={`card-principle-${number}`}><span className="principle-number">{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
    <section className="section section-blue"><div className="container-wide"><div className="split-heading reveal"><Eyebrow light>The method</Eyebrow><div><p className="manifesto">Four moves. One clearer way forward.</p><p className="section-intro" style={{ color: 'rgba(255,255,255,.7)' }}>Every engagement is built around what is true for you now — then refined as the evidence changes.</p></div></div><div className="method-grid">{[['01', 'Diagnose', 'Find the bottleneck beneath the clutter.'], ['02', 'Strategize', 'Make a sequence that fits your actual season.'], ['03', 'Execute', 'Turn the plan into focused weekly work.'], ['04', 'Optimize', 'Review the evidence and adjust with purpose.']].map(([num, title, copy], index) => <div className={`method-step reveal delay-${index + 1}`} key={num} data-testid={`step-method-${num}`}><span className="method-num">{num}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>Public engagements</Eyebrow><div><p className="manifesto">Choose the depth of support your season calls for.</p><p className="section-intro">Three pathways, four clearly scoped ways to work together. No inflated promises. No unlimited-review fine print hiding below the fold.</p></div></div>
      <Pathway kicker="01 · MCAT preparation" title="Stop outthinking CARS. Start reading with intent."><OfferRow number="01" name="MCAT Strategy Intensive" price="$600" copy="A deep diagnostic and personalized roadmap. Leave knowing exactly what to do between now and test day." scope="Performance analysis · content gaps · resource sequencing · CARS strategy · full-length schedule · written plan" action="Book Your Strategy Intensive" externalHref={MCAT_STRATEGY_STRIPE_URL} /><OfferRow number="02" name="MCAT Private Coaching" price="$2,000" copy="Ten hours of individualized performance coaching built on top of your strategy." scope="CARS coaching · content remediation · full-length analysis · accountability" action="Reserve Private Coaching" externalHref={MCAT_COACHING_STRIPE_URL} /></Pathway>
      <Pathway kicker="02 · Medical school admissions" title="Make the application sound unmistakably like you."><OfferRow number="03" name="Complete Application Advising" price="$7,500" copy="Full-cycle support from positioning through interview preparation, with the scope defined up front." scope="Primary · up to 10 secondaries · ~3 interview sessions · ~6 strategic advising sessions" action="Discuss your application" externalHref={CALENDLY_URL} /></Pathway>
      <TimeSensitiveSupportContent />
      <div className="premium-panel reveal"><div className="premium-grid"><div><Eyebrow light>04 · Comprehensive premed advising</Eyebrow><h2>For the long arc to becoming a physician.</h2><p className="copy">Future Physician Private Advising is a 9–12 month private engagement spanning academics, extracurricular strategy, MCAT, application, and interviews.</p><div className="premium-meta"><span>Limited to 5 active clients</span><span>Application required</span><span>$15,000</span></div></div><div className="premium-side"><div className="premium-price">$15,000</div><p>Joshua personally works with every active client. Apply first; qualified applicants are invited to a private consultation.</p><CTA href="/future-physician">Read about the private advising</CTA></div></div></div>
    </div></section>
    <section className="section"><div className="container-wide"><div className="case-study reveal"><div className="case-mark">01</div><div><Eyebrow>A personal track record</Eyebrow><h3 style={{ marginTop: 15 }}>Rahul went from a complicated season to a <span>521.</span></h3><p className="case-lead">Rahul, currently attending Rice University, came to Joshua for support that crossed the whole cycle — not a single isolated score. Together they worked through MCAT strategy, AMCAS and TMDSAS application support, the personal statement, and secondaries.</p><div className="case-steps">{[['Starting point', 'A student carrying multiple moving pieces and no reliable sequence.'], ['Challenge', 'Make the work coherent across the exam and application cycle.'], ['Intervention', 'Diagnose, plan, review, and refine each stage together.'], ['Result', 'A 521 MCAT score — 99th+ percentile — and a supported application journey.']].map(([label, copy]) => <div className="case-step" key={label}><strong>{label}</strong><span>{copy}</span></div>)}</div><Link href="/results" className="text-link" style={{ marginTop: 27 }} data-testid="link-home-results">Read the full case study <ArrowUpRight size={14} /></Link></div></div><div className="schools reveal"><h3>Students Joshua personally mentored went on to be accepted at</h3><div className="school-list">{['NYU Grossman School of Medicine', 'Washington University School of Medicine in St. Louis', 'Icahn School of Medicine at Mount Sinai', 'Albert Einstein College of Medicine', 'UT Southwestern Medical School', 'University of New Mexico BA/MD Program', 'George Washington University School of Medicine', 'and more'].map((school) => <span key={school} data-testid={`text-school-${school.slice(0, 5).replaceAll(' ', '-')}`}>{school}</span>)}</div></div><p className="results-disclaimer">This is Joshua’s personal track record over 5+ years across college and medical school admissions advising and MCAT coaching. Past outcomes do not guarantee future results.</p></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="newsletter reveal"><div><Eyebrow>Free resource</Eyebrow><h2>CARS Strategy Guide,<br /><span className="accent-italic">without the noise.</span></h2><p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>A practical starting point for reading with purpose, learning from missed questions, and making your next session count.</p></div><EmailGate title="CARS Strategy Guide" formUrl={CARS_GUIDE_FORM_URL} /></div></div></section>
    <section className="section"><div className="container-narrow" style={{ textAlign: 'center' }}><div className="reveal"><Eyebrow>Start with a conversation</Eyebrow><h2 className="display-md" style={{ marginTop: 18 }}>A clearer next move<br /><span className="accent-italic">starts here.</span></h2><p className="muted" style={{ margin: '22px auto 29px', maxWidth: 480, lineHeight: 1.7 }}>The free 15-minute call is a brief fit and diagnostic conversation — not a long free advising session.</p><CTA>Book a free 15-minute call</CTA></div></div></section>
  </main></Shell>;
}

function About() {
  usePageMeta('Meet Joshua Ward, MD', 'Meet Joshua Ward, MD, founder of Shua Strategies and a physician mentor for MCAT and medical school admissions.');
  return <Shell><main>
    <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>The person behind the plan</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>A physician mentor for the <span className="accent-italic">in-between.</span></h1><p className="body-lg muted">The season where your work is real, but the next decision is still hard to see.</p></div><div className="page-stamp reveal delay-2">PHYSICIAN<br />LED<br />DIRECT ACCESS</div></div></section>
    <section className="section"><div className="container-wide story-grid"><div className="story-visual reveal"><div className="story-caption">HEADSHOT PLACEHOLDER · Joshua Ward, MD</div></div><div className="story-copy reveal delay-1"><Eyebrow>Meet Joshua</Eyebrow><h2>Good advice begins with seeing the whole person.</h2><p>I’m Joshua Ward, MD. I studied at Cornell University, earned my MD from Washington University School of Medicine in St. Louis on a full-tuition scholarship, and earned a 99th percentile MCAT CARS score.</p><p>For 5+ years, I have personally worked with 40–50+ students across college and medical school admissions advising and MCAT coaching. The work has always been about more than adding hours: it is about identifying the decision underneath the stress and making a plan that can hold.</p><p>Shua Strategies is a young firm by design. I am personally involved with every client I take on, and I keep the roster limited so the person across from you is me — not a junior associate.</p><CTA>Start with a free conversation</CTA></div></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>A few coordinates</Eyebrow><div><p className="manifesto">The long way counts, too.</p><p className="section-intro">There is no single correct premed story. These are a few chapters of mine.</p></div></div><div className="timeline">{[['Foundation', 'Cornell University', 'An undergraduate education shaped by curiosity and disciplined work.'], ['The test', '99th percentile MCAT CARS', 'A reminder that close reading is a skill you can build, not a trait you either have or lack.'], ['Medicine', 'Washington University School of Medicine in St. Louis', 'Training in the science, craft, and humanity of becoming a physician.'], ['Now', 'Shua Strategies', 'Making the invisible parts of the path more visible for the students walking it.']].map(([date, title, copy], index) => <div className={`timeline-row reveal delay-${Math.min(index + 1, 3)}`} key={title}><div className="timeline-date">{date}</div><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>
    <section className="section"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>What you can expect</Eyebrow><div><p className="manifesto">Candid when it helps. Specific when it matters.</p></div></div><div className="principles">{[['01', 'Listen before prescribing', 'Your context changes the advice. We start there.'], ['02', 'Name the real problem', 'The loudest problem is not always the important one.'], ['03', 'Leave you with agency', 'Good guidance should make you more capable, not more dependent.']].map(([num, title, copy], index) => <div className={`principle reveal delay-${index + 1}`} key={num}><span className="principle-number">{num}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
  </main></Shell>;
}

function Mcat() {
  usePageMeta('MCAT strategy and coaching', 'Diagnostic-first MCAT strategy, CARS coaching, and private performance support from Joshua Ward, MD.');
  return <Shell><main>
    <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>MCAT preparation</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>Stop outthinking <span className="accent-italic">CARS.</span></h1><p className="body-lg muted">Build a study strategy around your actual performance — not a generic calendar or another pile of resources.</p></div><div className="page-stamp reveal delay-2">READ<br />WITH<br />INTENT</div></div></section>
     <section className="section"><div className="container-wide price-page"><div className="price-intro reveal"><Eyebrow>Two ways to begin</Eyebrow><h2>Strategy first.<br /><span className="accent-italic">Then repetition.</span></h2><p>Joshua earned a 99th percentile MCAT CARS score. His approach starts with a close look at how you are currently working, then builds the smallest useful system for the time you have left.</p><div className="scope-list"><li><b>01</b> Current performance analysis</li><li><b>02</b> Content-gap assessment</li><li><b>03</b> Resource sequencing and full-length schedule</li><li><b>04</b> CARS strategy</li><li><b>05</b> Written study plan</li></div></div><div className="reveal delay-1"><div className="price-box"><h3>MCAT Strategy Intensive</h3><div className="large-price">$600</div><p className="muted">A deep diagnostic and personalized MCAT roadmap. Leave knowing exactly what to do between now and test day.</p><div className="detail-list"><div><Check size={15} />Current performance analysis</div><div><Check size={15} />Content-gap assessment</div><div><Check size={15} />Resource sequencing</div><div><Check size={15} />CARS strategy</div><div><Check size={15} />Full-length exam schedule</div><div><Check size={15} />Written study plan</div></div><CheckoutCTA href={MCAT_STRATEGY_STRIPE_URL} action="Book Your Strategy Intensive" /></div><div style={{ height: 16 }} /><div className="price-box"><h3>MCAT Private Coaching</h3><div className="large-price">$2,000</div><p className="muted">10 hours of individualized coaching built on top of your strategy: CARS coaching, content remediation, full-length analysis, and accountability.</p><div className="detail-list"><div><Check size={15} />Performance coaching, not a stack of tutoring hours</div><div><Check size={15} />CARS coaching and content remediation</div><div><Check size={15} />Full-length analysis</div><div><Check size={15} />Accountability between sessions</div></div><CheckoutCTA href={MCAT_COACHING_STRIPE_URL} action="Reserve Private Coaching" /></div></div></div></section>
    <section className="section section-blue"><div className="container-wide"><div className="case-study reveal"><div className="case-mark">521</div><div><Eyebrow light>A whole-cycle case study</Eyebrow><h3 style={{ marginTop: 15 }}>Rahul, now attending Rice University, built the <span>full picture.</span></h3><p className="case-lead">Joshua supported Rahul through MCAT strategy, AMCAS and TMDSAS application support, personal statement, and secondaries. The result was a 521 MCAT score — 99th+ percentile — alongside support that did not stop at test day.</p><div className="case-steps">{[['Diagnose', 'Locate the real constraints.'], ['Sequence', 'Use each resource at the right time.'], ['Coach', 'Review the work with a sharp, human lens.'], ['Result', '521 MCAT score and a supported application cycle.']].map(([label, copy]) => <div className="case-step" key={label}><strong>{label}</strong><span style={{ color: 'rgba(255,255,255,.7)' }}>{copy}</span></div>)}</div></div></div></div></section>
    <section className="section"><div className="container-narrow"><div className="reveal"><Eyebrow>Not sure which door</Eyebrow><h2 className="display-md" style={{ marginTop: 18 }}>The first call can<br /><span className="accent-italic">find the fit.</span></h2><p className="section-intro">Bring your score report, study history, or simply the question you keep circling.</p><CTA>Book a free 15-minute call</CTA></div></div></section>
  </main></Shell>;
}

function Admissions() {
  usePageMeta('Medical school admissions advising', 'Complete application advising for medical school applicants, with clear scope from positioning through interviews.');
  return <Shell><main>
    <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>Medical school admissions</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>Build an application that sounds like <span className="accent-italic">you.</span></h1><p className="body-lg muted">Full-cycle support for turning experiences, values, and questions into a coherent application — without sanding away the person behind it.</p></div><div className="page-stamp reveal delay-2">POSITION<br />NARRATIVE<br />EXECUTE</div></div></section>
    <section className="section"><div className="container-wide advising-layout"><aside className="advising-aside reveal"><Eyebrow>Complete advising</Eyebrow><h2>Clarity for the whole cycle.</h2><p>We define your positioning, make the writing stronger, and keep the process moving with strategic review — not endless revision.</p><div className="price-box" style={{ marginTop: 30 }}><div className="large-price">$7,500</div><p className="muted">A clearly scoped full-cycle engagement.</p><CTA>Discuss your application</CTA></div></aside><div className="reveal delay-1"><div className="phase-list">{[['01', 'Applicant positioning & narrative', 'Clarify the through-line across your experiences, goals, and values so the application has somewhere to go.'], ['02', 'Primary application', 'Personal statement, activities, and up to 3 review rounds to make the story specific, honest, and coherent.'], ['03', 'Secondaries', 'Support for up to 10 schools, with up to 2 review rounds each. Additional schools or rounds are available separately.'], ['04', 'Interviews & execution', 'Approximately 3 interview preparation sessions and approximately 6 strategic advising sessions to help you prepare, decide, and keep moving.']].map(([num, title, copy]) => <div className="phase" key={num}><div className="phase-num">{num}</div><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="embed-box" style={{ marginTop: 25 }}><strong>THE SCOPE, CLEARLY</strong> Personal statement, activities, up to 3 primary review rounds, secondaries for up to 10 schools with up to 2 rounds each, approximately 3 interview sessions, and approximately 6 strategic advising sessions.</div></div></div></section>
    <section className="section section-soft"><div className="container-wide"><TimeSensitiveSupportContent /></div></section>
     <section className="section section-soft"><div className="container-wide"><div className="schools reveal"><h3>Prior to founding Shua Strategies, Joshua personally mentored students who went on to be accepted at</h3><div className="school-list">{['NYU Grossman School of Medicine', 'Washington University School of Medicine in St. Louis', 'Icahn School of Medicine at Mount Sinai', 'Albert Einstein College of Medicine', 'UT Southwestern Medical School', 'University of New Mexico BA/MD Program', 'George Washington University School of Medicine', 'and more'].map((school) => <span key={school}>{school}</span>)}</div></div><p className="results-disclaimer">These outcomes reflect Joshua’s personal mentoring work over time, across paid work and personal-statement-only help. Past outcomes do not guarantee future results.</p></div></section>
  </main></Shell>;
}

function FuturePhysician() {
  usePageMeta('Future Physician Private Advising', 'Apply for Future Physician Private Advising, a limited 9–12 month engagement with Joshua Ward, MD.');
  return <Shell><main>
    <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>Comprehensive premed advising</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>The long arc deserves <span className="accent-italic">private attention.</span></h1><p className="body-lg muted">Future Physician Private Advising is a 9–12 month engagement for students who want one strategic relationship across academics, MCAT, application, and interviews.</p></div><div className="page-stamp reveal delay-2">5 ACTIVE<br />CLIENTS<br />APPLICATION REQUIRED</div></div></section>
    <section className="section"><div className="container-wide premium-panel reveal"><div className="premium-grid"><div><Eyebrow light>Future Physician Private Advising</Eyebrow><h2>A steady hand across every phase.</h2><p className="copy">This is a limited, high-touch engagement. Joshua personally works with every client, and can support no more than 5 active clients at a time.</p><div className="premium-meta"><span>9–12 months</span><span>$15,000</span><span>Limited to 5 active clients at a time</span></div></div><div className="premium-side"><div className="premium-price">$15,000</div><p>Application required. Qualified applicants are invited to a private consultation before enrollment.</p><a href={FUTURE_PHYSICIAN_FORM_URL} target="_blank" rel="noreferrer" className="btn-primary" data-testid="link-future-apply">Apply for Future Physician Advising <ArrowUpRight size={15} /></a></div></div></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>Four engagement phases</Eyebrow><div><p className="manifesto">One relationship. The full premed arc.</p><p className="section-intro">The sequence is tailored to the student and the season. Each phase informs the next.</p></div></div><div className="phase-list" style={{ marginTop: 55 }}>{[['01', 'Positioning', 'Academics and extracurricular strategy that build a strong foundation and a coherent direction.'], ['02', 'MCAT', 'A personalized approach to preparation, resource use, full-lengths, and review.'], ['03', 'Application', 'Applicant narrative, primary, secondaries, and the decisions that make the file feel whole.'], ['04', 'Interviews & execution', 'Interview preparation and the steady execution required to carry the plan through.']].map(([num, title, copy]) => <div className="phase reveal" key={num}><div className="phase-num">{num}</div><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>
    <section id="application" className="section"><div className="container-wide booking-grid"><div className="booking-aside reveal"><Eyebrow>Application required</Eyebrow><h2>Tell Joshua where you are headed.</h2><p>Share a little context on the short application. Joshua reviews every application personally; qualified applicants are invited to a private consultation, then enrollment.</p><ul className="promise-list"><li><Users size={15} />Limited to 5 active clients at a time</li><li><FileText size={15} />Short application, no performance</li><li><ShieldCheck size={15} />Private consultation before enrollment</li></ul></div><div className="booking-card reveal delay-1"><h2>Future Physician application</h2><p>This is an application, not a payment form.</p><a href={FUTURE_PHYSICIAN_FORM_URL} target="_blank" rel="noreferrer" className="btn-primary" data-testid="link-future-application-form">Apply for Future Physician Advising <ArrowUpRight size={15} /></a></div></div></section>
  </main></Shell>;
}

function Results() {
  usePageMeta('Results and experience', 'A transparent look at Joshua Ward, MD’s personal track record and the Rahul 521 case study.');
  return <Shell><main>
    <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>Results, with context</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>Personal track record.<br /><span className="accent-italic">No theater.</span></h1><p className="body-lg muted">Joshua’s experience across 5+ years, shared with the scope and honesty it deserves.</p></div><div className="page-stamp reveal delay-2">5+ YEARS<br />40–50+ STUDENTS<br />ONE FOUNDER</div></div></section>
    <section className="section"><div className="container-wide"><div className="trust-grid reveal" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '24px 0' }}>{[['5+ years', 'Combined admissions advising and MCAT coaching experience'], ['40–50+', 'Students personally worked with across college and medical school admissions'], ['521', 'Rahul’s MCAT score, 99th+ percentile'], ['99th percentile', 'Joshua’s personal MCAT CARS score']].map(([value, label], index) => <div className="trust-item" key={value} data-testid={`text-results-stat-${index}`}><div className="trust-value">{value}</div><div className="trust-label">{label}</div></div>)}</div><div className="case-study reveal"><div className="case-mark">521</div><div><Eyebrow>Rahul · Rice University</Eyebrow><h3 style={{ marginTop: 15 }}>A full-cycle story, from starting point to <span>result.</span></h3><p className="case-lead">Rahul, currently attending Rice University, came to Joshua for support across more than one problem. The work included MCAT strategy, AMCAS and TMDSAS application support, personal statement, and secondaries.</p><div className="case-steps">{[['Starting situation', 'A complicated season with several high-stakes pieces moving at once.'], ['Challenge', 'Create a strategy that could hold across the exam and application.'], ['Intervention', 'Personalized diagnosis, sequencing, coaching, and review through the cycle.'], ['Result', '521 on the MCAT, a 99th+ percentile score, and supported application work.']].map(([label, copy]) => <div className="case-step" key={label}><strong>{label}</strong><span>{copy}</span></div>)}</div></div></div><p className="results-disclaimer">This case study reflects Joshua’s personal work with Rahul. Past outcomes do not guarantee future results.</p></div></section>
     <section className="section section-soft"><div className="container-wide"><div className="schools reveal"><h3>Prior to founding Shua Strategies, Joshua personally mentored students who went on to be accepted at medical schools including</h3><div className="school-list">{['NYU Grossman School of Medicine', 'Washington University School of Medicine in St. Louis', 'Icahn School of Medicine at Mount Sinai', 'Albert Einstein College of Medicine', 'UT Southwestern Medical School', 'University of New Mexico BA/MD Program', 'George Washington University School of Medicine', 'and more'].map((school) => <span key={school}>{school}</span>)}</div></div><div className="schools reveal"><h3>Prior to founding Shua Strategies, Joshua personally mentored students who went on to be accepted at undergraduate institutions including</h3><div className="school-list">{['Cornell University', 'Georgetown University', 'Tufts University', 'Carleton College', 'Tulane University', 'Macalester College', 'Occidental College', 'Pitzer College', 'Scripps College', 'and more'].map((school) => <span key={school}>{school}</span>)}</div></div><p className="results-disclaimer">These lists reflect students Joshua personally mentored across a mix of paid work and free or personal-statement-only help over the years. They are not exhaustive. Past outcomes do not guarantee future results.</p></div></section>
  </main></Shell>;
}

function ResourceCard({ number, title, copy, featured = false, formUrl, comingSoon = false }: { number: string; title: string; copy: string; featured?: boolean; formUrl?: string; comingSoon?: boolean }) {
  const [open, setOpen] = useState(false);
  return <article className={`resource-card reveal ${featured ? 'featured' : ''}`} data-testid={`card-resource-${number}`}><div className="resource-type">{number}</div><h3>{title}</h3><p>{copy}</p>{comingSoon ? <span className="text-link resource-coming-soon" data-testid={`text-resource-coming-soon-${number}`}>Coming soon</span> : (open ? <div className="resource-gate"><EmailGate title={title} formUrl={formUrl} /></div> : <button type="button" className="text-link" onClick={() => setOpen(true)} data-testid={`button-resource-${number}`}>Get the resource <ArrowUpRight size={14} /></button>)}</article>;
}

function Resources() {
  usePageMeta('Free resources', 'Free MCAT and premed resources from Shua Strategies, including the CARS Strategy Guide and four high-yield subject sheets.');
  return <Shell><main>
    <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>Free, useful, no fluff</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>A few good pages for the days you feel <span className="accent-italic">behind.</span></h1><p className="body-lg muted">Small tools for thinking more clearly about the MCAT, your application, and what comes next.</p></div><div className="page-stamp reveal delay-2">TAKE AS<br />MUCH AS<br />YOU NEED</div></div></section>
    <section className="section"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>The resource shelf</Eyebrow><div><p className="manifesto">Start with the one you’ll use today.</p><p className="section-intro">Each resource is designed to replace one kind of overwhelm with one useful move.</p></div></div><div className="resource-grid"><ResourceCard number="01 · CARS" featured title="CARS Strategy Guide" copy="A grounded guide to reading passages with purpose, learning from missed questions, and making your next CARS session count." formUrl={CARS_GUIDE_FORM_URL} /><ResourceCard number="02 · BIO / BIOCHEM" title="High-Yield Biology/Biochemistry Sheet" copy="A compact review companion for concepts that show up often and connect across the exam." comingSoon /><ResourceCard number="03 · PSYCH / SOC" title="High-Yield Psychology/Sociology Sheet" copy="A quick-reference guide for terms, theories, and distinctions worth keeping close." comingSoon /><ResourceCard number="04 · CHEM / PHYSICS" title="High-Yield Chemistry/Physics Sheet" copy="A practical refresher for equations, relationships, and problem-solving patterns." comingSoon /><ResourceCard number="05 · ORGANIC CHEMISTRY" title="High-Yield Organic Chemistry Sheet" copy="A concise review of reactions and concepts to revisit with intention." comingSoon /></div></div></section>
    <section className="section section-soft"><div className="container-wide"><div className="newsletter reveal"><div><Eyebrow>The occasional note</Eyebrow><h2>A little clarity,<br /><span className="accent-italic">in your inbox.</span></h2><p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>Short notes on studying, storytelling, and staying human on the road to medicine.</p></div><a href={CARS_GUIDE_FORM_URL} target="_blank" rel="noreferrer" className="btn-primary" data-testid="link-newsletter-cars-guide">Get the CARS Strategy Guide <ArrowUpRight size={14} /></a></div></div></section>
  </main></Shell>;
}

function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
  return <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: 320, height: 700 }} />;
}

function Book() {
  usePageMeta('Book a 15-minute fit call', 'Book a free 15-minute fit and diagnostic call with Joshua Ward, MD.');
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [context, setContext] = useState('');
  return <Shell><main>
    <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>A brief fit conversation</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>Bring the question you keep <span className="accent-italic">circling.</span></h1><p className="body-lg muted">A free 15-minute diagnostic call to understand what is stuck and whether direct strategy support is the right next move.</p></div><div className="page-stamp reveal delay-2">15 MINUTES<br />LOW PRESSURE<br />ONE NEXT STEP</div></div></section>
    <section className="section"><div className="container-wide booking-grid"><aside className="booking-aside reveal"><Eyebrow>What happens here</Eyebrow><h2>A small room for a big question.</h2><p>This is not a 45–60 minute free advising session. It is a short, focused conversation — enough time to name the situation and find the appropriate next step.</p><ul className="promise-list"><li><Clock3 size={15} />A focused 15-minute conversation</li><li><Target size={15} />A brief fit and diagnostic discussion</li><li><MoveRight size={15} />One or two practical next moves</li><li><ShieldCheck size={15} />No pressure to continue</li></ul></aside><div className="booking-card reveal delay-1"><h2>Tell Joshua a little first.</h2><p>Use this short form and scheduling details will be connected through Calendly.</p>{sent ? <div className="booking-success" data-testid="status-booking-success"><Check size={21} style={{ color: 'var(--royal)' }} /><h3>Got it, {name.split(' ')[0] || 'there'}.</h3><p>Thanks for sharing the context. The contact handoff and Calendly scheduling will be connected here.</p><button type="button" className="btn-secondary" onClick={() => setSent(false)} data-testid="button-booking-reset">Send another note</button></div> : <form className="booking-form" onSubmit={(event) => { event.preventDefault(); if (name.trim() && email.trim() && context.trim()) setSent(true); }}><label className="form-label" htmlFor="booking-name">Your name<input id="booking-name" className="field" required value={name} onChange={(event) => setName(event.target.value)} data-testid="input-booking-name" /></label><label className="form-label" htmlFor="booking-email">Email address<input id="booking-email" className="field" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} data-testid="input-booking-email" /></label><label className="form-label" htmlFor="booking-context">What would you like to talk through?<textarea id="booking-context" className="field form-textarea" required value={context} onChange={(event) => setContext(event.target.value)} placeholder="MCAT planning, an application question, a decision..." data-testid="input-booking-context" /></label><button type="submit" className="btn-primary" data-testid="button-booking-submit">Request the call <ArrowUpRight size={15} /></button></form>}</div></div></section>
    <section className="section section-soft"><div className="container-narrow"><CalendlyWidget /></div></section>
  </main></Shell>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/mcat" component={Mcat} />
    <Route path="/admissions" component={Admissions} />
    <Route path="/future-physician" component={FuturePhysician} />
    <Route path="/results" component={Results} />
    <Route path="/resources" component={Resources} />
    <Route path="/book" component={Book} />
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}

export default App;