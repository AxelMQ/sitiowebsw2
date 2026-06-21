import React, { useState } from 'react';
import { Mail, Phone, Clock, AlertTriangle, CheckCircle, Ticket, Terminal } from 'lucide-react';
import contentData from '../data/content.json';
import ChatWidget from '../components/ChatWidget';

export default function Support() {
  const { support } = contentData;
  const { header, info } = support;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    ticketNumber: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null); // 'loading' | 'success'

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulate API request to register ticket
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', ticketNumber: '', message: '' });
      
      // Clear success message
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl"></div>
      <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-40"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-left max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-teal-50 border border-teal-200/50 px-3 py-1 text-xs text-teal-700 mb-6 font-mono">
            <span>console.log --service --support</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0A1931] mb-6">
            {header.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-505 leading-relaxed">
            {header.subtitle}
          </p>
        </section>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Column: Traditional Form */}
          <div className="glow-card p-8 flex flex-col justify-between overflow-hidden">
            <div>
              <h2 className="text-2xl font-bold text-[#0A1931] mb-6 flex items-center">
                <Ticket className="h-6 w-6 text-teal-600 mr-2" />
                Registrar Solicitud
              </h2>

              {formStatus === 'success' && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-250 p-4 text-emerald-800 flex items-start space-x-3 shadow-sm">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">¡Formulario Enviado!</p>
                    <p className="text-xs text-slate-600 mt-1">Hemos registrado tu ticket de soporte simulado. Un ingeniero del Core evaluará tu caso a la brevedad.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="ticketNumber" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Número de Ticket (Opcional)</label>
                  <input
                    type="text"
                    name="ticketNumber"
                    id="ticketNumber"
                    value={formState.ticketNumber}
                    onChange={handleChange}
                    placeholder="Ej. TK-4920"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Descripción del Problema</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    required
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Describe detalladamente el requerimiento o la falla técnica..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all resize-none font-sans"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold shadow-[0_10px_20px_rgba(20,184,166,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando solicitud...</span>
                    </>
                  ) : (
                    <span>Registrar Incidente</span>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Contact Info */}
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
              <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-550">
                <Clock className="h-4 w-4 text-teal-600" />
                <span>{info.hours}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-550">
                <Mail className="h-4 w-4 text-teal-600" />
                <a href={`mailto:${info.email}`} className="hover:text-teal-600 transition-colors font-medium text-slate-650">{info.email}</a>
              </div>
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="flex flex-col">
            <ChatWidget isCompact={false} />
            
            {/* Warning under chat */}
            <div className="mt-4 rounded-2xl bg-teal-50 border border-teal-200/50 p-4 text-[11px] leading-relaxed text-teal-800 flex items-start gap-2.5 shadow-sm">
              <AlertTriangle className="h-4.5 w-4.5 text-teal-600 shrink-0 mt-0.5" />
              <span>{info.warning}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
