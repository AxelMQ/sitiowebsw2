import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Terminal, Cpu, Play, CheckCircle, Flame, Server, ShieldCheck, Database } from 'lucide-react';
import contentData from '../data/content.json';
import DynamicIcon from '../components/DynamicIcon';

export default function Home() {
  const { home } = contentData;
  const { hero, features, services } = home;

  // State for simulated live server vitals
  const [activeTab, setActiveTab] = useState('config');
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memoryUsage, setMemoryUsage] = useState(48.2);
  const [latency, setLatency] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => Math.max(5, Math.min(95, prev + (Math.random() * 12 - 6))));
      setMemoryUsage((prev) => Math.max(30, Math.min(80, prev + (Math.random() * 2.4 - 1.2))));
      setLatency((prev) => Math.max(4, Math.min(15, Math.round(prev + (Math.random() * 4 - 2)))));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Function to resolve image URLs, supporting absolute paths (external URLs) and relative paths (e.g. from Strapi/CMS)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
    // Check if it's a full URL or data URI
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // If it's a relative path (e.g. /uploads/image.png) from a CMS like Strapi,
    // we resolve it using the CMS base URL from env variables, or default to localhost
    const cmsBaseUrl = import.meta.env.VITE_CMS_URL || 'http://localhost:1337';
    return `${cmsBaseUrl}${imagePath}`;
  };

  return (
    <div className="relative overflow-hidden pb-24 pt-8">
      {/* Background Soft Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-teal-500/5 blur-[120px] animate-pulse-slow"></div>
      <div className="absolute top-[40%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]"></div>
      <div className="absolute bottom-[5%] left-[10%] -z-10 h-[700px] w-[700px] rounded-full bg-teal-500/5 blur-[150px]"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-60"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* PREMIUM ASYMMETRIC HERO SECTION */}
        <section 
          className="relative overflow-hidden rounded-3xl border border-slate-200/50 shadow-xl my-6 bg-cover bg-center min-h-[500px] md:min-h-[600px] flex items-center"
          style={{ backgroundImage: `url(${getImageUrl(hero.image)})` }}
        >
          {/* Overlay gradient for readability and premium look */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/98 via-[#0A1931]/92 to-[#0A1931]/30 z-0"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20 md:py-28 px-8 sm:px-12 w-full">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
              <div className="inline-flex items-center space-x-2 rounded-full bg-teal-500/10 border border-teal-400/30 px-4 py-1.5 text-xs text-teal-300 mb-6 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-teal-400 animate-pulse" />
                <span className="font-semibold tracking-wider font-mono">SYS_CORE::LUMOS_ENG v2.0</span>
              </div>

              <h1 className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.05] text-white">
                Código Limpio.<br />
                <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-300 bg-clip-text text-transparent">Software Mágico.</span>
              </h1>

              <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                En <span className="text-teal-400 font-bold">Lumos Logic</span> diseñamos soluciones a medida mediante arquitectura cloud native e inteligencia artificial robusta, iluminando tus procesos empresariales con claridad técnica.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold shadow-[0_10px_20px_rgba(20,184,166,0.15)] hover:shadow-[0_15px_30px_rgba(20,184,166,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all text-sm cursor-pointer flex items-center gap-2"
                >
                  <span>{hero.ctaPrimary}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/support"
                  className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-teal-400/50 text-white font-bold backdrop-blur-sm shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all text-sm"
                >
                  {hero.ctaSecondary}
                </Link>
              </div>
            </div>

          {/* Right Column: Live Vitals Terminal Widget (Remains dark for terminal geek look) */}
          <div className="lg:col-span-5 w-full animate-float">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-teal-500/30 to-indigo-600/30 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
              <div className="bg-[#07050F]/95 rounded-[23px] overflow-hidden">
                
                {/* Header of IDE Terminal */}
                <div className="flex items-center justify-between bg-[#0F0D24] px-4 py-3.5 border-b border-purple-500/10">
                  <div className="flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500/60"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500/60"></div>
                  </div>
                  <div className="flex space-x-2 text-[10px] font-mono text-slate-500">
                    <button 
                      onClick={() => setActiveTab('config')} 
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeTab === 'config' ? 'bg-purple-950/60 text-purple-300 border border-purple-500/20 font-bold' : 'hover:text-slate-300'}`}
                    >
                      lumos.json
                    </button>
                    <button 
                      onClick={() => setActiveTab('vitals')} 
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${activeTab === 'vitals' ? 'bg-purple-950/60 text-purple-300 border border-purple-500/20' : 'hover:text-slate-300'}`}
                    >
                      runtime.vitals
                    </button>
                  </div>
                </div>

                {/* Terminal Content Screen */}
                <div className="p-6 font-mono text-xs text-slate-300 min-h-[220px] flex flex-col justify-between">
                  {activeTab === 'config' ? (
                    <div className="space-y-1">
                      <p className="text-purple-400"><span className="text-slate-600">01</span> <span className="text-amber-400">const</span> lumosCore = &#123;</p>
                      <p className="text-purple-300"><span className="text-slate-600">02</span>   engine: <span className="text-emerald-400">"Gemini-1.5-Flash"</span>,</p>
                      <p className="text-purple-300"><span className="text-slate-600">03</span>   security: <span className="text-emerald-400">"End-to-End Cryptography"</span>,</p>
                      <p className="text-purple-300"><span className="text-slate-600">04</span>   infrastructure: <span className="text-emerald-400">"Cloud-Native Serverless"</span>,</p>
                      <p className="text-purple-300"><span className="text-slate-600">05</span>   latencyTarget: <span className="text-amber-400">&lt;10ms</span></p>
                      <p className="text-purple-400"><span className="text-slate-600">06</span> &#125;;</p>
                      <p className="text-slate-500 mt-2">// Conexión segura establecida...</p>
                      <p className="text-emerald-400 flex items-center mt-1"><Play className="h-3 w-3 mr-1.5 fill-emerald-500 text-emerald-400" /> Lumos Logic core running successfully.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-purple-400 flex items-center"><Cpu className="h-3.5 w-3.5 mr-1" /> Uso de CPU</span>
                          <span>{cpuUsage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-purple-950/40 rounded-full h-1.5 overflow-hidden border border-purple-500/10">
                          <div className="bg-gradient-to-r from-teal-500 to-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${cpuUsage}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-amber-400 flex items-center"><Database className="h-3.5 w-3.5 mr-1" /> Memoria Heap</span>
                          <span>{memoryUsage.toFixed(1)} MB / 256MB</span>
                        </div>
                        <div className="w-full bg-purple-950/40 rounded-full h-1.5 overflow-hidden border border-purple-500/10">
                          <div className="bg-gradient-to-r from-amber-500 to-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${(memoryUsage / 256) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] pt-3 border-t border-purple-500/10 mt-2">
                        <span className="text-slate-500">Latencia API:</span>
                        <span className="text-emerald-400 font-bold">{latency}ms</span>
                        <span className="text-slate-500">SLA:</span>
                        <span className="text-purple-400 flex items-center"><ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-400" /> 99.99%</span>
                      </div>
                    </div>
                  )}

                  {/* Footer status line */}
                  <div className="mt-4 pt-3 border-t border-purple-500/5 flex justify-between items-center text-[10px] text-slate-500">
                    <span>UTF-8</span>
                    <span className="flex items-center text-emerald-500">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5 animate-ping"></span>
                      ONLINE
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
          </div>
        </section>

        {/* CUSTOM GEOMETRIC TECHNOLOGY GRID */}
        <section className="py-20 border-t border-slate-200 mt-8">
          <div className="max-w-3xl mb-16 text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0A1931] flex items-center">
              Tecnología de Vanguardia <Flame className="h-5 w-5 text-teal-600 ml-2 animate-bounce" />
            </h2>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-xl">{features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.items.map((item, index) => (
              <div
                key={item.id}
                className="glow-card p-8 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
              >
                {/* Visual indicator index number */}
                <span className="absolute top-6 right-8 text-[44px] font-black text-slate-100 group-hover:text-teal-500/5 select-none transition-colors font-mono">
                  0{index + 1}
                </span>

                <div>
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-teal-600 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-indigo-600 group-hover:border-transparent transition-all duration-300 mb-8 shadow-sm">
                    <DynamicIcon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="relative z-10 text-xl font-bold text-[#0A1931] mb-3">
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES DECOUPLED SECTION */}
        <section id="services" className="py-20 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0A1931]">{services.title}</h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">{services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.items.map((service) => (
              <div
                key={service.id}
                className="glow-card p-8 flex flex-col justify-between overflow-hidden"
              >
                {/* Floating Tag */}
                {service.tag && (
                  <span className="absolute top-6 right-6 bg-teal-50 border border-teal-200 text-teal-700 text-[9px] font-bold uppercase tracking-widest rounded-md px-2.5 py-1 shadow-sm">
                    {service.tag}
                  </span>
                )}

                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 p-[1px] mb-8 shadow-sm">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
                      <DynamicIcon name={service.icon} className="h-5 w-5 text-teal-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0A1931] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <Link
                  to="/support"
                  className="inline-flex items-center text-xs font-semibold text-teal-600 hover:text-indigo-600 border border-slate-100 hover:border-teal-500/30 bg-slate-50 hover:bg-teal-50/50 rounded-xl px-4 py-2 w-fit transition-all shadow-sm"
                >
                  Consultar Solución <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
