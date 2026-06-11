import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpLeft, Play } from 'lucide-react';
import Silk from './Silk';

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-32 pb-24 px-4 overflow-hidden">
      {/* Silk Background */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={3}
          scale={1}
          color="#1a1a2e"
          noiseIntensity={1.5}
          rotation={0.5}
        />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-[55%] text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[12px] font-bold text-foreground/80">شريكك الاستراتيجي للنجاح</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] mb-8 text-balance">
                نحن لا نُسوّق منتجك، <br /> 
                بل <span className="text-primary">نُصنع لك</span> قصة نجاح.
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/60 max-w-[45ch] mb-12 leading-relaxed">
                وكالة تسويق وإعلان متكاملة تصنع لك تجربة رقمية استثنائية من الألف إلى الياء، 
                نصلك بجمهورك المستهدف ونحقق نتائج ملموسة لحجم أعمالك.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center gap-4 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold transition-all duration-300"
                >
                  ابدأ مشروعك
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.button>
                
                <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-foreground/10 hover:bg-foreground/5 text-foreground transition-colors font-bold">
                  <Play className="w-4 h-4 text-accent fill-accent" />
                  شاهد أعمالنا
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-[45%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="double-bezel relative aspect-square md:aspect-video lg:aspect-[4/5] group"
            >
              <div className="double-bezel-inner w-full h-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000" 
                  alt="Sweed Business Expansion" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent " />
                
                <div className="absolute bottom-8 right-8 left-8">
                  <div className="glass p-6 rounded-3xl flex flex-row-reverse items-center justify-between">
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-white/80 mb-1">حملات تسويقية</div>
                      <div className="text-lg font-bold text-white">إطلاق منتجات لـ 150+ عميل</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      <ArrowUpLeft className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
