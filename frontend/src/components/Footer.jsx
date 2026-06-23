import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import contentData from '../data/content.json';

export default function Footer() {
  const { companyName, companySlogan, navigation } = contentData;
  const logoText = companyName.split('|')[0].trim();
  const currentYear = new Date().getFullYear();

  const [apiStatus, setApiStatus] = useState('VERIFICANDO'); // 'OPERATIVO', 'DESCONECTADO', 'SIN_KEY'

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/health`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (data.hasApiKey) {
          setApiStatus('OPERATIVO');
        } else {
          setApiStatus('SIN_KEY');
        }
      } catch (err) {
        setApiStatus('DESCONECTADO');
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-slate-800 bg-[#0B1A30] text-slate-300 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-indigo-600 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0B1A30] overflow-hidden">
                  <img src="/logo.png" alt="Lumos Logic Logo" className="h-full w-full object-cover" />
                </div>
              </div>
              <span className="text-lg font-semibold tracking-wider text-white">
                {logoText}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4">
              {companySlogan}
            </p>
            
            {/* API Status */}
            {apiStatus === 'OPERATIVO' && (
              <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 text-xs text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Enlace IA: OPERATIVO</span>
              </div>
            )}
            {apiStatus === 'SIN_KEY' && (
              <div className="inline-flex items-center space-x-2 rounded-full bg-amber-950/40 border border-amber-500/20 px-3 py-1 text-xs text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>Enlace IA: FALTA API KEY</span>
              </div>
            )}
            {apiStatus === 'DESCONECTADO' && (
              <div className="inline-flex items-center space-x-2 rounded-full bg-rose-950/40 border border-rose-500/20 px-3 py-1 text-xs text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span>Enlace IA: DESCONECTADO</span>
              </div>
            )}
            {apiStatus === 'VERIFICANDO' && (
              <div className="inline-flex items-center space-x-2 rounded-full bg-slate-800/40 border border-slate-700/20 px-3 py-1 text-xs text-slate-400 animate-pulse">
                <span>Enlace IA: VERIFICANDO...</span>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navegación</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm hover:text-teal-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security details */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Seguridad</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-2 text-xs">
                <ShieldCheck className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>Cifrado SSL de grado bancario y monitoreo activo del Core Team.</span>
              </div>
              <p className="text-xs text-slate-500">
                Lumos Logic Software Development. Prototipo de Taller de Software 2.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} {logoText}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
