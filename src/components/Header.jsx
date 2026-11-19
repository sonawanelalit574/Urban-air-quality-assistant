import React from 'react';
import { Wind, ShieldAlert, Sparkles, MapPin, Users, Activity } from 'lucide-react';
import { CITIES, VULNERABILITY_PROFILES } from '../data/mockData';

export default function Header({
  activeCity,
  setActiveCityId,
  activeProfile,
  setActiveProfileId,
  activeTab,
  setActiveTab
}) {
  const tabs = [
    { id: 'overview', label: 'Smog Telemetry', icon: Activity },
    { id: 'routine', label: 'Routine Planner', icon: Sparkles },
    { id: 'iaq', label: 'Indoor Hacks & DIY', icon: Wind },
    { id: 'impact', label: 'Direct Impact', icon: ShieldAlert },
    { id: 'community', label: 'Community Shield', icon: Users },
    { id: 'assistant', label: 'GenAI Assistant', icon: Sparkles }
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                  PureAir AI
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  GenAI Copilot
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart Sustainable Living & Winter Smog Defense
              </p>
            </div>
          </div>

          {/* Quick Selectors: City & Vulnerability Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* City Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={activeCity.id}
                onChange={(e) => setActiveCityId(e.target.value)}
                className="bg-transparent border-none text-slate-200 focus:outline-none text-xs font-medium cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                    {c.name} ({c.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Household Profile Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
              <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <select
                value={activeProfile.id}
                onChange={(e) => setActiveProfileId(e.target.value)}
                className="bg-transparent border-none text-slate-200 focus:outline-none text-xs font-medium cursor-pointer max-w-[200px] truncate"
              >
                {VULNERABILITY_PROFILES.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60 text-xs font-medium">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
