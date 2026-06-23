import React from 'react';
import { Eye, Rocket, Github, Compass, ShieldAlert, Cpu, Sparkles, Terminal, Code, User } from 'lucide-react';
import contentData from '../data/content.json';
import DynamicIcon from '../components/DynamicIcon';

export default function About() {
  const { about } = contentData;
  const { header, pillars, team } = about;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    const cmsBaseUrl = import.meta.env.VITE_CMS_URL || 'http://localhost:1337';
    return `${cmsBaseUrl}${imagePath}`;
  };

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-3xl"></div>
      <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-40"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner Container */}
        <section 
          className="relative overflow-hidden rounded-3xl border border-slate-200/50 shadow-xl mb-20 bg-cover bg-center min-h-[400px] md:min-h-[500px] flex items-center text-left"
          style={{ backgroundImage: `url(${getImageUrl(header.image)})` }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/98 via-[#0A1931]/92 to-[#0A1931]/30 z-0"></div>
          
          <div className="relative z-10 py-20 md:py-28 px-8 sm:px-12 max-w-4xl w-full">
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 px-3 py-1 text-xs text-teal-300 mb-6 font-mono backdrop-blur-sm">
              <Terminal className="h-3.5 w-3.5 text-teal-400" />
              <span>sys.log --profile --about</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
              Nuestra <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-300 bg-clip-text text-transparent">Mente Colectiva</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {header.subtitle}
            </p>
          </div>
        </section>

        {/* Pillars (Mission & Vision) Asymmetric Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 items-stretch">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className={`glow-card p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
                idx % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5'
              }`}
            >
              {/* Decorative Glow */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-teal-500/5 group-hover:bg-teal-500/10 blur-xl transition-all"></div>

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-teal-600 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-indigo-600 group-hover:border-transparent transition-colors mb-6">
                  <DynamicIcon name={pillar.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1931] mb-4">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Simulated technical metrics */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>ESTADO: OPERATIVO</span>
                <span>REG. {idx === 0 ? 'MSN-01' : 'VSN-02'}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Team Members Section: Developer Cards Theme */}
        <section className="border-t border-slate-200 pt-20">
          <div className="max-w-3xl mb-16 text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0A1931] flex items-center">
              Ingenieros de Core <Code className="h-5 w-5 text-teal-600 ml-2" />
            </h2>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-xl">
              {team.subtitle}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 flex-wrap">
            {team.members.map((member, idx) => (
              <div
                key={member.id}
                className="glow-card p-6 flex flex-col justify-between overflow-hidden w-full md:max-w-sm"
              >
                {/* Developer ID Card Styling */}
                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-6 border-b border-slate-100 pb-3">
                    <span>ACCESO: LEVEL_0{idx + 1}</span>
                    <span className="flex items-center">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1"></span>
                      ONLINE
                    </span>
                  </div>

                  {/* Avatar and name details */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative h-16 w-16 rounded-2xl p-[1px] bg-gradient-to-tr from-teal-400 to-indigo-600 shadow-sm shrink-0 flex items-center justify-center">
                      {member.avatar ? (
                        <img
                          src={getImageUrl(member.avatar)}
                          alt={member.name}
                          className="h-full w-full rounded-2xl object-cover bg-slate-900"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-900 text-teal-400">
                          <User className="h-7 w-7" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A1931]">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-teal-600 tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed min-h-[60px]">
                    {member.bio}
                  </p>
                </div>

                {/* Footer with actions and metadata */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">IP: 127.0.0.{idx + 1}</span>
                  <a
                    href={member.github || "https://github.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500/50 hover:bg-slate-100 text-slate-500 hover:text-teal-600 transition-all focus:outline-none"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
