import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronDown,
  Clock,
  Globe2,
  HeartHandshake,
  Megaphone,
  Menu,
  Palette,
  PenLine,
  Phone,
  Search,
  Send,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
import * as homepageContent from "./data/homepageContent";

type LeadPayload = {
  source: "help" | "contact";
  fields: Record<string, string>;
};

type FormStatus = {
  type: "idle" | "error" | "success";
  message: string;
};

const errorText = "حصل خطأ أثناء الإرسال. راجع البيانات وحاول مرة أخرى.";
const successText = "تم إرسال طلبك بنجاح. سنعود إليك في أقرب وقت.";

const iconMap = {
  users: Users,
  megaphone: Megaphone,
  palette: Palette,
  camera: Camera,
  globe: Globe2,
  pen: PenLine,
};

const getCountdown = () => {
  const target = new Date("2026-05-15T23:59:59+02:00").getTime();
  const diff = Math.max(target - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const submitLead = async (payload: LeadPayload) => {
  // Phase 3 replaces this local adapter with the Sanity/CMS-backed lead handoff.
  await new Promise((resolve) => window.setTimeout(resolve, 350));
  return payload;
};

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <span className="mb-4 inline-flex rounded-full bg-[var(--sweed-pink)]/10 px-4 py-2 text-sm font-bold text-[var(--sweed-pink)]">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-black leading-tight text-[var(--sweed-purple)] md:text-5xl">{title}</h2>
      {body ? <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--sweed-silver)]">{body}</p> : null}
    </div>
  );
}

