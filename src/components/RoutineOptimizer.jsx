import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle2, Car, Train, RefreshCw, AlertTriangle } from 'lucide-react';
import { calculateInhaledPM25, calculateCigaretteEquiv, calculateCarbonSavings } from '../services/impactCalculator';

export default function RoutineOptimizer({ activeCity, activeProfile }) {
  // Configurable daily schedule items
  const [transitMode, setTransitMode] = useState('electric_metro');
  const [maskType, setMaskType] = useState('n95');
  const [commuteDistance, setCommuteDistance] = useState(14); // km roundtrip

  // Routine activities
  const defaultActivities = [
    {
      id: 'morning_run',
      title: 'Morning Exercise / Jogging',
      baselineTime: '06:30 AM (Peak Smog)',
      baselineAqi: Math.round(activeCity.pm25 * 1.3),
      baselineRisk: 'Extreme Alveolar Deposition (2.4 m³/h heavy breathing)',
      optimizedTime: '02:00 PM (Solar Window) or Indoor with C-R Box',
      optimizedAqi: Math.round(activeCity.pm25 * 0.35),
      benefit: 'Spared 94µg deep particulate intake'
    },
    {
      id: 'school_run',
      title: 'School Drop-off & Morning Transit',
      baselineTime: '07:45 AM (Inversion Trap)',
      baselineAqi: Math.round(activeCity.pm25 * 1.25),
      baselineRisk: 'Single ICE car idling in rush hour (+3.1 kg CO2)',
      optimizedTime: '07:45 AM (Filtered 3-Family Carpool + N95)',
      optimizedAqi: Math.round(activeCity.pm25 * 0.1),
      benefit: 'Cuts local car emissions by 66% + N95 95% shield'
    },
    {
      id: 'work_commute',
      title: 'Work / Office Commute',
      baselineTime: '08:45 AM (Gridlock Canyon)',
      baselineAqi: Math.round(activeCity.pm25 * 1.2),
      baselineRisk: 'High NO2 cabin intrusion from diesel trucks',
      optimizedTime: '09:30 AM or Shift to Electric Metro',
      optimizedAqi: Math.round(activeCity.pm25 * 0.25),
      benefit: 'Saves 2.6 kg CO2 + avoids road surface toxins'
    },
    {
      id: 'groceries',
      title: 'Grocery & Outdoor Errands',
      baselineTime: '10:30 AM (Stagnant smog)',
      baselineAqi: Math.round(activeCity.pm25 * 0.9),
      baselineRisk: 'Chronic ambient exposure during high traffic',
      optimizedTime: '01:30 PM (Solar Clean Window)',
      optimizedAqi: Math.round(activeCity.pm25 * 0.4),
      benefit: 'Sun breaks inversion layer; 55% cleaner air'
    }
  ];

  // Mathematical calculations
  const baselineDoseUg = defaultActivities.reduce((acc, act) => {
    return acc + calculateInhaledPM25(act.baselineAqi, 0.75, act.id === 'morning_run' ? 'heavy' : 'moderate', false, 'none');
  }, 0);

  const optimizedDoseUg = defaultActivities.reduce((acc, act) => {
    return acc + calculateInhaledPM25(act.optimizedAqi, 0.75, act.id === 'morning_run' ? 'resting' : 'moderate', true, maskType);
  }, 0);

  const sparedDoseUg = Math.max(0, Math.round((baselineDoseUg - optimizedDoseUg) * 10) / 10);
  const percentSpared = Math.round((sparedDoseUg / baselineDoseUg) * 100);
  const cigsSaved = calculateCigaretteEquiv(sparedDoseUg);
  const co2SavedKg = calculateCarbonSavings(commuteDistance, 'ice_car_solo', transitMode);

  return (
    <div className="space-y-6">
      {/* Header and Config Controls */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-slate-100">
                GenAI Inversion-Aware Daily Routine & Commute Planner
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Synchronize your household routine with local atmospheric physics. Avoid peak morning smog traps and transition to low-emission transit modes.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
              <span className="text-slate-400">Transit Mode:</span>
              <select
                value={transitMode}
                onChange={(e) => setTransitMode(e.target.value)}
                className="bg-transparent font-medium text-emerald-400 focus:outline-none cursor-pointer"
              >
                <option value="electric_metro" className="bg-slate-900 text-slate-200">Electric Metro / Rail</option>
                <option value="ice_carpool_3" className="bg-slate-900 text-slate-200">3-Family Carpool</option>
                <option value="ev_car" className="bg-slate-900 text-slate-200">Electric Vehicle (EV)</option>
                <option value="remote_wfh" className="bg-slate-900 text-slate-200">Work From Home (WFH)</option>
              </select>
            </div>

            <div className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
              <span className="text-slate-400">Mask Protection:</span>
              <select
                value={maskType}
                onChange={(e) => setMaskType(e.target.value)}
                className="bg-transparent font-medium text-sky-400 focus:outline-none cursor-pointer"
              >
                <option value="n95" className="bg-slate-900 text-slate-200">N95 / FFP2 (95% filter)</option>
                <option value="kf94" className="bg-slate-900 text-slate-200">KF94 (90% filter)</option>
                <option value="surgical" className="bg-slate-900 text-slate-200">Surgical Mask (50%)</option>
                <option value="none" className="bg-slate-900 text-slate-200">No Mask (0%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quantified Direct Impact Banner */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-emerald-500/30 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Avoided PM2.5 Intake</span>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
              -{percentSpared}%
            </div>
            <span className="text-[10px] text-emerald-300">Spared {sparedDoseUg} µg toxic dust</span>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Cigarette Equivalence</span>
            <div className="text-2xl font-black font-mono text-sky-400 mt-0.5">
              {cigsSaved} <span className="text-xs font-normal">cigs spared</span>
            </div>
            <span className="text-[10px] text-sky-300">Lung burden avoided today</span>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Transit Carbon Saved</span>
            <div className="text-2xl font-black font-mono text-teal-300 mt-0.5">
              {co2SavedKg} <span className="text-xs font-normal">kg CO₂</span>
            </div>
            <span className="text-[10px] text-teal-400">Versus single ICE driving</span>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Vulnerability Shield</span>
            <div className="text-2xl font-black font-mono text-amber-300 mt-0.5">
              94 / 100
            </div>
            <span className="text-[10px] text-amber-400">High Pediatric Defense</span>
          </div>
        </div>
      </div>

      {/* Routine Comparison Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Comparative Daily Schedule: Baseline vs. PureAir AI Optimized
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultActivities.map((act) => (
            <div key={act.id} className="glass-card rounded-xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-sm text-slate-200">{act.title}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {act.benefit}
                </span>
              </div>

              {/* Baseline High Risk */}
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs space-y-1">
                <div className="flex items-center justify-between text-red-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    Standard Routine: {act.baselineTime}
                  </span>
                  <span className="font-mono text-red-400">PM2.5: {act.baselineAqi} µg/m³</span>
                </div>
                <p className="text-[11px] text-slate-400">{act.baselineRisk}</p>
              </div>

              {/* PureAir AI Low Emission Shift */}
              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1">
                <div className="flex items-center justify-between text-emerald-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    PureAir Shift: {act.optimizedTime}
                  </span>
                  <span className="font-mono text-emerald-400">Effective PM2.5: {act.optimizedAqi} µg/m³</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Synchronized with atmospheric boundary layer warming. Dramatically lowers lung exposure.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Impact Explainer Note */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
        <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          Why This Shift Works: Atmospheric Physics & Lung Toxicology
        </h4>
        <p className="text-slate-400 leading-relaxed">
          During winter thermal inversions, particulate matter does not disperse uniformly. The morning rush hour (07:00–09:30 AM) coincides with the lowest atmospheric boundary layer and freezing surface temperatures, magnifying fine particle concentrations by up to <strong>300%</strong>. By shifting outdoor activities to the solar ventilation window and using public rail/carpooling, families not only shield vulnerable respiratory tracts from acute exposure, but actively reduce the localized emissions that feed the smog dome.
        </p>
      </div>
    </div>
  );
}
