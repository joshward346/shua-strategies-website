import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, CalendarDays, Check, ClipboardList, Clock3, HeartHandshake, Instagram, Linkedin, Mail, Menu, MessageCircle, MoveRight, Quote, ShieldCheck, Sparkles, Target, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Meet Shua' },
  { href: '/services', label: 'How I help' },
  { href: '/resources', label: 'Resources' },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} · Shua Strategies`;
    const tags = [
      ['name', 'description', description],
      ['property', 'og:title', `${title} · Shua Strategies`],
      ['property', 'og:description', description],
      ['property', 'og:type', 'website'],
      ['property', 'og:url', window.location.href],
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
  }, [title, description]);
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
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return (
    <span className="brand-mark" data-testid="brand-logo">
      <span className="brand-symbol" aria-hidden="true"><span className="sr-only">Shua Strategies</span></span>
      <span className="brand-word">Shua<span className="brand-sub">Strategies</span></span>
    </span>
  );
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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/book" className="nav-cta" data-testid="link-nav-book">Book your free call <ArrowUpRight size={15} /></Link>
          <button type="button" className="mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)} data-testid="button-mobile-navigation">
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {open && (
          <nav className="mobile-panel" aria-label="Mobile navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="nav-link" onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
            <Link href="/book" className="nav-cta" onClick={() => setOpen(false)} data-testid="link-mobile-book">Book your free call <ArrowUpRight size={15} /></Link>
          </nav>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="muted" style={{ maxWidth: 290, marginTop: 20, lineHeight: 1.65, fontSize: 13 }}>A steadier way into medicine, from someone who has sat on both sides of the admissions table.</p>
            <p className="placeholder-note" style={{ marginTop: 25 }}>LOGO PLACEHOLDER · replace with approved mark</p>
          </div>
          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              <Link href="/about" data-testid="link-footer-about">Meet Shua</Link>
              <Link href="/services" data-testid="link-footer-services">How I help</Link>
              <Link href="/resources" data-testid="link-footer-resources">Free resources</Link>
              <Link href="/book" data-testid="link-footer-book">Book a call</Link>
            </div>
          </div>
          <div>
            <h3>Stay close</h3>
            <div className="footer-links">
              <a href="mailto:CONTACT_EMAIL_PLACEHOLDER" data-testid="link-footer-email"><Mail size={13} /> CONTACT EMAIL PLACEHOLDER</a>
              <a href="https://www.linkedin.com/in/LINKEDIN_PLACEHOLDER" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin"><Linkedin size={13} /> LinkedIn PLACEHOLDER</a>
              <a href="https://instagram.com/INSTAGRAM_PLACEHOLDER" target="_blank" rel="noreferrer" data-testid="link-footer-instagram"><Instagram size={13} /> Instagram PLACEHOLDER</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Shua Strategies</span>
          <span>Physician-led guidance · no shortcuts, no theater</span>
          <span className="placeholder-note">GOOGLE ANALYTICS PLACEHOLDER · META PIXEL PLACEHOLDER</span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  useReveals();
  return <div className="site-shell page-enter"><Header />{children}<Footer /></div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function CTA({ children = 'Book your free strategy call' }: { children?: ReactNode }) {
  return <Link href="/book" className="btn-primary" data-testid="link-primary-cta">{children}<ArrowUpRight size={16} /></Link>;
}

function EmailGate({ resourceTitle, compact = false }: { resourceTitle: string; compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className={compact ? 'email-gate email-gate-compact' : 'email-gate'}>
      {submitted ? (
        <p className="form-message" data-testid={`status-resource-${resourceTitle.toLowerCase().replaceAll(' ', '-')}`}>
          Thanks — the {resourceTitle} delivery is ready for MailerLite.
        </p>
      ) : (
        <>
          <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubmitted(true); }}>
            <label className="sr-only" htmlFor={`email-${resourceTitle}`}>Email address</label>
            <input id={`email-${resourceTitle}`} className="field" type="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} data-testid={`input-resource-${resourceTitle.toLowerCase().replaceAll(' ', '-')}`} />
            <button className="btn-primary" type="submit" data-testid={`button-resource-submit-${resourceTitle.toLowerCase().replaceAll(' ', '-')}`}>Send me the guide <ArrowUpRight size={15} /></button>
          </form>
          {/* MAILERLITE EMBED GOES HERE */}
          <p className="placeholder-note" style={{ marginTop: 13 }}>MAILERLITE EMBED GOES HERE · replace this form with the approved embed</p>
        </>
      )}
    </div>
  );
}

function Home() {
  usePageMeta('Clear the fog. Keep the calling.', 'Physician-led MCAT coaching and premed admissions advising for students ready to turn effort into a clear next step.');
  return (
    <Shell>
      <main>
        <section className="hero">
          <div className="container-wide hero-grid">
            <div className="hero-copy reveal">
              <Eyebrow>MCAT coaching · admissions advising</Eyebrow>
              <h1 className="display-xl" style={{ marginTop: 23 }}>You do not have to <span className="accent-italic">guess</span> your way to medicine.</h1>
              <p className="body-lg muted">A physician mentor for the season when your hard work is real—but your next move is not obvious.</p>
              <div className="hero-actions">
                <CTA />
                <Link href="/services" className="btn-secondary" data-testid="link-hero-services">See how I help <MoveRight size={15} /></Link>
              </div>
              <div className="hero-note"><span className="hero-note-line" /> For premeds who want an honest plan, not more noise.</div>
            </div>
            <div className="hero-art reveal delay-2" aria-label="Headshot placeholder for Shua">
              <div className="floating-card top"><div className="float-label">MCAT CARS</div><div className="float-value">131 / 132</div></div>
              <div className="portrait-placeholder"><span className="portrait-label">Shua (Josh Ward), MD</span></div>
              <div className="floating-card bottom"><div className="float-label">The north star</div><div className="float-value">Clarity over panic</div></div>
            </div>
          </div>
        </section>

        <section className="stats-strip">
          <div className="container-wide stats-grid">
            <div className="stat reveal"><div className="stat-value">MD</div><div className="stat-label">Washington University<br />School of Medicine</div></div>
            <div className="stat reveal delay-1"><div className="stat-value">131/132</div><div className="stat-label">MCAT CARS scores<br />earned, not guessed</div></div>
            <div className="stat reveal delay-2"><div className="stat-value">Cornell</div><div className="stat-label">Undergraduate<br />foundation</div></div>
            <div className="stat reveal delay-3"><div className="stat-value">1:1</div><div className="stat-label">Advice built around<br />your actual season</div></div>
          </div>
        </section>

        <section className="section">
          <div className="container-wide">
            <div className="split-heading reveal">
              <Eyebrow>A different kind of prep</Eyebrow>
              <div>
                <p className="manifesto">The goal is not to become a machine. It is to become the kind of <em>doctor</em> who can think clearly when the stakes are high.</p>
                <p className="muted" style={{ marginTop: 24, lineHeight: 1.7, fontSize: 14 }}>Shua Strategies brings a clinician’s eye to the premed path: notice what is actually happening, name what matters, and make the next decision small enough to act on.</p>
              </div>
            </div>
            <div className="principles">
              {[
                ['01', 'See the whole student', 'A score, a transcript, or a draft is information—not a verdict.'],
                ['02', 'Trade volume for signal', 'More hours are not always the answer. Better feedback usually is.'],
                ['03', 'Make a plan you can keep', 'Your strategy has to survive a Tuesday afternoon, not just a burst of motivation.'],
              ].map(([number, title, copy], index) => (
                <div className={`principle reveal delay-${index + 1}`} key={number} data-testid={`card-principle-${number}`}>
                  <span className="principle-number">{number}</span><h3>{title}</h3><p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tint">
          <div className="container-wide">
            <div className="split-heading reveal">
              <Eyebrow>Where we can start</Eyebrow>
              <div><h2 className="display-md">Bring the knot.<br /><span className="accent-italic">We’ll find the thread.</span></h2><p className="muted" style={{ marginTop: 20, lineHeight: 1.65 }}>Different seasons call for different kinds of support. Start with the part that feels loudest right now.</p></div>
            </div>
            <div className="path-grid">
              {[
                [<Target className="path-icon" />, 'MCAT, made legible', 'A diagnostic-first plan that tells you what to study next, how to practice, and when to stop spinning.', '/services'],
                [<ClipboardList className="path-icon" />, 'Application, made yours', 'Translate a life of experiences into a personal narrative that sounds like you—and holds up under scrutiny.', '/services'],
                [<HeartHandshake className="path-icon" />, 'A steadier perspective', 'For the moments when strategy and self-trust have gotten tangled together.', '/book'],
              ].map(([icon, title, copy, href], index) => (
                <article className={`path-card reveal delay-${index + 1}`} key={title as string} data-testid={`card-path-${index}`}>
                  {icon}<h3>{title}</h3><p>{copy}</p><Link href={href as string} className="text-link" data-testid={`link-path-${index}`}>Explore this path <ArrowUpRight size={14} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-deep pullquote">
          <div className="reveal">
            <Quote className="quote-mark" size={45} strokeWidth={1} />
            <p className="quote-text">You are allowed to want this—and to pursue it without losing yourself in the process.</p>
            <div className="quote-credit">Shua (Josh Ward), MD · physician mentor</div>
          </div>
        </section>

        <section className="section section-tint">
          <div className="container-wide">
            <div className="newsletter reveal">
              <div><Eyebrow>Free resource</Eyebrow><h2>Grab the free<br /><span className="accent-italic">CARS Strategy Guide.</span></h2><p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>A practical starting point for reading with purpose, learning from missed questions, and making your next CARS session count.</p></div>
              <EmailGate resourceTitle="CARS Strategy Guide" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <div className="reveal"><Eyebrow>Begin with a conversation</Eyebrow><h2 className="display-md" style={{ marginTop: 18 }}>One clear next step<br /><span className="accent-italic">changes the week.</span></h2><p className="muted" style={{ lineHeight: 1.65, maxWidth: 490, margin: '23px auto 30px' }}>Tell me what feels stuck. The free 15-minute strategy call is a low-pressure place to ask a real question and leave with a more useful one.</p><CTA>Book your free strategy call</CTA></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function About() {
  usePageMeta('Meet Shua', 'Meet Shua (Josh Ward), MD—a Cornell and WashU-trained physician who helps premed students make thoughtful progress with less noise.');
  return (
    <Shell>
      <main>
        <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>The person behind the plan</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>Advice from someone who remembers <span className="accent-italic">the in-between.</span></h1><p className="body-lg muted">Before the white coat, there were spreadsheets, second guesses, and a lot of trying to understand what actually mattered.</p></div><div className="page-stamp reveal delay-2">PHYSICIAN-LED<br />HUMAN-SCALE<br />CLEAR-EYED</div></div></section>
        <section className="section"><div className="container-wide story-grid"><div className="story-visual reveal"><div className="story-caption">HEADSHOT PLACEHOLDER · Shua (Josh Ward), MD</div></div><div className="story-copy reveal delay-1"><Eyebrow>Meet Shua</Eyebrow><h2>I know the path is not a checklist.</h2><p>I’m Shua—Josh to the people who knew me before medicine. I studied at Cornell, earned a full-tuition scholarship, and went on to Washington University School of Medicine. Along the way, I scored a 131 and 132 on MCAT CARS.</p><p>Those facts are part of my story, but they are not the reason I do this work. I do it because the students I remember most were not lacking ambition. They were lacking a trustworthy place to sort the signal from the noise.</p><p>My role is to be that place for you: specific when specificity helps, candid when a hard truth serves you, and always invested in building a process you can own.</p><CTA>Start with a free conversation</CTA></div></div></section>
        <section className="section section-tint"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>A few coordinates</Eyebrow><div><h2 className="display-md">The long way<br /><span className="accent-italic">counts, too.</span></h2><p className="muted" style={{ lineHeight: 1.7, marginTop: 19 }}>There is no single “right” premed story. Here are a few chapters of mine.</p></div></div><div className="timeline">{[['Before medicine', 'Cornell University', 'An undergraduate foundation built through curiosity, discipline, and a full-tuition scholarship.'], ['The test', '131 / 132 MCAT CARS', 'A reminder that reading closely is a skill you can build—not a trait you either have or do not.'], ['The work', 'Washington University School of Medicine', 'Learning the science, the craft, and the humanity of becoming a physician.'], ['Now', 'Shua Strategies', 'Making the invisible parts of this path more visible for the students walking it.']].map(([date, title, copy], index) => <div className={`timeline-row reveal delay-${Math.min(index + 1, 3)}`} key={title}><div className="timeline-date">{date}</div><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>
        <section className="section"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>What you can expect</Eyebrow><div><p className="manifesto">No performance. No borrowed voice. Just <em>useful honesty.</em></p></div></div><div className="principles">{[['Listen before prescribing', 'Your context changes the advice. We start there.'], ['Name the real problem', 'The loudest problem is not always the most important one.'], ['Leave you with agency', 'Good guidance should make you more capable, not more dependent.']].map(([title, copy], index) => <div className={`principle reveal delay-${index + 1}`} key={title}><Sparkles className="path-icon" /><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
      </main>
    </Shell>
  );
}

function Services() {
  usePageMeta('How I help', 'Explore physician-led MCAT coaching, admissions advising, and steady strategic support from Shua Strategies.');
  const services = [
    ['01', 'MCAT coaching', 'A focused, diagnostic-first approach for students who are working hard but cannot tell what is moving the needle.', 'We map your baseline, identify the bottleneck, and build a practice rhythm around how you actually learn.'],
    ['02', 'Admissions advising', 'Thoughtful support for turning experiences, values, and questions into an application that feels unmistakably yours.', 'From personal statement strategy to interview preparation, we work on the meaning beneath the bullet points.'],
    ['03', 'Strategy & perspective', 'A short-term reset when you need an experienced second set of eyes—not another tab open.', 'Bring the decision, draft, schedule, or doubt. We will make the next move more concrete together.'],
  ];
  return (
    <Shell>
      <main>
        <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>How I help</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>A plan is only good<br />if it can hold <span className="accent-italic">you.</span></h1><p className="body-lg muted">No one-size-fits-all curriculum. No public price list. Just clear, personal support for the work in front of you.</p></div><div className="page-stamp reveal delay-2">DIAGNOSE<br />DECIDE<br />DO</div></div></section>
        <section className="section"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>Choose your starting point</Eyebrow><div><h2 className="display-md">Less “what should I do?”<br /><span className="accent-italic">More “here’s why.”</span></h2><p className="muted" style={{ lineHeight: 1.7, marginTop: 19 }}>The work is collaborative and tailored. These are the doors most students walk through first.</p></div></div><div className="services-list">{services.map(([number, title, lead, copy]) => <article className="service-row reveal" key={number} data-testid={`card-service-${number}`}><div className="service-number">{number}</div><div><h3>{title}</h3><p>{lead}</p></div><p>{copy}</p><ArrowUpRight className="service-arrow" size={20} /></article>)}</div></div></section>
        <section className="section section-deep"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>The working rhythm</Eyebrow><div><h2 className="display-md">A calm process<br /><span style={{ color: 'hsl(var(--accent))' }}>with a sharp edge.</span></h2><p className="muted" style={{ lineHeight: 1.7, marginTop: 19 }}>You will always know what we are looking at, why it matters, and what to do before our next conversation.</p></div></div><div className="process-grid">{[['01', 'Look', 'We get specific about the starting line.'], ['02', 'Name', 'We find the constraint underneath the clutter.'], ['03', 'Build', 'We choose a strategy you can repeat.'], ['04', 'Review', 'We use evidence to adjust, not to judge.']].map(([number, title, copy], index) => <div className={`process-step reveal delay-${index + 1}`} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
        <section className="section"><div className="container-narrow" style={{ textAlign: 'center' }}><div className="reveal"><Eyebrow>Not sure where you fit?</Eyebrow><h2 className="display-md" style={{ marginTop: 18 }}>That is exactly what<br /><span className="accent-italic">the first call is for.</span></h2><p className="muted" style={{ lineHeight: 1.65, maxWidth: 480, margin: '22px auto 29px' }}>No prep required. Bring the question you keep circling and we will start there.</p><CTA>Book your free strategy call</CTA></div></div></section>
      </main>
    </Shell>
  );
}

function ResourceCard({ type, title, copy, featured = false, index }: { type: string; title: string; copy: string; featured?: boolean; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`resource-card ${featured ? 'featured' : ''} reveal delay-${(index % 3) + 1}`} data-testid={`card-resource-${index}`}>
      <div className="resource-type">{type}</div>
      <h3>{title}</h3>
      <p>{copy}</p>
      {open ? (
        <div className="resource-gate">
          <EmailGate resourceTitle={title} compact />
        </div>
      ) : (
        <button type="button" className="text-link" onClick={() => setOpen(true)} data-testid={`button-resource-${index}`}>Get the resource <ArrowUpRight size={14} /></button>
      )}
    </article>
  );
}

function Resources() {
  usePageMeta('Free resources', 'Five grounded, practical resources for MCAT prep and premed applications, from Shua Strategies.');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <Shell>
      <main>
        <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>Free, useful, no fluff</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>A few good pages<br />for the days you feel <span className="accent-italic">behind.</span></h1><p className="body-lg muted">Small tools to help you think more clearly about the MCAT, your application, and what comes next.</p></div><div className="page-stamp reveal delay-2">TAKE WHAT<br />HELPS<br />LEAVE THE REST</div></div></section>
        <section className="section"><div className="container-wide"><div className="split-heading reveal"><Eyebrow>The resource shelf</Eyebrow><div><h2 className="display-md">Start with the one<br /><span className="accent-italic">you’ll use today.</span></h2><p className="muted" style={{ lineHeight: 1.7, marginTop: 19 }}>Each resource is designed to replace one kind of overwhelm with one useful move.</p></div></div><div className="resource-grid"><ResourceCard index={0} featured type="01 · CARS" title="CARS Strategy Guide" copy="A grounded guide to reading passages with purpose, learning from missed questions, and making your next CARS session count." /><ResourceCard index={1} type="02 · biology / biochem" title="High-Yield Biology/Biochem Sheet" copy="A compact review companion for the concepts that show up often and connect across the exam." /><ResourceCard index={2} type="03 · psych / soc" title="High-Yield Psych/Soc Sheet" copy="A quick-reference sheet for the terms, theories, and distinctions worth keeping close." /><ResourceCard index={3} type="04 · chem / physics" title="High-Yield Chem/Physics Sheet" copy="A practical refresher for equations, relationships, and problem-solving patterns." /><ResourceCard index={4} type="05 · fourth science subject" title="High-Yield [4th science subject] Sheet" copy="A clearly marked placeholder for the fifth free resource you want to make available next." /></div></div></section>
        <section className="section section-tint"><div className="container-wide"><div className="newsletter reveal"><div><Eyebrow>The occasional note</Eyebrow><h2>A little clarity,<br /><span className="accent-italic">in your inbox.</span></h2><p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>Short notes on studying, storytelling, and staying human on the road to medicine.</p></div><div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubmitted(true); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" className="field" type="email" required placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} data-testid="input-newsletter-email" /><button className="btn-primary" type="submit" data-testid="button-newsletter-submit">Join the list <ArrowUpRight size={15} /></button></form>{submitted ? <p className="form-message" data-testid="status-newsletter-success">You’re on the list. MailerLite delivery will be connected here.</p> : <p className="placeholder-note" style={{ marginTop: 13 }}>MAILERLITE EMBED PLACEHOLDER · replace this form with approved embed</p>}</div></div></div></section>
        <section className="section"><div className="container-narrow"><div className="reveal"><Eyebrow>Before you download</Eyebrow><h2 className="display-md" style={{ marginTop: 18 }}>The resource is not<br /><span className="accent-italic">the relationship.</span></h2><p className="muted" style={{ lineHeight: 1.7, marginTop: 21 }}>Use these pages as a starting point, not a verdict. Your context matters—and sometimes the most useful next step is a conversation.</p><CTA>Book your free strategy call</CTA></div></div></section>
      </main>
    </Shell>
  );
}

function Book() {
  usePageMeta('Book your free strategy call', 'Book a free 15-minute strategy call with Shua (Josh Ward), MD, to talk through your MCAT or premed admissions next step.');
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [context, setContext] = useState('');
  return (
    <Shell>
      <main>
        <section className="page-hero"><div className="container-wide page-hero-grid"><div className="reveal"><Eyebrow>No pitch. A real first step.</Eyebrow><h1 className="display-lg" style={{ marginTop: 21 }}>Bring the question<br />you keep <span className="accent-italic">circling.</span></h1><p className="body-lg muted">We’ll spend 15 minutes getting underneath it. You’ll leave with a sharper sense of what to do next.</p></div><div className="page-stamp reveal delay-2">FREE<br />15 MINUTES<br />ONE NEXT STEP</div></div></section>
        <section className="section"><div className="container-wide book-grid"><aside className="book-aside reveal"><Eyebrow>What happens here</Eyebrow><h2>A small room<br />for a big question.</h2><p>This is a conversation, not an audition. You do not need a perfect score, a finished draft, or a five-year plan to reach out.</p><ul className="promise-list"><li><Clock3 size={16} />A focused 15-minute conversation</li><li><MessageCircle size={16} />Space to name what feels stuck</li><li><Target size={16} />One or two practical next moves</li><li><ShieldCheck size={16} />No pressure to continue</li></ul></aside><div className="booking-card reveal delay-1"><h2>Tell me a little first.</h2><p>Use this short form and I’ll follow up with scheduling details. Fields marked required help me prepare.</p>{sent ? <div className="booking-success" data-testid="status-booking-success"><Check size={22} style={{ color: 'hsl(var(--accent-foreground))' }} /><h3>Got it, {name.split(' ')[0] || 'there'}.</h3><p>Thanks for trusting me with the context. This form is ready for the contact email and Calendly integrations to be connected.</p><p className="placeholder-note">CONTACT EMAIL PLACEHOLDER · replace submission handler</p><button type="button" className="btn-secondary" onClick={() => setSent(false)} data-testid="button-booking-reset">Send another note</button></div> : <form className="booking-form" onSubmit={(event) => { event.preventDefault(); if (name.trim() && email.trim() && context.trim()) setSent(true); }}><label className="form-label" htmlFor="booking-name">Your name <small>required</small><input id="booking-name" className="field" required value={name} onChange={(event) => setName(event.target.value)} data-testid="input-booking-name" /></label><label className="form-label" htmlFor="booking-email">Email address <small>required</small><input id="booking-email" className="field" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} data-testid="input-booking-email" /></label><label className="form-label" htmlFor="booking-context">What would you like to talk through? <small>required</small><textarea id="booking-context" className="field form-textarea" required value={context} onChange={(event) => setContext(event.target.value)} placeholder="MCAT planning, an application question, a decision..." data-testid="input-booking-context" /></label><button type="submit" className="btn-primary" data-testid="button-booking-submit">Request your free call <CalendarDays size={16} /></button><p className="placeholder-note">CALENDLY EMBED PLACEHOLDER · scheduling will appear after contact form is connected</p></form>}</div></div></section>
        <section className="section section-tint"><div className="container-narrow"><div className="embed-box reveal"><strong>CALENDLY EMBED PLACEHOLDER</strong> Paste the approved Calendly inline embed here after the contact flow is configured. It will replace this honest placeholder without changing the surrounding page.</div></div></section>
      </main>
    </Shell>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} /><Route path="/resources" component={Resources} /><Route path="/book" component={Book} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;