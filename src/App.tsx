import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Menu,
  X,
  Search,
  PenTool,
  Share2,
  MonitorSmartphone,
  Lightbulb,
  Layout,
  ChevronDown,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  CheckCircle2,
  Star,
  Activity,
  Sparkles,
  Coffee,
  Sofa,
  MessageSquare,
  Calendar,
  PenBox,
  Target
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-xl font-bold tracking-tight">Marketra</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="text-gray-900">About</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Case Studies</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Services</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Blog</a>
        </div>
        
        <button className="hidden md:flex bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
          Contact Us
        </button>
        
        <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-lg">
          <a href="#" className="text-gray-900 font-medium">About</a>
          <a href="#" className="text-gray-600 font-medium">Case Studies</a>
          <a href="#" className="text-gray-600 font-medium">Services</a>
          <a href="#" className="text-gray-600 font-medium">Blog</a>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors w-full">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-600/10 -z-10" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600 opacity-30 blur-[120px] rounded-full -z-10" />
    
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
        Smart <span className="text-blue-600">Digital Marketing</span> that turns strategy into growth.
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        We combine strategy, creativity, and performance marketing to help digital brands grow, compete, and scale with confidence.
      </p>
      
      <div className="relative max-w-5xl mx-auto mt-16">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/50 backdrop-blur-sm p-4">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3" 
            alt="Dashboard Preview" 
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            About Marketra®
          </div>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight">
            Marketra® crafts smart marketing strategies that help brands grow, connect, and stand out. From bold ideas to data-driven results, we blend creativity with strategy to <span className="text-gray-400">make your message unforgettable.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 lg:pt-12">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Happy Clients
            </div>
            <div className="text-5xl font-medium text-blue-600">600+</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Projects Delivered
            </div>
            <div className="text-5xl font-medium text-blue-600">200+</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Client Satisfaction
            </div>
            <div className="text-5xl font-medium text-blue-600">95%</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Industries = () => {
  const industries = [
    { name: "Man Lifestyle Brand", time: "Working for 6 years", tag: "360° marketing", icon: Activity },
    { name: "Beauty Brand", time: "Working for 2 years", tag: "Web Design", icon: Sparkles },
    { name: "Coffee Brand", time: "Working for 4 years", tag: "360° marketing", icon: Coffee },
    { name: "Furniture Brand", time: "Working for 3 years", tag: "Web Optimization", icon: Sofa },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Collaborations
          </div>
          <h2 className="text-4xl font-medium">Trusted across industries.</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <div key={i} className="bg-gray-50 rounded-3xl p-8 flex flex-col h-64 hover:bg-gray-100 transition-colors">
              <div className="mb-auto">
                <h3 className="font-medium mb-1">{ind.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{ind.time}</p>
                <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-medium shadow-sm">{ind.tag}</span>
              </div>
              <div className="mt-8 flex justify-center text-gray-400">
                <ind.icon className="w-12 h-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { id: '01', title: 'Search Engine Optimization', desc: 'Rank higher on Google, increase organic traffic, and get found by the right audience.', icon: Search },
    { id: '02', title: 'Content Marketing', desc: 'Engage and convert through compelling blog posts, articles, and visual content.', icon: PenTool },
    { id: '03', title: 'Social Media Marketing', desc: 'Grow your online presence and build a community across platforms.', icon: Share2 },
    { id: '04', title: 'Paid Advertising', desc: 'Run high-converting ad campaigns on Google, Facebook, and other networks to drive leads and sales.', icon: MonitorSmartphone },
    { id: '05', title: 'Creative Brand Strategy', desc: 'Craft a powerful identity with positioning, messaging, and visual branding that stands out.', icon: Lightbulb },
    { id: '06', title: 'Web Design & Optimization', desc: 'Design stunning, fast-loading websites optimized for user experience and conversions.', icon: Layout },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Services
            </div>
            <h2 className="text-4xl md:text-5xl font-medium max-w-md leading-tight">Everything you need to grow.</h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-600 mb-6">From strategy to execution, we offer a full suite of marketing services designed to grow your brand, reach your audience, and drive real results.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
              Contact us <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-50 rounded-3xl p-8 relative group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="absolute top-8 right-8 text-4xl font-light text-gray-200 group-hover:text-blue-100 transition-colors">{service.id}</div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Works
          </div>
          <h2 className="text-4xl md:text-5xl font-medium max-w-md leading-tight">Real people,<br/>real results.</h2>
        </div>
        <div className="max-w-md flex flex-col items-start lg:items-end">
          <p className="text-gray-600 mb-6 lg:text-right">From strategy to execution, we offer a full suite of marketing services designed to grow your brand, reach your audience, and drive real results.</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
            View all works <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-600 rounded-[2rem] p-4 md:p-8 flex flex-col lg:flex-row gap-8 items-center text-white overflow-hidden">
          <div className="flex-1 p-4 md:p-8">
            <div className="flex gap-2 mb-12">
              <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">E-commerce</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">SEO</span>
            </div>
            <div className="text-6xl md:text-7xl font-medium mb-4 flex items-start gap-2">
              140% <ArrowUpRight className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-medium mb-8 max-w-md">Scaling E-Commerce Growth for UrbanThread</h3>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto text-center">
              Read Full Case Study
            </button>
          </div>
          <div className="flex-1 w-full">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3" alt="Case Study" className="w-full h-[400px] object-cover rounded-2xl" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-[2rem] p-4 md:p-8 flex flex-col lg:flex-row-reverse gap-8 items-center overflow-hidden">
          <div className="flex-1 p-4 md:p-8">
            <div className="flex gap-2 mb-12">
              <span className="px-4 py-1.5 bg-white rounded-full text-sm font-medium shadow-sm">Supplements</span>
              <span className="px-4 py-1.5 bg-white rounded-full text-sm font-medium shadow-sm">Influencer Marketing</span>
            </div>
            <div className="text-6xl md:text-7xl font-medium mb-4 flex items-start gap-2 text-gray-900">
              80% <ArrowUpRight className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-medium mb-8 max-w-md text-gray-900">Launching Globally with Elixify Supplements</h3>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto text-center">
              Read Full Case Study
            </button>
          </div>
          <div className="flex-1 w-full">
            <img src="https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3" alt="Case Study" className="w-full h-[400px] object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Smart Steps
          </div>
          <h2 className="text-4xl md:text-5xl font-medium max-w-md leading-tight">Everything you need to grow.</h2>
        </div>
        <div className="max-w-md flex flex-col items-start lg:items-end">
          <p className="text-gray-600 lg:text-right">From strategy to execution, we offer a full suite of marketing services designed to grow your brand, reach your audience, and drive real results.</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-3xl p-8 lg:row-span-2">
          <h3 className="font-medium mb-2">Plan your growth</h3>
          <p className="text-sm text-gray-500 mb-8">Clear steps to scale smart and fast.</p>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium text-sm">October 2023</div>
              <div className="flex gap-1">
                <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center text-xs text-gray-400">&lt;</div>
                <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center text-xs text-gray-400">&gt;</div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className={`aspect-square flex items-center justify-center rounded-full ${i === 14 ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-gray-600'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-3xl p-8 lg:col-span-2">
          <h3 className="font-medium mb-2">Our 4-step plan</h3>
          <p className="text-sm text-gray-500 mb-8">A simple path to smart, scalable growth.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Discuss', icon: MessageSquare },
              { name: 'Plan', icon: Calendar },
              { name: 'Produce', icon: PenBox },
              { name: 'Succeed', icon: Target }
            ].map((step, i) => (
              <div key={step.name} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-sm text-gray-400 mb-4">0{i + 1}</div>
                <div className="w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="font-medium">{step.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <div className="text-7xl font-medium text-blue-600 mb-2">99%</div>
          <div className="font-medium text-gray-600">Project Success Rate</div>
        </div>
        
        <div className="bg-blue-600 rounded-3xl p-8 flex items-center justify-center overflow-hidden relative min-h-[250px]">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-48 h-48"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
              <text className="text-[10px] font-bold uppercase tracking-widest fill-white">
                <textPath href="#circlePath" startOffset="0%">
                  Marketing • Social Media • Web Design • SEO • ADS • 
                </textPath>
              </text>
            </svg>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-lg">
              <Star className="w-8 h-8 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Team = () => {
  const team = [
    { name: 'Diya Maryam', role: 'Founder & CEO', quote: 'Who executes ideas and brings results.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
    { name: 'Ethan Miles', role: 'Marketing Manager', quote: 'Who gets you found by the right people.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800' },
    { name: 'Tina Tuhfa', role: 'Head of Design', quote: 'Who turns every click into a valuable conversion.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Mason Reid', role: 'Lead Copywriter', quote: 'Who writes with purpose and lasting impact.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Noah Bennett', role: 'Ad Campaign Manager', quote: 'Who turns clicks into loyal customers.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Caleb Morgan', role: 'SEO Consultant', quote: 'Who shapes how the world sees you.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Team
            </div>
            <h2 className="text-4xl md:text-5xl font-medium max-w-md leading-tight">Your growth partners.</h2>
          </div>
          <div className="max-w-md flex flex-col items-start lg:items-end">
            <p className="text-gray-600 lg:text-right mb-6">Marketra, our team is a blend of strategists, creators, and problem-solvers — all dedicated to delivering meaningful marketing results. We believe collaboration fuels innovation, and our experts are here to turn your ideas into impact.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
              More about us <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <div key={member.name} className="bg-gray-50 rounded-3xl p-4 flex flex-col">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover rounded-2xl mb-6" />
              <p className="text-lg font-medium mb-6 px-2">"{member.quote}"</p>
              <div className="mt-auto flex items-center justify-between px-2 pb-2">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
                <div className="flex gap-2">
                  <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors shadow-sm">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors shadow-sm">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { name: 'Essentials', price: '$2,500', features: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Paid Advertising', 'Web Design & Optimization'], highlighted: false },
    { name: 'Accelerator', price: '$5,000', features: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Brand Strategy', 'Paid Advertising', 'Web Design & Optimization'], highlighted: false },
    { name: 'Dominance', price: '$10,000', features: ['Search Engine Optimization (SEO)', 'Content Marketing', 'Social Media Marketing', 'Brand Strategy', 'Paid Advertising', 'Web Design & Optimization'], highlighted: true },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Pricing
          </div>
          <h2 className="text-4xl font-medium">Transparent pricing, tangible value.</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-3xl p-8 flex flex-col ${plan.highlighted ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-900'}`}>
              <div className="flex items-center gap-2 text-sm font-medium mb-6">
                <span className={`w-1.5 h-1.5 rounded-full ${plan.highlighted ? 'bg-white' : 'bg-blue-600'}`} />
                {plan.name}
              </div>
              <div className="mb-8">
                <div className="text-sm font-medium mb-4">Services Included</div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.highlighted ? 'text-blue-300' : 'text-gray-400'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-8">
                <div className="flex items-baseline gap-1 mb-6 justify-center">
                  <span className="text-4xl font-medium">{plan.price}</span>
                  <span className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>/month</span>
                </div>
                <button className={`w-full py-3 rounded-full font-medium transition-colors ${plan.highlighted ? 'bg-white text-blue-600 hover:bg-gray-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Contact us
                </button>
                <p className={`text-center text-xs mt-4 ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>
                  Need a custom plan? Contact us.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface FAQType {
  q: string;
  a: string;
}

const FAQItem: React.FC<{ faq: FAQType, isOpen: boolean }> = ({ faq, isOpen: defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-2xl bg-gray-50 overflow-hidden">
      <button 
        className="w-full px-6 py-4 flex items-center justify-between font-medium text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {faq.q}
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-4 text-gray-600 text-sm"
          >
            {faq.a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { q: 'What services does your digital marketing agency offer?', a: 'We provide a comprehensive range of services, including Search Engine Optimization (SEO), Content Marketing, Social Media Marketing, Brand Strategy, Paid Advertising (PPC), and Web Design & Optimization.' },
    { q: 'Do you offer ongoing marketing contracts or one-time projects?', a: 'Yes, we offer both depending on your needs. We can work on a project basis or provide ongoing retainer services.' },
    { q: 'How long does it take to see results from SEO efforts?', a: 'Typically 3-6 months for significant results, though you may see initial improvements sooner depending on your industry and competition.' },
    { q: 'What is PPC advertising, and how can it benefit my business?', a: 'Pay-per-click advertising allows you to reach targeted audiences quickly by placing ads on search engines and social platforms, paying only when someone clicks.' },
    { q: 'How will we communicate and collaborate during our partnership?', a: 'We use dedicated Slack channels, weekly check-ins, and monthly comprehensive reports to keep you fully informed.' },
    { q: 'How long does it take to see results from digital marketing?', a: 'Results vary by channel, but you can expect initial traction within the first 30 days for paid campaigns, and 3-6 months for organic strategies.' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              FAQ
            </div>
            <h2 className="text-4xl font-medium mb-8">We've got the<br/>answers.</h2>
            
            <div className="bg-blue-600 rounded-3xl p-8 text-white">
              <div className="flex -space-x-3 mb-6">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-full border-2 border-blue-600 object-cover" alt="Team member" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-full border-2 border-blue-600 object-cover" alt="Team member" />
              </div>
              <h3 className="text-2xl font-medium mb-6">Didn't get the answer you were looking for?</h3>
              <button className="w-full bg-white text-blue-600 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors mb-4">
                Talk with human
              </button>
              <p className="text-xs text-blue-200 text-center">
                We're here to answer it should take between 1 to 2 working days.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} isOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { quote: "Marketra helped us cut through the noise. Their digital strategies didn't just bring us visibility—they brought us the right kind of traffic. We saw a noticeable jump in leads within the first month.", name: "Jason Lee", role: "Founder, Lee Tech Solutions" },
    { quote: "We partnered with Marketra to improve our online marketing efforts, and the results exceeded expectations. Their team was sharp, strategic, and always one step ahead. Our ROI has never looked better.", name: "Michael Torres", role: "Marketing Director, GreenHive Co." },
    { quote: "We're a small business with a big dream, and Marketra made sure that dream reached the right audience. From branding to social media, their team nailed it.", name: "Daniel Reed", role: "Owner, Brew & Bean Coffeehouse" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Testimonial
            </div>
            <h2 className="text-4xl md:text-5xl font-medium">Words that<br/>inspire us.</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 max-w-xs">Real feedback from real people. Discover how our design solutions have made a lasting impact on brands and businesses just like yours.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap hidden md:flex">
              View Case Studies <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-3xl p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <div className="text-sm text-gray-400">0{i + 1}</div>
              </div>
              <p className="text-lg font-medium mb-12 flex-1">{t.quote}</p>
              <div>
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    { title: "How Brand Strategy Impacts Business Growth", date: "July 2025", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80&w=1000" },
    { title: "The Rise of Micro-Influencers in Digital Campaigns", date: "June 2025", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" },
    { title: "Why Your Brand Needs a Visual Identity", date: "May 2025", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Blog
            </div>
            <h2 className="text-4xl md:text-5xl font-medium">Insights from<br/>the digital edge.</h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm text-gray-500 max-w-xs md:text-right">Explore marketing trends, strategies, and expert tips to help your brand grow faster and smarter in the digital world.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-3xl mb-6">
                <img src={post.image} alt={post.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/50 -z-10" />
    <div className="container mx-auto px-4 text-center">
      <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center mb-8 rotate-12">
        <Star className="w-8 h-8 text-white fill-white" />
      </div>
      <h2 className="text-5xl md:text-7xl font-medium mb-12 max-w-3xl mx-auto leading-tight">
        Ready to grow bigger, faster, smarter?
      </h2>
      <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors mx-auto text-lg">
        Contact Us <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white pt-24 pb-8 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-blue-600/20 to-transparent -z-10" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-32">
        <div className="col-span-2">
          <h4 className="font-medium mb-6">Info & Address</h4>
          <p className="text-sm text-gray-600 mb-2">1320 Oak Rd, Anchorage,</p>
          <p className="text-sm text-gray-600 mb-4">Alaska, United States</p>
          <p className="text-sm text-gray-600 mb-2">+1 907 555 0198</p>
          <p className="text-sm text-gray-600">hello@marketra.com</p>
        </div>
        <div>
          <h4 className="font-medium mb-6">Social Links</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Twitter X</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-6">Navigation</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-6">Legal</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            <li className="pt-4">© 2025 Marketra</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="mt-16 text-center w-full overflow-hidden">
      <h2 className="text-[15vw] font-bold leading-none tracking-tighter text-blue-900/10 select-none">
        Marketra<sup className="text-[6vw]">®</sup>
      </h2>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Industries />
        <Services />
        <CaseStudies />
        <Process />
        <Team />
        <Pricing />
        <FAQ />
        <Testimonials />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