function StatusMessage({ status }: { status: FormStatus }) {
  if (status.type === "idle") return null;

  return (
    <p
      className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${
        status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
      role="status"
    >
      {status.message}
    </p>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState("الكل");
  const [activeFaq, setActiveFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [countdown, setCountdown] = useState(getCountdown);
  const [helpStatus, setHelpStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [contactStatus, setContactStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredPortfolio = useMemo(() => {
    if (activePortfolioCategory === "الكل") return homepageContent.portfolioItems;
    return homepageContent.portfolioItems.filter((item) => item.category === activePortfolioCategory);
  }, [activePortfolioCategory]);

  const visibleTestimonials = useMemo(() => {
    return Array.from({ length: 3 }, (_, offset) => {
      const index = (testimonialIndex + offset) % homepageContent.testimonials.length;
      return homepageContent.testimonials[index];
    });
  }, [testimonialIndex]);

  const visibleServices = useMemo(() => {
    return Array.from({ length: 3 }, (_, offset) => {
      const index = (serviceIndex + offset) % homepageContent.services.length;
      return homepageContent.services[index];
    });
  }, [serviceIndex]);

  const handleHelpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = Object.fromEntries(
      Array.from(data.entries()).map(([key, value]) => [key, String(value).trim()]),
    ) as Record<string, string>;

    if (!fields.name || !fields.phone) {
      setHelpStatus({ type: "error", message: errorText });
      return;
    }

    await submitLead({ source: "help", fields });
    setHelpStatus({ type: "success", message: successText });
    form.reset();
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = Object.fromEntries(
      Array.from(data.entries()).map(([key, value]) => [key, String(value).trim()]),
    ) as Record<string, string>;

    if (!fields.name || !fields.email || !fields.phone || !fields.service || !fields.message) {
      setContactStatus({ type: "error", message: errorText });
      return;
    }

    await submitLead({ source: "contact", fields });
    setContactStatus({ type: "success", message: successText });
    form.reset();
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-white text-[var(--sweed-purple)]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#hero" className="flex items-center gap-3" aria-label="سويد الرئيسية">
            <img src="/sweed-logo.png" alt="شعار سويد" className="h-12 w-auto" />
            <span className="hidden text-sm font-black text-[var(--sweed-purple)] sm:block">شريكك الاستراتيجي للنجاح</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="التنقل الرئيسي">
            {homepageContent.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-bold text-[var(--sweed-purple)] transition hover:text-[var(--sweed-pink)]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#contact" className="min-h-11 rounded-full bg-[var(--sweed-pink)] px-6 py-3 text-sm font-black text-white shadow-lg shadow-pink-200 transition hover:bg-[var(--sweed-purple)]">
              {homepageContent.heroContent.primaryCta}
            </a>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sweed-pink)]/20 text-[var(--sweed-pink)] transition hover:bg-[var(--sweed-pink)] hover:text-white" aria-label="بحث">
              <Search className="h-5 w-5" />
            </button>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sweed-purple)] text-white lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label="فتح القائمة"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen ? (
          <nav className="border-t border-slate-100 bg-white px-4 py-5 lg:hidden" aria-label="قائمة الهاتف">
            <div className="mx-auto grid max-w-7xl gap-3">
              {homepageContent.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl bg-[var(--sweed-light)] px-4 py-3 text-right font-bold text-[var(--sweed-purple)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="overflow-hidden pt-20">
        <section id="hero" className="relative min-h-[calc(100vh-5rem)] bg-[var(--sweed-purple)] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(227,37,107,0.35),transparent_35%),linear-gradient(135deg,#261B3E_0%,#2D2947_55%,#E3256B_150%)]" />
          <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1fr_0.8fr]">
            <div className="max-w-3xl">
              <p className="mb-6 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white ring-1 ring-white/20">{homepageContent.heroContent.subtitle}</p>
              <h1 className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl">{homepageContent.heroContent.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-white/80">{homepageContent.heroContent.description}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#contact" className="min-h-11 rounded-full bg-[var(--sweed-pink)] px-7 py-3 font-black text-white shadow-xl shadow-pink-950/30 transition hover:bg-[var(--sweed-orange)]">
                  {homepageContent.heroContent.primaryCta}
                </a>
                <a href="#portfolio" className="min-h-11 rounded-full border border-white/30 px-7 py-3 font-black text-white transition hover:bg-white hover:text-[var(--sweed-purple)]">
                  {homepageContent.heroContent.secondaryCta}
                </a>
                <a href="#about" className="min-h-11 rounded-full bg-white/10 px-7 py-3 font-black text-white transition hover:bg-white/20">
                  {homepageContent.heroContent.tertiaryCta}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-6 text-[var(--sweed-purple)]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-[var(--sweed-pink)]/10 px-4 py-2 text-sm font-black text-[var(--sweed-pink)]">نمو رقمي</span>
                  <BarChart3 className="h-10 w-10 text-[var(--sweed-orange)]" />
                </div>
                <div className="grid gap-4">
                  {homepageContent.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between rounded-2xl bg-[var(--sweed-light)] p-4">
                      <span className="font-bold text-[var(--sweed-silver)]">{stat.label}</span>
                      <strong className="text-3xl font-black text-[var(--sweed-pink)]">{stat.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problems" className="bg-white px-4 py-20 md:px-8">
          <SectionHeading eyebrow="مشاكلك اللي بنحلها لك" title="نحوّل تحديات التسويق لخطة نمو واضحة" />
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {homepageContent.problemCards.map((problem) => (
              <article key={problem.title} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:border-[var(--sweed-pink)] hover:shadow-xl">
                <Target className="mb-6 h-10 w-10 text-[var(--sweed-pink)]" />
                <h3 className="text-2xl font-black">{problem.title}</h3>
                <p className="mt-4 leading-8 text-[var(--sweed-silver)]">{problem.description}</p>
                <p className="mt-5 rounded-2xl bg-[var(--sweed-light)] p-4 font-bold text-[var(--sweed-purple)]">{problem.solution}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="stats" className="bg-[var(--sweed-light)] px-4 py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {homepageContent.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white p-8 text-center shadow-sm">
                <strong className="block text-5xl font-black text-[var(--sweed-pink)]">{stat.value}</strong>
                <span className="mt-3 block font-bold text-[var(--sweed-silver)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="help-request" className="bg-white px-4 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-[var(--sweed-purple)] p-6 text-white md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div>
              <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">طلب مساعدة مجاني</span>
              <h2 className="text-4xl font-black leading-tight">احنا هنساعدك ازاي؟</h2>
              <p className="mt-5 leading-8 text-white/75">سيب بياناتك واختار الخدمة المطلوبة، وفريق سويد هيتواصل معاك بخطة بداية واضحة.</p>
            </div>
            <form onSubmit={handleHelpSubmit} className="rounded-3xl bg-white p-5 text-[var(--sweed-purple)]">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 font-bold">
                  الاسم
                  <input name="name" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]" />
                </label>
                <label className="grid gap-2 font-bold">
                  رقم الموبايل
                  <input name="phone" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]" />
                </label>
              </div>
              <label className="mt-4 grid gap-2 font-bold">
                الخدمة المطلوبة
                <select name="service" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]">
                  {homepageContent.helpServices.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>
              <button className="mt-5 min-h-11 w-full rounded-full bg-[var(--sweed-pink)] px-6 py-3 font-black text-white transition hover:bg-[var(--sweed-orange)]">
                ابدأ الآن
              </button>
              <StatusMessage status={helpStatus} />
            </form>
          </div>
        </section>

        <section id="why-us" className="bg-[var(--sweed-light)] px-4 py-20 md:px-8">
          <SectionHeading eyebrow="ليش تختار سويد؟" title="فريق شامل، أفكار مختلفة، ونتائج قابلة للقياس" />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {homepageContent.whyChooseUs.map((item) => (
              <article key={item.title} className="rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Sparkles className="mb-5 h-9 w-9 text-[var(--sweed-orange)]" />
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-8 text-[var(--sweed-silver)]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="expertise" className="bg-white px-4 py-20 md:px-8">
          <SectionHeading eyebrow="خبراتنا" title="من الدراسة إلى التحليل، كل خطوة محسوبة" />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homepageContent.expertiseSteps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-slate-100 p-6 transition hover:border-[var(--sweed-pink)]">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--sweed-pink)] text-lg font-black text-white">{index + 1}</span>
                <h3 className="text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-8 text-[var(--sweed-silver)]">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="partners" className="bg-[var(--sweed-purple)] px-4 py-16 text-white md:px-8">
          <SectionHeading eyebrow="شركاء النجاح" title="علامات وثقت في طريقة سويد" />
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {homepageContent.partners.map((partner) => (
              <div key={partner} className="rounded-2xl bg-white/10 p-5 text-center font-black ring-1 ring-white/10">{partner}</div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="bg-white px-4 py-20 md:px-8">
          <SectionHeading eyebrow="أعمالنا" title="نماذج من شغل بيحول الأفكار لنتائج" />
          <div className="mx-auto mb-8 flex max-w-7xl flex-wrap justify-center gap-3">
            {homepageContent.portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActivePortfolioCategory(category)}
                className={`min-h-11 rounded-full px-5 py-2 font-bold transition ${
                  activePortfolioCategory === category ? "bg-[var(--sweed-pink)] text-white" : "bg-[var(--sweed-light)] text-[var(--sweed-purple)] hover:bg-pink-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {filteredPortfolio.map((item) => (
              <article key={item.title} className="rounded-3xl bg-[var(--sweed-light)] p-6 transition hover:shadow-xl">
                <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[var(--sweed-pink)]">{item.category}</span>
                <h3 className="mt-8 text-2xl font-black">{item.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm text-[var(--sweed-silver)]">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="bg-[var(--sweed-light)] px-4 py-20 md:px-8">
          <SectionHeading eyebrow="ازاي بنشتغل" title="خمس خطوات بسيطة من أول مكالمة لنتائج مستمرة" />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-5">
            {homepageContent.processSteps.map((step, index) => (
              <article key={step.title} className="rounded-3xl bg-white p-5 shadow-sm">
                <span className="text-4xl font-black text-[var(--sweed-pink)]">{index + 1}</span>
                <h3 className="mt-5 font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--sweed-silver)]">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonials" className="bg-white px-4 py-20 md:px-8">
          <SectionHeading eyebrow="آراء العملاء" title="كلام الناس اللي جربوا يشتغلوا مع سويد" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-3">
              {visibleTestimonials.map((testimonial) => (
                <article key={testimonial.author} className="rounded-3xl border border-slate-100 p-7 shadow-sm">
                  <div className="mb-5 flex gap-1 text-[var(--sweed-orange)]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}</div>
                  <p className="leading-8 text-[var(--sweed-silver)]">"{testimonial.quote}"</p>
                  <h3 className="mt-6 font-black">{testimonial.author}</h3>
                  <p className="text-sm text-[var(--sweed-silver)]">{testimonial.role}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <button aria-label="الشهادة السابقة" className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sweed-purple)] text-white" onClick={() => setTestimonialIndex((index) => (index + 1) % homepageContent.testimonials.length)}>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button aria-label="الشهادة التالية" className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sweed-pink)] text-white" onClick={() => setTestimonialIndex((index) => (index - 1 + homepageContent.testimonials.length) % homepageContent.testimonials.length)}>
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section id="packages" className="bg-[var(--sweed-purple)] px-4 py-20 text-white md:px-8">
          <SectionHeading eyebrow="باقاتنا" title="اختار بداية تناسب حجم شغلك" />
          <div className="mx-auto mb-10 grid max-w-3xl grid-cols-4 gap-3 text-center">
            {Object.entries(countdown).map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                <strong className="block text-3xl font-black">{String(value).padStart(2, "0")}</strong>
                <span className="text-xs text-white/70">{key}</span>
              </div>
            ))}
          </div>
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {homepageContent.packages.map((pkg) => (
              <article key={pkg.name} className={`rounded-3xl p-7 ${pkg.badge ? "bg-white text-[var(--sweed-purple)]" : "bg-white/10 ring-1 ring-white/10"}`}>
                {pkg.badge ? <span className="rounded-full bg-[var(--sweed-orange)] px-4 py-2 text-sm font-black text-white">{pkg.badge}</span> : null}
                <h3 className="mt-6 text-3xl font-black">{pkg.name}</h3>
                <p className="mt-2 text-sm opacity-70">{pkg.duration}</p>
                <div className="mt-5 flex items-end gap-3">
                  <strong className="text-4xl font-black text-[var(--sweed-pink)]">{pkg.price}</strong>
                  {pkg.oldPrice ? <span className="text-sm line-through opacity-60">{pkg.oldPrice}</span> : null}
                </div>
                <ul className="mt-6 grid gap-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-[var(--sweed-orange)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="bg-white px-4 py-20 md:px-8">
          <SectionHeading eyebrow="خدماتنا" title="كل اللي تحتاجه للنمو في مكان واحد" />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {visibleServices.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Sparkles;
              return (
                <article key={service.title} className="rounded-3xl bg-[var(--sweed-light)] p-7 transition hover:shadow-xl">
                  <Icon className="mb-6 h-10 w-10 text-[var(--sweed-pink)]" />
                  <h3 className="text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 leading-8 text-[var(--sweed-silver)]">{service.description}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <button aria-label="الخدمة السابقة" className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sweed-purple)] text-white" onClick={() => setServiceIndex((index) => (index + 1) % homepageContent.services.length)}>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button aria-label="الخدمة التالية" className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sweed-pink)] text-white" onClick={() => setServiceIndex((index) => (index - 1 + homepageContent.services.length) % homepageContent.services.length)}>
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </section>

        <section id="products" className="bg-[var(--sweed-light)] px-4 py-20 md:px-8">
          <SectionHeading eyebrow="منتجاتنا" title="حلول جاهزة لبدايات أسرع" />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
            {homepageContent.products.map((product) => (
              <article key={product.title} className="rounded-3xl bg-white p-6 shadow-sm">
                <BriefcaseBusiness className="mb-5 h-9 w-9 text-[var(--sweed-pink)]" />
                <h3 className="text-xl font-black">{product.title}</h3>
                <p className="mt-3 leading-7 text-[var(--sweed-silver)]">{product.description}</p>
                <div className="mt-5">
                  <strong className="text-2xl font-black text-[var(--sweed-pink)]">{product.price}</strong>
                  {product.oldPrice ? <span className="mr-2 text-sm text-[var(--sweed-silver)] line-through">{product.oldPrice}</span> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="bg-white px-4 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
            <div>
              <span className="mb-4 inline-flex rounded-full bg-[var(--sweed-pink)]/10 px-4 py-2 text-sm font-bold text-[var(--sweed-pink)]">من نحن</span>
              <h2 className="text-4xl font-black leading-tight">احنا بنحب شغفنا، وبيظهر في كل حاجة بنعملها</h2>
              <p className="mt-5 leading-9 text-[var(--sweed-silver)]">احنا فريق من المحترفين الشغوفين بمجال التسويق والإعلانات. بنؤمن إن كل علامة تجارية ليها قصة، ودورنا إننا نحكيها بشكل مبدع وفعّال.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {homepageContent.aboutFeatures.map((feature) => (
                <div key={feature} className="rounded-3xl bg-[var(--sweed-light)] p-6 font-black">
                  <HeartHandshake className="mb-4 h-8 w-8 text-[var(--sweed-orange)]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="bg-[var(--sweed-light)] px-4 py-20 md:px-8">
          <SectionHeading eyebrow="المدونة" title="أفكار ونصائح تساعدك تفهم التسويق بشكل أبسط" />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
            {homepageContent.blogPosts.map((post) => (
              <article key={post.title} className="rounded-3xl bg-white p-6 shadow-sm">
                <span className="rounded-full bg-[var(--sweed-pink)]/10 px-3 py-1 text-sm font-bold text-[var(--sweed-pink)]">{post.category}</span>
                <h3 className="mt-6 text-xl font-black leading-8">{post.title}</h3>
                <p className="mt-4 text-sm text-[var(--sweed-silver)]">{post.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-white px-4 py-20 md:px-8">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="إجابات سريعة قبل ما تبدأ" />
          <div className="mx-auto max-w-4xl space-y-3">
            {homepageContent.faqs.map((faq, index) => (
              <article key={faq.question} className="rounded-3xl border border-slate-100 bg-white shadow-sm">
                <button
                  className="flex min-h-11 w-full items-center justify-between gap-4 p-5 text-right font-black"
                  onClick={() => setActiveFaq((active) => (active === index ? -1 : index))}
                  aria-expanded={activeFaq === index}
                >
                  {faq.question}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[var(--sweed-pink)] transition ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === index ? <p className="px-5 pb-5 leading-8 text-[var(--sweed-silver)]">{faq.answer}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-[var(--sweed-purple)] px-4 py-20 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">تواصل معنا</span>
              <h2 className="text-4xl font-black leading-tight">مستعد تغيّر شكل علامتك التجارية؟</h2>
              <p className="mt-5 leading-8 text-white/75">ابدأ مشروعك دلوقتي وواحد من خبرائنا هيتواصل معاك في أسرع وقت.</p>
              <div className="mt-8 grid gap-4">
                <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-[var(--sweed-orange)]" /> {homepageContent.contactInfo.phone}</p>
                <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-[var(--sweed-orange)]" /> {homepageContent.contactInfo.hours}</p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="rounded-3xl bg-white p-5 text-[var(--sweed-purple)]">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 font-bold">الاسم<input name="name" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]" /></label>
                <label className="grid gap-2 font-bold">البريد الإلكتروني<input name="email" type="email" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]" /></label>
                <label className="grid gap-2 font-bold">الموبايل<input name="phone" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]" /></label>
                <label className="grid gap-2 font-bold">نوع الخدمة<select name="service" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]">{homepageContent.helpServices.map((service) => <option key={service}>{service}</option>)}</select></label>
              </div>
              <label className="mt-4 grid gap-2 font-bold">الرسالة<textarea name="message" rows={4} className="rounded-xl border-2 border-slate-100 px-4 py-3 outline-none transition focus:border-[var(--sweed-pink)]" /></label>
              <button className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--sweed-pink)] px-6 py-3 font-black text-white transition hover:bg-[var(--sweed-orange)]">
                إرسال <Send className="h-5 w-5" />
              </button>
              <StatusMessage status={contactStatus} />
            </form>
          </div>
        </section>

        <section className="bg-white px-4 py-20 md:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[linear-gradient(135deg,#261B3E,#E3256B)] p-8 text-center text-white md:p-12">
            <h2 className="text-4xl font-black leading-tight">مستعد تغيّر شكل علامتك التجارية؟</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/80">ابدأ مشروعك دلوقتي وواحد من خبرائنا هيتواصل معاك في أسرع وقت.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="min-h-11 rounded-full bg-white px-7 py-3 font-black text-[var(--sweed-pink)]">ابدأ مشروعك</a>
              <a href={`https://wa.me/${homepageContent.contactInfo.phone.replace(/\D/g, "")}`} className="min-h-11 rounded-full bg-green-500 px-7 py-3 font-black text-white">تواصل معانا على واتساب</a>
              <a href="#packages" className="min-h-11 rounded-full border border-white/30 px-7 py-3 font-black text-white">شوف أسعارنا</a>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-[var(--sweed-purple)] px-4 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div>
            <img src="/sweed-logo.png" alt="شعار سويد" className="mb-5 h-14 w-auto brightness-0 invert" />
            <p className="leading-8 text-white/70">وكالة تسويق وإعلان متكاملة. بنساعدك توصل لجمهورك المستهدف وتحقق نتائج ملموسة من خلال استراتيجيات مبتكرة.</p>
            <div className="mt-5 flex gap-3">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok].map((Icon, index) => (
                <span key={index} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><Icon /></span>
              ))}
            </div>
          </div>
          {homepageContent.footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-xl font-black">{column.title}</h3>
              <ul className="grid gap-3 text-white/70">
                {column.links.map((link) => <li key={link}>{link}</li>)}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-5 text-xl font-black">تواصل معانا</h3>
            <p className="text-white/70">{homepageContent.contactInfo.address}</p>
            <p className="mt-3 text-white/70">{homepageContent.contactInfo.phone}</p>
            <p className="mt-3 text-white/70">{homepageContent.contactInfo.email}</p>
            <div className="mt-5 rounded-2xl bg-white/10 p-5 text-center text-sm text-white/60">Map placeholder</div>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${homepageContent.contactInfo.phone.replace(/\D/g, "")}`}
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-xl shadow-green-900/25 transition hover:scale-105"
        aria-label="تواصل عبر واتساب"
      >
        <FaWhatsapp />
      </a>

      <button
        className="fixed bottom-5 right-5 z-50 hidden min-h-11 rounded-full bg-[var(--sweed-pink)] px-5 py-3 font-black text-white shadow-xl transition hover:bg-[var(--sweed-orange)] md:inline-flex"
        onClick={() => setIsPopupOpen(true)}
      >
        طلب سريع
      </button>

      {isPopupOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 text-[var(--sweed-purple)] shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">طلب سريع</h2>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sweed-light)]" onClick={() => setIsPopupOpen(false)} aria-label="إغلاق">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleHelpSubmit} className="grid gap-4">
              <input name="name" placeholder="الاسم" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]" />
              <input name="phone" placeholder="الموبايل" className="min-h-11 rounded-xl border-2 border-slate-100 px-4 outline-none transition focus:border-[var(--sweed-pink)]" />
              <textarea name="message" placeholder="رسالتك" className="rounded-xl border-2 border-slate-100 px-4 py-3 outline-none transition focus:border-[var(--sweed-pink)]" />
              <button className="min-h-11 rounded-full bg-[var(--sweed-pink)] px-6 py-3 font-black text-white">أرسل</button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
