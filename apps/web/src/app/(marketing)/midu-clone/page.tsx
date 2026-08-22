import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import styles from "./midu-clone.module.css";

export const metadata: Metadata = {
  title: "Midu-style studio clone | SWEED",
  description:
    "A rights-safe Midu-inspired studio landing page reference rebuilt in Next.js for SWEED.",
};

const projects = [
  {
    title: "Fixa ADHD Planner",
    type: "Web design / No-code / App concept",
    category: "AI, Productivity",
    tone: "orange",
    number: "01",
  },
  {
    title: "Kiwe Bank",
    type: "App design / Web design / 3D design",
    category: "Finance, Banking",
    tone: "lime",
    number: "02",
  },
  {
    title: "Nova Pay",
    type: "App design / Product system",
    category: "Fintech, Payment",
    tone: "blue",
    number: "03",
  },
  {
    title: "Pawradise",
    type: "App concept / AI assistant",
    category: "Pet care, AI",
    tone: "rose",
    number: "04",
  },
];

const testimonials = [
  {
    quote:
      "They translated complex flows into something simple enough for users and polished enough for the boardroom.",
    name: "Youssef Zakaria",
    role: "Banking founder",
  },
  {
    quote:
      "Not just talented designers. They challenged weak assumptions and made every screen earn its place.",
    name: "Elizabeth Buzina",
    role: "Creative operator",
  },
  {
    quote:
      "Fast, direct, and very easy to review. The process felt calm even when the deadline was not.",
    name: "Meagan Wos",
    role: "Growth lead",
  },
  {
    quote:
      "They turned loose notes into a sharp digital product story our customers understood immediately.",
    name: "Sam P.",
    role: "Platform founder",
  },
];

const tools = [
  "Webflow",
  "Figma",
  "Cinema 4D",
  "Framer",
  "Claude",
  "After Effects",
  "Photoshop",
  "PowerPoint",
  "AI Studio",
  "Illustrator",
];

const services = [
  {
    title: "UX/UI Design",
    text: "Every screen has a job. We turn research, flows, and hierarchy into interfaces people can trust.",
  },
  {
    title: "Corporate Design",
    text: "Pitch decks, identities, and visual systems that make the company feel serious before the meeting starts.",
  },
  {
    title: "No-code Development",
    text: "Responsive Webflow, Framer, and Next.js builds that move from concept to live product without losing detail.",
  },
  {
    title: "3D Design",
    text: "Dimensional product visuals, cinematic motion, and interface objects that give a digital brand depth.",
  },
];

const plans = [
  {
    name: "Standard Plan",
    price: "$3000",
    rhythm: "/ per month",
    accent: "orange",
    points: [
      "Up to 45 design hours per month",
      "One active task at a time",
      "Progress updates every 48 hours",
      "Unlimited revisions inside scope",
    ],
  },
  {
    name: "Pro Plan",
    price: "$5000",
    rhythm: "/ per month",
    accent: "yellow",
    points: [
      "Up to 70 design hours per month",
      "Priority scheduling",
      "Faster turnaround on urgent work",
      "Unlimited revisions inside scope",
    ],
  },
  {
    name: "Project sprint",
    price: "$3500+",
    rhythm: "/ per project",
    accent: "red",
    points: [
      "Fixed scope and timeline",
      "Clear milestones",
      "50% to start, 50% on delivery",
      "Development-ready handoff",
    ],
  },
];

