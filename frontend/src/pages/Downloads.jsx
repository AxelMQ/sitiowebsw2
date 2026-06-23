import React, { useState } from 'react';
import { DownloadCloud, CheckCircle, ShieldAlert } from 'lucide-react';
import contentData from '../data/content.json';
import DynamicIcon from '../components/DynamicIcon';
import { downloadResource } from '../utils/downloadHelper';

export default function Downloads() {
  const { downloads } = contentData;
  const { header, resources } = downloads;

  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const triggerDownload = (resource) => {
    if (downloadingId) return;

    setDownloadingId(resource.id);
    setDownloadSuccess(null);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(resource.name);
      downloadResource(resource);
      setTimeout(() => {
        setDownloadSuccess(null);
      }, 4000);
    }, 2000);
  };

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
      {/* Background blobs */}
      <div className="absolute top-10 right-10 -z-10 h-72 w-72 rounded-full bg-teal-500/5 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner Container */}
        <section 
          className="relative overflow-hidden rounded-3xl border border-slate-200/50 shadow-xl mb-16 bg-cover bg-center min-h-[400px] md:min-h-[500px] flex items-center text-left"
          style={{ backgroundImage: `url(${getImageUrl(header.image)})` }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/98 via-[#0A1931]/92 to-[#0A1931]/30 z-0"></div>
          
          <div className="relative z-10 py-20 md:py-28 px-8 sm:px-12 max-w-4xl w-full">
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 px-3 py-1 text-xs text-teal-300 mb-6 font-mono backdrop-blur-sm">
              <span>vault.db --list --shared</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
              Bóveda <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-300 bg-clip-text text-transparent">de Recursos</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {header.subtitle}
            </p>
          </div>
        </section>

        {/* Global Alert Notification */}
        {downloadSuccess && (
          <div className="max-w-xl mb-8 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 flex items-center space-x-3 shadow-sm animate-fade-in">
            <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600" />
            <div className="text-sm">
              <span className="font-bold">¡Descarga Iniciada!</span> Se ha generado el binario simulado para <span className="underline">{downloadSuccess}</span> exitosamente.
            </div>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((res) => {
            const isThisDownloading = downloadingId === res.id;

            return (
              <div
                key={res.id}
                className="glow-card p-6 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Icon header with background */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-teal-600 group-hover:text-teal-700 transition-colors mb-6">
                    <DynamicIcon name={res.icon} className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0A1931] mb-2">
                    {res.name}
                  </h3>
                  
                  {/* Metadata tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 rounded px-1.5 py-0.5">
                      {res.version}
                    </span>
                    <span className="text-[10px] bg-teal-50 border border-teal-200 text-teal-700 rounded px-1.5 py-0.5 font-semibold">
                      {res.size}
                    </span>
                    <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 rounded px-1.5 py-0.5">
                      {res.fileType}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {res.description}
                  </p>
                </div>

                {/* Simulated trigger button */}
                <button
                  onClick={() => triggerDownload(res)}
                  disabled={!!downloadingId}
                  className={`w-full flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                    isThisDownloading
                      ? 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-50 hover:bg-gradient-to-r hover:from-teal-500 hover:to-indigo-600 border-slate-200 hover:border-transparent text-teal-700 hover:text-white'
                  }`}
                >
                  {isThisDownloading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Cifrando binarios...</span>
                    </>
                  ) : (
                    <>
                      <DownloadCloud className="h-4.5 w-4.5" />
                      <span>Descargar Recurso</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Security Warning banner */}
        <div className="mt-16 rounded-2xl bg-teal-50 border border-teal-200/50 p-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700 shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#0A1931]">Descarga Segura Certificada</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Todos los paquetes distribuidos en nuestro portal son sometidos a análisis de malware estático y dinámico, y firmados digitalmente con nuestras claves criptográficas. Si presentas problemas de red durante la descarga, contacta a nuestro Agente Call Center.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
