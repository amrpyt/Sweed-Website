import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Target, MonitorSmartphone, Palette, Video } from 'lucide-react';

const Card = ({ title, desc, icon: Icon, className = "" }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`double-bezel h-full ${className}`}
  >
    <div className="double-bezel-inner h-full p-8 flex flex-col items-start text-right">
      <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-8 text-primary">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-foreground/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.div>
);

export const Features = () => {
  return (
    <section className="py-24 md:py-40 px-4 bg-background overflow-hidden" dir="rtl">
      <div className="container max-w-7xl mx-auto">
        
        {/* Problems We Solve */}
        <div className="mb-24">
          <div className="text-[12px] uppercase tracking-[0.2em] font-bold text-accent mb-4">تحديات نواجهها معك</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl leading-[1.2] mb-12">
            مشاكلك اللي بنحلهالك <br />
            <span className="text-foreground/40">بحلول رقمية ذكية.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card 
                title="بطء النمو ودعم المبيعات" 
                desc="منافسة شرسة وجمهور يبحث عن الجديد كل يوم، نضع لك استراتيجية للتفوق والتصدر." 
                icon={TrendingUp} 
              />
              <Card 
                title="إدارة الحسابات بجهد كبير" 
                desc="استهلاك الوقت في إدارة حساباتك بدون نتائج؟ اترك الإدارة لفريقنا لنوفر وقتك." 
                icon={Clock} 
              />
              <Card 
                title="إعلانات بدون نتائج" 
                desc="عبر استهداف دقيق لجمهورك وعمل إعلانات جذابة لتوفير ميزانية الإعلان بعائد حقيقي." 
                icon={Target} 
              />
          </div>
        </div>

        {/* Core Services Bento Grid */}
        <div className="mb-20">
          <div className="text-[12px] uppercase tracking-[0.2em] font-bold text-primary mb-4">خدماتنا</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl leading-[1.2]">
            كل ما تحتاجه للنمو في مكان واحد.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Card */}
          <div className="md:col-span-8 md:row-span-2">
            <motion.div className="double-bezel h-full group cursor-pointer">
              <div className="double-bezel-inner h-full p-10 flex flex-col justify-between overflow-hidden relative">
                <div className="relative z-10 text-right">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center mb-8">
                    <MonitorSmartphone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4 max-w-lg">إدارة السوشيال ميديا</h3>
                  <p className="text-foreground/60 max-w-sm mb-12 text-lg">
                    بندير حساباتك على كل المنصات ونخليها عامل جذب لجمهورك لزيادة التفاعل وبناء ولاء العملاء.
                  </p>
                </div>
                
                <div className="mt-auto relative z-10 text-right">
                  <button className="text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-foreground">
                    <Target className="w-4 h-4 text-primary" /> اكتشف المزيد
                  </button>
                </div>
                
                {/* Visual Decoration */}
                <div className="absolute top-0 left-0 w-[60%] h-full opacity-20 pointer-events-none -translate-x-1/4">
                    <img 
                      src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000" 
                      className="w-full h-full object-cover rounded-full blur-3xl saturate-200 hue-rotate-15" 
                      alt="Decoration"
                    />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sibling Cards */}
          <div className="md:col-span-4">
            <Card 
              title="الهوية البصرية" 
              desc="بتصميملك هوية بصرية كاملة تعكس شخصيتك في السوق بطريقة إبداعية." 
              icon={Palette} 
            />
          </div>
          
          <div className="md:col-span-4">
            <Card 
              title="التصوير والمونتاج" 
              desc="محتوى مرئي احترافي يخلي علامتك تبرز وسط كل المنافسين بكل سهولة." 
              icon={Video} 
            />
          </div>

        </div>
      </div>
    </section>
  );
};