const faqs = [
  {
    question: "What is this page?",
    answer:
      "A rights-safe rebuild of the captured reference direction. It follows the layout language, pacing, spacing, and section rhythm, while using original implementation and replaceable copy.",
  },
  {
    question: "Can it become the real SWEED homepage?",
    answer:
      "Yes. The page is isolated on its own route first, so it can be reviewed before replacing the production homepage.",
  },
  {
    question: "Why not copy the original assets?",
    answer:
      "The capture is useful for inspection and migration planning, but shipping another studio's brand assets or exact copy would create rights and trust issues.",
  },
  {
    question: "Does it work without JavaScript animation libraries?",
    answer:
      "Yes. The first version uses CSS motion, semantic sections, responsive grids, details-based FAQ, and no extra runtime dependency.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.arrowIcon}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function Keycap({ label, accent }: { label: string; accent: string }) {
  return (
    <span className={`${styles.keycap} ${styles[`keycap_${accent}`]}`}>
      <span>{label}</span>
    </span>
  );
}

export default function MiduClonePage() {
  return (
    <>
      <LegacyHeader page="home" />
      <main className={styles.page}>

      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={styles.heroRail} aria-hidden="true">
          <span>Global product design studio</span>
          <span>London / Cairo</span>
          <span>Scroll to explore</span>
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Research-led digital product studio</p>
          <h1 id="hero-title">Design for teams ready to become sharper than their category.</h1>
          <div className={styles.heroSummaryGrid}>
            <p>
              We craft interfaces, websites, and brand systems that help ambitious teams explain their value fast and launch with confidence.
            </p>
            <ButtonLink href="#pricing" size="hero">Explore plans</ButtonLink>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.orbOne} />
          <div className={styles.orbTwo} />
          <div className={styles.phoneCard}>
            <div className={styles.phoneTop} />
            <div className={styles.phoneScreen}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.keycapStack}>
            <Keycap label="UX" accent="orange" />
            <Keycap label="UI" accent="yellow" />
            <Keycap label="3D" accent="red" />
          </div>
        </div>
      </section>

      <section className={styles.about} aria-labelledby="about-title">
        <div className={styles.sectionLabel}>About us.</div>
        <div>
          <h2 id="about-title">We turn ambitious ideas into products people understand, trust, and remember.</h2>
          <p>
            The reference site uses a calm editorial rhythm: large display type, sparse navigation, oversized visual cards, proof-heavy sections, and pricing presented as physical objects. This rebuild keeps that system and adapts it to SWEED.
          </p>
          <a className={styles.textLink} href="#services">
            See how we work <ArrowIcon />
          </a>
        </div>
      </section>

      <section className={styles.workSection} id="work" aria-labelledby="work-title">
        <div className={styles.sectionIntro}>
          <h2 id="work-title">Our highlights. Recent projects we are proud of.</h2>
          <p>Large cards, short metadata, clear categories, and visual depth create the same portfolio pacing without copying original assets.</p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article className={`${styles.projectCard} ${styles[`project_${project.tone}`]}`} key={project.title}>
              <div className={styles.projectMedia}>
                <span className={styles.projectNumber}>{project.number}</span>
                <div className={styles.projectDevice}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={styles.projectBody}>
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <span>{project.category}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="trust-title">
        <div className={styles.trustSticky}>
          <p>Trusted by</p>
          <h2 id="trust-title">20+ companies.</h2>
          <span>Why clients rely on us</span>
        </div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <figure className={styles.testimonial} key={item.name}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span className={styles.avatar}>{item.name.slice(0, 1)}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.toolsSection} aria-label="Tools and services">
        <div className={styles.marquee} aria-hidden="true">
          {[...tools, ...tools].map((tool, index) => (
            <span key={`${tool}-${index}`}>{tool}</span>
          ))}
        </div>
        <div className={styles.servicesIntro} id="services">
          <h2>Our tools & your brand.</h2>
          <p>
            We design digital products with intuitive UX, sharp UI, immersive visuals, and motion that supports the story instead of distracting from it.
          </p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <article className={styles.serviceCard} key={service.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.pricingSection} id="pricing" aria-labelledby="pricing-title">
        <div className={styles.sectionIntro}>
          <h2 id="pricing-title">Choose your pace: ongoing partnership or focused sprint.</h2>
          <p>Pricing cards use the captured reference pattern: simple offer models, tactile keycap visuals, and feature lists aligned inside the card.</p>
        </div>
        <div className={styles.planGrid}>
          {plans.map((plan) => (
            <article className={styles.planCard} key={plan.name}>
              <div className={styles.planHeader}>
                <span>{plan.name}</span>
                <Keycap label="Select" accent={plan.accent} />
              </div>
              <h3>{plan.price}</h3>
              <p>{plan.rhythm}</p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ButtonLink href="#contact" size="compact">Select plan</ButtonLink>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection} id="faq" aria-labelledby="faq-title">
        <div className={styles.sectionIntro}>
          <h2 id="faq-title">Frequently Asked Questions</h2>
          <p>Native disclosure controls keep the page accessible and keyboard-friendly.</p>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details className={styles.faqItem} key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <ArrowIcon />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

        <section className={styles.footer} id="contact" aria-label="Contact SWEED Studio">
          <div>
            <span>London / Cairo</span>
            <h2>Design for teams ready to become sharper than their category.</h2>
          </div>
          <ButtonLink href="mailto:hello@sweed.example" size="compact">Get in touch</ButtonLink>
          <p>2026 SWEED Studio. Reference rebuild for internal review.</p>
        </section>
      </main>
      <LegacyFooter />
    </>
  );
}
