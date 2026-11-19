import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AQIHero from './components/AQIHero';
import DiurnalChart from './components/DiurnalChart';
import RoutineOptimizer from './components/RoutineOptimizer';
import IAQStudio from './components/IAQStudio';
import ImpactDashboard from './components/ImpactDashboard';
import CommunityNetwork from './components/CommunityNetwork';
import PureAirAssistant from './components/PureAirAssistant';
import { CITIES, VULNERABILITY_PROFILES } from './data/mockData';
import { fetchCityAirQuality } from './services/airQualityService';
import { Sparkles, Shield, Heart, ExternalLink, Leaf } from 'lucide-react';

export default function App() {
  const [activeCityId, setActiveCityId] = useState('delhi');
  const [activeProfileId, setActiveProfileId] = useState('toddler_asthma');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeCityData, setActiveCityData] = useState(CITIES[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeProfile = VULNERABILITY_PROFILES.find(p => p.id === activeProfileId) || VULNERABILITY_PROFILES[0];

  useEffect(() => {
    let isMounted = true;
    setIsRefreshing(true);

    fetchCityAirQuality(activeCityId).then(data => {
      if (isMounted) {
        setActiveCityData(data);
        setIsRefreshing(false);
      }
    });

    return () => { isMounted = false; };
  }, [activeCityId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeCity={activeCityData}
        setActiveCityId={setActiveCityId}
        activeProfile={activeProfile}
        setActiveProfileId={setActiveProfileId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              <div
                onClick={() => setActiveTab('routine')}
                className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Smart Lifestyle
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="font-bold text-sm text-slate-100">Inversion-Shifted Routine Planner</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Avoid the 07:00–09:30 AM ground inversion trap. Shift errands to the Solar Window and cut personal PM2.5 intake by up to 68%.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('iaq')}
                className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Home Remediation
                  </span>
                  <Leaf className="w-4 h-4 text-sky-400" />
                </div>
                <h4 className="font-bold text-sm text-slate-100">DIY Corsi-Rosenthal Box Studio</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Build a 450 CFM air purifier for $35 that outcleans $400 retail HEPA towers. Calculate ACH and 90% purge times for any room.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('assistant')}
                className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    GenAI Copilot
                  </span>
                  <Shield className="w-4 h-4 text-teal-400" />
                </div>
                <h4 className="font-bold text-sm text-slate-100">Interactive Environmental Agent</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chat with PureAir AI to simulate specific family routines, kitchen exhaust protocols, and neighborhood green carpools.
                </p>
              </div>
            </div>
          </div>
        )}

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
            activeCity={activeCityData}
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
      </main>

      {/* Footer with Scientific Grounding Citations */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">PureAir AI</span>
            <span>·</span>
            <span>Smart Sustainable Living Assistant</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
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
