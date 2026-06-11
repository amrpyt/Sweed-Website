import React from 'react'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ArrowUpLeft, Play } from 'lucide-react'
import { Spotify } from '@/components/ui/svgs/spotify'
import { VercelFull } from '@/components/ui/svgs/vercel'
import { SupabaseFull } from '@/components/ui/svgs/supabase'
import { Hulu } from '@/components/ui/svgs/hulu'
import { Bolt } from '@/components/ui/svgs/bolt'
import { FirebaseFull } from '@/components/ui/svgs/firebase'
import { Beacon } from '@/components/ui/svgs/beacon'
import { Claude } from '@/components/ui/svgs/claude'
import { Figma } from '@/components/ui/svgs/figma'
import { Cisco } from '@/components/ui/svgs/cisco'

export default function HeroSection() {
    return (
        <main className="overflow-x-hidden pt-6 md:pt-16" dir="rtl">
            <section>
                <div className="relative px-4">
                    <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-[70vh] lg:min-h-[85vh] px-6">
                        <div className="mx-auto w-full max-w-5xl">
                            <div className="max-w-4xl mx-auto flex flex-col justify-center items-center relative animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md mb-8">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[13px] md:text-sm font-bold text-foreground/80">شريكك الاستراتيجي للنجاح</span>
                                </div>
                                <h1 className="font-swash text-balance text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] text-foreground pb-2">
                                    نحن لا نُسوّق منتجك، <br/>
                                    بل <span className="text-primary drop-shadow-[0_0_15px_rgba(227,37,107,0.3)]">نُصنع لك</span> قصة نجاح.
                                </h1>
                                <p className="mt-8 text-balance text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl">
                                   وكالة تسويق وإعلان متكاملة تصنع لك تجربة رقمية استثنائية من الألف إلى الياء، 
                نصلك بجمهورك المستهدف ونحقق نتائج ملموسة.
                                </p>

                                <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                                    <Button
                                        size="lg"
                                        className="h-14 rounded-full px-8 text-base bg-primary text-primary-foreground hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_-5px_rgba(227,37,107,0.4)]">
                                        <a href="#link" className="flex items-center gap-2 font-bold">
                                            <span className="text-nowrap">ابدأ مشروعك</span>
                                            <ArrowUpLeft className="mr-1 size-5" />
                                        </a>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        className="h-14 rounded-full px-8 text-base font-bold bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                                        <a href="#link" className="text-nowrap flex items-center gap-2 text-foreground">
                                            <Play className="w-4 h-4 fill-foreground" /> شاهد أعمالنا
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Background Video */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl border border-black/10 lg:rounded-[3rem] dark:border-white/5 mx-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-70 dark:opacity-40"
                            src="https://videos.pexels.com/video-files/35968183/15249566_1920_1080_30fps.mp4"></video>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
                    </div>
                </div>
            </section>
            <section className="bg-background py-16">
                <div className="group relative m-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center md:flex-row gap-8">
                        <div className="md:max-w-44 md:border-l md:pl-6 border-white/10">
                            <p className="text-start text-sm text-foreground/50 font-bold uppercase tracking-widest">شركاء النجاح</p>
                        </div>
                        <div className="relative py-6 md:w-[calc(100%-11rem)] overflow-hidden" dir="ltr">
                            <InfiniteSlider
                                speedOnHover={20}
                                speed={40}
                                gap={112}>
                                <Bolt height={22} width={56} className="text-foreground/50" />
                                <VercelFull height={22} width={84} className="text-foreground/50" />
                                <SupabaseFull className="h-6 text-foreground/50" />
                                <Hulu height={18} width={56} className="text-foreground/50" />
                                <Spotify height={24} width={80} className="text-foreground/50" />
                                <FirebaseFull height={24} width={80} className="text-foreground/50" />
                                <Beacon height={24} width={80} className="text-foreground/50" />
                                <Claude height={26} width={90} className="text-foreground/50" />
                                <Figma height={24} width={24} className="text-foreground/50" />
                                <Cisco height={30} width={60} className="text-foreground/50" />
                            </InfiniteSlider>

                            <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20" />
                            <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20" />
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
