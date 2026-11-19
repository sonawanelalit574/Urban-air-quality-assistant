import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Code, CheckCircle, ChevronDown, ChevronUp, Terminal, Shield } from 'lucide-react';
import { executeAgentQuery } from '../services/geminiAgent';

export default function PureAirAssistant({ activeCity, activeProfile }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: `👋 Hello! I am **PureAir AI**, your GenAI Environmental & Sustainable Living Copilot.

Currently in **${activeCity.name}**, severe winter thermal inversions are trapping fine particulates below **${activeCity.inversionBoundaryMeters}m**. I am configured to protect **${activeProfile.label}**.

How can I help you optimize your daily life today?
* Tap any quick scenario below, or ask any question regarding low-emission routines, indoor air purification hacks, or clean transit alternatives.`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentToolCalls, setRecentToolCalls] = useState([]);
  const [showToolDrawer, setShowToolDrawer] = useState(false);

  const quickScenarios = [
    'Plan school run in high AQI for my asthmatic child',
    'How do I build a $35 Corsi-Rosenthal air cleaner?',
    'How to cook dinner without triggering indoor smog?',
    'Why does morning cold fog hurt my chest and breathing?'
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setRecentToolCalls([]);

    try {
      const response = await executeAgentQuery(
        textToSend,
        activeCity,
        activeProfile,
        (toolCall) => {
          setRecentToolCalls((prev) => [...prev, toolCall]);
          setShowToolDrawer(true);
        }
      );

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'assistant', text: response }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'assistant', text: 'Sorry, I encountered an error formulating your environmental recommendation. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span>PureAir GenAI Agent</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                Tool-Orchestrated
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Real-time Inversion Modeling · Berkeley Earth Toxicology · ASHRAE 62.2 IAQ
            </p>
          </div>
        </div>

        {recentToolCalls.length > 0 && (
          <button
            onClick={() => setShowToolDrawer(!showToolDrawer)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 font-mono border border-emerald-500/30 transition"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{recentToolCalls.length} Tools Executed</span>
            {showToolDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Tool Execution Drawer */}
      {showToolDrawer && recentToolCalls.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Code className="w-4 h-4" />
              GenAI Tool Execution Inspector
            </span>
            <span className="text-[10px] text-slate-500">Deterministic Engine Handoff</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentToolCalls.map((tc, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Call: {tc.tool}()</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong>Input:</strong> {JSON.stringify(tc.input)}
                </div>
                <div className="text-[11px] text-teal-300">
                  <strong>Output:</strong> {JSON.stringify(tc.output)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 min-h-[420px] max-h-[580px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 p-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono">PureAir AI is orchestrating environmental tools and atmospheric physics...</span>
          </div>
        )}
      </div>

      {/* Suggested Scenario Chips */}
      <div className="flex flex-wrap gap-2 text-xs">
        {quickScenarios.map((scen, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(scen)}
            className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-slate-300 transition text-[11px]"
          >
            {scen}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask PureAir AI about low-emission routines, DIY filters, or health impacts..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20 shrink-0"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
