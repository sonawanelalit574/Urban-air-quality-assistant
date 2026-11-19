import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import AQIHero from './components/AQIHero';
import DiurnalChart from './components/DiurnalChart';
import { CITIES, VULNERABILITY_PROFILES } from './data/mockData';
import { fetchCityAirQuality } from './services/airQualityService';
import { Sparkles, Shield, Leaf, Loader2 } from 'lucide-react';

// Code-split dynamic tabs for maximum runtime performance & efficiency
const RoutineOptimizer = lazy(() => import('./components/RoutineOptimizer'));
const IAQStudio = lazy(() => import('./components/IAQStudio'));
const ImpactDashboard = lazy(() => import('./components/ImpactDashboard'));
const CommunityNetwork = lazy(() => import('./components/CommunityNetwork'));
const PureAirAssistant = lazy(() => import('./components/PureAirAssistant'));

function TabLoadingFallback() {
  return (
    <div role="status" aria-live="polite" className="min-h-[350px] flex flex-col items-center justify-center p-8 space-y-3">
      <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" aria-hidden="true" />
      <span className="text-xs text-slate-300 font-mono">Loading PureAir AI Module...</span>
    </div>
  );
}

export default function App() {
  const [activeCityId, setActiveCityId] = useState('delhi');
  const [activeProfileId, setActiveProfileId] = useState('toddler_asthma');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeCityData, setActiveCityData] = useState(CITIES[0]);

  const activeProfile = useMemo(
    () => VULNERABILITY_PROFILES.find(p => p.id === activeProfileId) || VULNERABILITY_PROFILES[0],
    [activeProfileId]
  );

  useEffect(() => {
    let isMounted = true;
    fetchCityAirQuality(activeCityId).then(data => {
      if (isMounted) {
        setActiveCityData(data);
      }
    });

    return () => { isMounted = false; };
  }, [activeCityId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Accessible Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-slate-950 focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Top Header Landmark */}
      <Header
        activeCity={activeCityData}
        setActiveCityId={setActiveCityId}
        activeProfile={activeProfile}
        setActiveProfileId={setActiveProfileId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Landmark */}
      <main
        id="main-content"
        tabIndex="-1"
        role="main"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 focus:outline-none"
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <AQIHero
              activeCity={activeCityData}
              activeProfile={activeProfile}
              onNavigateToRoutine={() => setActiveTab('routine')}
            />
            <DiurnalChart activeCity={activeCityData} />

            {/* Quick Feature Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('routine')}
                className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover text-left space-y-2 focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
                aria-label="Open Inversion-Shifted Routine Planner"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Smart Lifestyle
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-sm text-slate-100">Inversion-Shifted Routine Planner</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Avoid the 07:00–09:30 AM ground inversion trap. Shift errands to the Solar Window and cut personal PM2.5 intake by up to 68%.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('iaq')}
                className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover text-left space-y-2 focus-visible:ring-2 focus-visible:ring-sky-400 focus:outline-none"
                aria-label="Open DIY Corsi-Rosenthal Box Studio"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Home Remediation
                  </span>
                  <Leaf className="w-4 h-4 text-sky-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-sm text-slate-100">DIY Corsi-Rosenthal Box Studio</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Build a 450 CFM air purifier for $35 that outcleans $400 retail HEPA towers. Calculate ACH and 90% purge times for any room.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('assistant')}
                className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover text-left space-y-2 focus-visible:ring-2 focus-visible:ring-teal-400 focus:outline-none"
                aria-label="Open PureAir GenAI Environmental Agent"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    GenAI Copilot
                  </span>
                  <Shield className="w-4 h-4 text-teal-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-sm text-slate-100">Interactive Environmental Agent</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Chat with PureAir AI to simulate specific family routines, kitchen exhaust protocols, and neighborhood green carpools.
                </p>
              </button>
            </div>
          </div>
        )}

        <Suspense fallback={<TabLoadingFallback />}>
          {activeTab === 'routine' && (
            <RoutineOptimizer
              activeCity={activeCityData}
              activeProfile={activeProfile}
            />
          )}

          {activeTab === 'iaq' && (
            <IAQStudio activeCity={activeCityData} />
          )}

          {activeTab === 'impact' && (
            <ImpactDashboard
              activeProfile={activeProfile}
            />
          )}

          {activeTab === 'community' && (
            <CommunityNetwork activeCity={activeCityData} />
          )}

          {activeTab === 'assistant' && (
            <PureAirAssistant
              activeCity={activeCityData}
              activeProfile={activeProfile}
            />
          )}
        </Suspense>
      </main>

      {/* Footer Landmark */}
      <footer role="contentinfo" className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">PureAir AI</span>
            <span>·</span>
            <span>Smart Sustainable Living Assistant</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
            <span>WHO 2021 Global AQ Guidelines</span>
            <span>·</span>
            <span>Berkeley Earth Muller Formula</span>
            <span>·</span>
            <span>ASHRAE Standard 62.2</span>
            <span>·</span>
            <span>UC Davis Corsi-Rosenthal Research</span>
          </div>

          <div>
            <span>Built for Urban Families & Smog Defense</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
