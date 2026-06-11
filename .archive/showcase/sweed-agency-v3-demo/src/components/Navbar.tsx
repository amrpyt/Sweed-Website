import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpLeft, Moon, Sun } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check initial html class
    setIsDark(document.documentElement.classList.contains('dark'));

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <>
      <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 will-change-transform ${
          isScrolled 
            ? 'top-4 w-[calc(100%-2rem)] max-w-4xl' 
            : 'top-6 w-[calc(100%-2rem)] max-w-5xl'
      }`}>
        <div className={`glass rounded-full px-4 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'py-2 shadow-lg shadow-black/5 dark:shadow-black/20' : 'py-3 shadow-none'
        }`}>
          <div className="flex items-center gap-3 pr-2" dir="ltr">
            <div className={`rounded-full bg-primary flex items-center justify-center transition-all duration-500 ${
                isScrolled ? 'w-7 h-7' : 'w-8 h-8'
            }`}>
                <div className={`bg-primary-foreground rounded-full transition-all duration-500 ${
                    isScrolled ? 'w-2.5 h-2.5' : 'w-3 h-3'
                }`} />
            </div>
            <span className={`font-bold tracking-tight text-foreground transition-all duration-500 ${
                isScrolled ? 'text-lg' : 'text-xl'
            }`}>Sweed</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-foreground/70">
            <a href="#" className="hover:text-primary transition-colors">الرئيسية</a>
            <a href="#" className="hover:text-primary transition-colors">من نحن</a>
            <a href="#" className="hover:text-primary transition-colors">خدماتنا</a>
            <a href="#" className="hover:text-primary transition-colors">أعمالنا</a>
            <a href="#" className="hover:text-primary transition-colors">المدونة</a>
          </div>

          <div className="flex items-center gap-2">
            <button 
                onClick={toggleTheme}
                className={`rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors text-foreground ${
                    isScrolled ? 'w-9 h-9' : 'w-10 h-10'
                }`}
            >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className={`hidden md:flex flex-row-reverse items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full font-bold hover:brightness-110 transition-all ${
                isScrolled ? 'px-4 py-2 text-[13px] h-9' : 'px-5 py-2 text-[14px] h-10'
            }`}>
                <ArrowUpLeft className="w-4 h-4" /> ابدأ مشروعك
            </button>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="فتح القائمة"
                className={`md:hidden rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors relative text-foreground ${
                    isScrolled ? 'w-9 h-9' : 'w-10 h-10'
                }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="x" initial={{opacity:0, rotate: -90}} animate={{opacity:1, rotate:0}} exit={{opacity:0, rotate: 90}}>
                            <X className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <motion.div key="menu" initial={{opacity:0, rotate: 90}} animate={{opacity:1, rotate:0}} exit={{opacity:0, rotate: -90}}>
                            <Menu className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col"
              dir="rtl"
            >
              <div className="flex justify-start p-6">
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors w-10 h-10"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div className="flex flex-col gap-2 px-6 text-right">
                {['الرئيسية', 'من نحن', 'خدماتنا', 'أعمالنا', 'المدونة', 'اتصل بنا'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    href="#"
                    className="text-lg font-bold text-foreground/70 hover:text-primary transition-colors py-3 border-b border-foreground/5"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
