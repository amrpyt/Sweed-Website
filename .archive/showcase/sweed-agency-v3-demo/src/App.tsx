import React from 'react';
import HeroSection from './components/hero-section';
import { Features } from './components/Features';
import { Navbar } from './components/Navbar';
import { motion } from 'motion/react';
import { ArrowUpLeft, Github, Twitter, Instagram, Users, Briefcase, Calendar, Globe } from 'lucide-react';
const Stats = () => (
    <section className="py-20 border-y border-foreground/5 bg-secondary/50">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-right">
                <div className="flex flex-col items-center md:items-start gap-4 flex-1">
                    <div className="text-4xl md:text-5xl font-bold text-primary">+500</div>
                    <div className="text-foreground/70 font-medium">عميل سعيد</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-4 flex-1">
                    <div className="text-4xl md:text-5xl font-bold text-primary">+1500</div>
                    <div className="text-foreground/70 font-medium">مشروع منجز</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-4 flex-1">
                    <div className="text-4xl md:text-5xl font-bold text-primary">+8</div>
                    <div className="text-foreground/70 font-medium">سنوات خبرة</div>
                </div>
                <div className="flex flex-col items-center md:items-start gap-4 flex-1">
                    <div className="text-4xl md:text-5xl font-bold text-primary">+15M</div>
                    <div className="text-foreground/70 font-medium">وصول شهري</div>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="py-24 bg-background border-t border-foreground/5" dir="rtl">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                <div className="md:col-span-2 text-right">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                        </div>
                        <span className="font-bold tracking-tight text-foreground text-xl">سويد (SWEED)</span>
                    </div>
                    <p className="text-foreground/60 max-w-sm text-lg leading-relaxed">
                        وكالة تسويق وإعلان متكاملة. نساعدك في الوصول لجمهورك وتطوير علامتك التجارية لتحقيق أقصى نمو عبر استراتيجيات تسويق مبتكرة.
                    </p>
                </div>
                
                <div className="text-right">
                    <h4 className="text-foreground font-bold mb-8">روابط سريعة</h4>
                    <ul className="space-y-4 text-foreground/60 text-sm">
                        <li><a href="#" className="hover:text-primary transition-colors">الرئيسية</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">من نحن</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">أعمالنا</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">المدونة</a></li>
                    </ul>
                </div>

                <div className="text-right">
                    <h4 className="text-foreground font-bold mb-8">خدماتنا</h4>
                    <ul className="space-y-4 text-foreground/60 text-sm">
                        <li><a href="#" className="hover:text-primary transition-colors">إدارة السوشيال ميديا</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">الإعلانات الممولة</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">الهوية البصرية</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">بناء المواقع</a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-foreground/5">
                <div className="text-foreground/40 text-xs text-center md:text-right">
                    © 2026 حقوق الطبع محفوظة لصالح وكالة سويد للإعلان والتسويق.
                </div>
                <div className="flex gap-8 text-foreground/40 text-xs">
                    <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1"><Instagram className="w-4 h-4" /> انستجرام</a>
                    <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1"><Twitter className="w-4 h-4" /> اكس</a>
                    <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1"><Github className="w-4 h-4" /> تيك توك</a>
                </div>
            </div>
            
            <div className="mt-32 text-center select-none pointer-events-none">
                <h2 className="text-[20vw] font-bold text-foreground/[0.02] tracking-tighter leading-none" dir="ltr">
                    SWEED
                </h2>
            </div>
        </div>
    </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Texture Overlays */}
      <div className="noise" />
      
      <Navbar />

      <main>
        <HeroSection />
        
        {/* Simple Marquee */}
        <div className="py-12 border-y border-foreground/5 bg-foreground/[0.01] overflow-hidden whitespace-nowrap" dir="ltr">
            <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-16 text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/30"
            >
                {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className="flex gap-16">
                        <span>تسويق الكتروني</span>
                        <span>بناء هوية بصرية</span>
                        <span>اعطنا رؤيتك ونصنعها</span>
                        <span>تحسين محركات البحث</span>
                        <span>ذكاء اصطناعي</span>
                    </div>
                ))}
            </motion.div>
        </div>

        <Features />
        
        <Stats />

        {/* Large Quote / Philosophy Section */}
        <section className="py-40 px-4" dir="rtl">
            <div className="container max-w-7xl mx-auto text-center border border-foreground/5 bg-foreground/[0.02] rounded-[3rem] py-32 px-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div className="text-[12px] uppercase tracking-[0.2em] font-bold text-accent mb-8">خطوتك القادمة</div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.3] max-w-4xl mx-auto mb-16">
                        مستعد تغيّر شكل <br />
                        <span className="text-foreground/40">علامتك التجارية؟</span>
                    </h2>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex justify-center"
                >
                    <button className="group relative flex items-center gap-4 bg-primary text-primary-foreground px-8 py-5 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(227,37,107,0.5)]">
                        ابدأ مشروعك الآن
                        <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </button>
                </motion.div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
