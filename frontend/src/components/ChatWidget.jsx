import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import contentData from '../data/content.json';

export default function ChatWidget({ isCompact = false }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `¡Hola! Bienvenido al centro de atención inteligente de ${contentData.companyName.split('|')[0].trim()}. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const formatMessageText = (text, sender) => {
    const isBot = sender === 'bot';
    const lines = text.split('\n');
    
    return lines.map((line, lineIdx) => {
      let isListItem = false;
      let cleanLine = line;
      
      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        isListItem = true;
        cleanLine = line.trim().replace(/^[*-\s]\s*/, '');
      }
      
      const parts = [];
      const boldRegex = /\*\*([^*]+)\*\*/g;
      let lastIndex = 0;
      let match;
      
      const parseUrlsAndLinks = (segment, keyPrefix) => {
        const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
        const subParts = [];
        let lastIdx = 0;
        let mdMatch;
        
        while ((mdMatch = mdLinkRegex.exec(segment)) !== null) {
          const textBefore = segment.substring(lastIdx, mdMatch.index);
          if (textBefore) {
            subParts.push(...parseRawUrls(textBefore, `${keyPrefix}-before-${mdMatch.index}`));
          }
          
          const linkText = mdMatch[1];
          const url = mdMatch[2];
          subParts.push(
            <a 
              key={`${keyPrefix}-md-${mdMatch.index}`} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={isBot ? "text-teal-600 hover:text-indigo-600 underline font-semibold" : "text-teal-200 hover:text-white underline font-semibold"}
            >
              {linkText}
            </a>
          );
          lastIdx = mdLinkRegex.lastIndex;
        }
        
        const textAfter = segment.substring(lastIdx);
        if (textAfter) {
          subParts.push(...parseRawUrls(textAfter, `${keyPrefix}-after`));
        }
        return subParts;
      };

      const parseRawUrls = (text, keyPrefix) => {
        const urlRegex = /(https?:\/\/[^\s`!()\[\]{};:'".,<>?«»“”‘’]+)/g;
        const subParts = [];
        let lastIdx = 0;
        let urlMatch;
        
        while ((urlMatch = urlRegex.exec(text)) !== null) {
          const textBefore = text.substring(lastIdx, urlMatch.index);
          if (textBefore) subParts.push(textBefore);
          
          const url = urlMatch[0];
          subParts.push(
            <a 
              key={`${keyPrefix}-raw-${urlMatch.index}`} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={isBot ? "text-teal-600 hover:text-indigo-650 underline break-all font-semibold" : "text-teal-200 hover:text-white underline break-all font-semibold"}
            >
              {url}
            </a>
          );
          lastIdx = urlRegex.lastIndex;
        }
        
        const textAfter = text.substring(lastIdx);
        if (textAfter) subParts.push(textAfter);
        return subParts;
      };

      boldRegex.lastIndex = 0;
      
      while ((match = boldRegex.exec(cleanLine)) !== null) {
        const textBefore = cleanLine.substring(lastIndex, match.index);
        if (textBefore) {
          parts.push(...parseUrlsAndLinks(textBefore, `line-${lineIdx}-before-${match.index}`));
        }
        
        const boldText = match[1];
        parts.push(
          <strong key={`line-${lineIdx}-bold-${match.index}`} className={isBot ? "font-bold text-slate-900 animate-pulse-subtle" : "font-extrabold text-white"}>
            {boldText}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      
      const textAfter = cleanLine.substring(lastIndex);
      if (textAfter) {
        parts.push(...parseUrlsAndLinks(textAfter, `line-${lineIdx}-after`));
      }
      
      if (isListItem) {
        return (
          <div key={lineIdx} className={`flex items-start pl-3 my-1 ${isBot ? 'text-slate-700' : 'text-slate-100'}`}>
            <span className={isBot ? "mr-2 text-teal-500 shrink-0 font-bold" : "mr-2 text-teal-300 shrink-0 font-bold"}>•</span>
            <span className="flex-1">{parts}</span>
          </div>
        );
      }
      
      return (
        <p key={lineIdx} className="min-h-[1rem]">
          {parts}
        </p>
      );
    });
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    setInputText('');
    setError(null);

    // Append user message
    const userMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build history for backend API (excluding welcome message at index 0 to ensure history starts with 'user' role)
      const currentHistory = messages
        .filter((msg) => msg.id !== 'welcome')
        .map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      // Make API Request to local backend (using dynamic API URL)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history: currentHistory,
          message: userText
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'No se pudo comunicar con el Agente de IA. Verifica que el servidor backend esté corriendo.');
      }

      const data = await response.json();

      // Append bot response
      const botMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestClick = (promptText) => {
    setInputText(promptText);
  };

  const suggestions = [
    "¿Qué servicios de desarrollo ofrecen?",
    "¿Cómo descargo el manual de servicios?",
    "Tengo un problema técnico (Ticket #TK-9482)"
  ];

  return (
    <div className={`flex flex-col rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden ${isCompact ? 'h-[500px]' : 'h-[600px]'}`}>
      
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#0B1A30] to-[#122A4A] p-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-indigo-600 p-[1px] shadow-[0_0_10px_rgba(20,184,166,0.2)]">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0B1A30]">
              <Bot className="h-5 w-5 text-teal-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center">
              Soporte Inteligente <Sparkles className="h-3.5 w-3.5 text-teal-400 ml-1.5" />
            </h3>
            <p className="text-xs text-teal-400 flex items-center">
              <span className="h-1.5 w-1.5 bg-teal-500 rounded-full mr-1.5 animate-ping"></span>
              En línea - Agente IA
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${
              msg.sender === 'user' 
                ? 'bg-[#007A78] text-white font-bold text-xs shadow-sm' 
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}>
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Bubble */}
            <div className="flex flex-col max-w-[75%]">
              <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#007A78] text-white rounded-tr-none font-medium'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                <div className="space-y-1">{formatMessageText(msg.text, msg.sender)}</div>
              </div>
              <span className={`text-[10px] text-slate-400 mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 border border-slate-200">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex space-x-1.5 items-center shadow-sm">
              <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800 flex items-start gap-2 shadow-sm">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error de conexión</p>
              <p>{error}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-medium">Preguntas Frecuentes:</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestClick(s)}
                className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-teal-500/40 rounded-lg px-2.5 py-1.5 transition-all text-left truncate max-w-full"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          placeholder="Pregúntale a nuestro agente..."
          className="flex-1 bg-slate-50 border border-slate-200 focus:border-teal-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500/10 transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white disabled:opacity-50 p-2.5 rounded-xl transition-all shadow-[0_5px_10px_rgba(20,184,166,0.15)] focus:outline-none flex items-center justify-center cursor-pointer"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </div>
  );
}
