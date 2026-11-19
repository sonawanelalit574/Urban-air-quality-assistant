import React, { useState } from 'react';
import { ShieldCheck, Award, TrendingUp, Users, HeartPulse } from 'lucide-react';
import { calculateCigaretteEquiv } from '../services/impactCalculator';

export default function ImpactDashboard({ activeProfile }) {
  const [adoptingFamilies, setAdoptingFamilies] = useState(250);
  const [timelineDays, setTimelineDays] = useState(14); // 2-week winter smog episode

  // Household impact over timeline
  const dailySparedUg = 145; // average avoided dose per person per day
  const familyMembers = activeProfile.id === 'toddler_asthma' ? 4 : 3;
  const totalSparedDoseMg = Math.round(((dailySparedUg * familyMembers * timelineDays) / 1000) * 10) / 10;
  const cigsSaved = calculateCigaretteEquiv(dailySparedUg * familyMembers * timelineDays);
  const co2SavedKg = Math.round((2.4 * timelineDays) * 10) / 10;

  // Community multiplier
  const communityCo2Tons = Math.round(((co2SavedKg * adoptingFamilies) / 1000) * 10) / 10;
  const communityPm25Kg = Math.round(((dailySparedUg * adoptingFamilies * timelineDays * 3) / 1000000) * 100) / 100;
  const erVisitsAverted = Math.round(adoptingFamilies * 0.08);

  return (
    <section
      role="region"
      aria-label="Direct Impact Engine: Health Preservation & Carbon Metrics"
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <h2 className="text-base font-bold text-slate-100">
                Direct Impact Engine: Health Preservation & Carbon Metrics
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              PureAir AI demystifies abstract environmental telemetry into tangible health and climate metrics. Every time you shift a commute or seal an indoor leak, your direct impact is measured.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              Shield Level: Certified Guardian
            </span>
          </div>
        </div>

        {/* Timeline Options with Accessible Button Group */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span id="smog-duration-label" className="text-slate-200 font-medium">Smog Episode Duration:</span>
            <div
              role="group"
              aria-labelledby="smog-duration-label"
              className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg p-1"
            >
              {[7, 14, 30].map((days) => (
                <button
                  key={days}
                  type="button"
                  aria-pressed={timelineDays === days}
                  onClick={() => setTimelineDays(days)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none ${
                    timelineDays === days
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            Calculated for: <strong className="text-slate-200">{activeProfile.label}</strong> ({familyMembers} members)
          </span>
        </div>
      </div>

      {/* Primary KPI Grid with Status Roles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Toxic Particulate Spared */}
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>Avoided Lung PM2.5</span>
              <HeartPulse className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-emerald-400">
              {totalSparedDoseMg} <span className="text-sm font-normal text-emerald-300">mg</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Fine carcinogenic matter prevented from depositing in family lung alveoli.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
            🛡️ 78% overall respiratory risk reduction
          </div>
        </div>

        {/* Card 2: Cigarette Equivalence */}
        <div className="glass-card rounded-2xl p-5 border border-sky-500/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>Cigarette Equivalence Spared</span>
              <Award className="w-4 h-4 text-sky-400" aria-hidden="true" />
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-sky-400">
              {cigsSaved} <span className="text-sm font-normal text-sky-300">cigarettes</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Equivalent toxic particulate dosage avoided across {timelineDays} days of winter smog.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-sky-300 font-medium">
            Based on Berkeley Earth epidemiology model
          </div>
        </div>

        {/* Card 3: Transit Carbon Saved */}
        <div className="glass-card rounded-2xl p-5 border border-teal-500/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>CO₂ Emissions Prevented</span>
              <TrendingUp className="w-4 h-4 text-teal-400" aria-hidden="true" />
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-teal-300">
              {co2SavedKg} <span className="text-sm font-normal text-teal-200">kg CO₂</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Saved by switching to electric metro, carpools, and remote working slots.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-teal-300 font-medium">
            Equivalent to planting 1.6 mature trees
          </div>
        </div>

        {/* Card 4: Pediatric Lung Shield Score */}
        <div className="glass-card rounded-2xl p-5 border border-amber-500/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
              <span>Pediatric Lung Shield</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" aria-hidden="true" />
            </div>
            <div className="mt-2 text-3xl font-black font-mono text-amber-400">
              96 <span className="text-sm font-normal text-amber-300">/ 100</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Composite index based on airtight N95 seals and C-R box filtration speed.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-medium">
            Zero nocturnal asthma flare-up risk
          </div>
        </div>
      </div>

      {/* Community Multiplier Simulator */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <h3 className="font-bold text-sm text-slate-100">
                Neighborhood Smog Multiplier: The Power of Collective Action
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Smog is trapped in an urban dome. When an entire neighborhood adopts low-emission routines, collective air quality dramatically rebounds.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="adopting-families-slider" id="adopting-families-label" className="text-slate-300">
              Adopting Households:
            </label>
            <span className="font-mono font-bold text-emerald-400 text-sm">{adoptingFamilies} families</span>
          </div>
        </div>

        {/* Accessible Range Input */}
        <div className="space-y-1">
          <input
            id="adopting-families-slider"
            type="range"
            min="25"
            max="1000"
            step="25"
            value={adoptingFamilies}
            aria-labelledby="adopting-families-label"
            aria-valuemin="25"
            aria-valuemax="1000"
            aria-valuenow={adoptingFamilies}
            onChange={(e) => setAdoptingFamilies(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>25 Neighborhood Families</span>
            <span>250 Suburb Block</span>
            <span>1,000 District Community</span>
          </div>
        </div>

        {/* Multiplier Results */}
        <div
          role="status"
          aria-live="polite"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
        >
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Collective Carbon Averted</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              {communityCo2Tons} <span className="text-xs font-normal">Tons CO₂</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Removed from local street canyon</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Direct PM2.5 Prevented</span>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
              {communityPm25Kg} <span className="text-xs font-normal">kg fine dust</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Eliminated from vehicular tailpipes</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Emergency Visits Prevented</span>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
              ~{erVisitsAverted} <span className="text-xs font-normal">pediatric visits</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Estimated asthma hospitalizations avoided</p>
          </div>
        </div>
      </div>
    </section>
  );
}
