import React, { useState } from 'react';
import { Wind, Wrench, CheckCircle, Clock, Flame, Leaf, DollarSign, AlertCircle, ArrowUpRight } from 'lucide-react';
import { calculateCorsiRosenthalPerformance } from '../services/impactCalculator';
import { IAQ_HACKS } from '../data/mockData';

export default function IAQStudio({ activeCity }) {
  // Simulator state
  const [roomLength, setRoomLength] = useState(16); // ft
  const [roomWidth, setRoomWidth] = useState(14);   // ft
  const [ceilingHeight, setCeilingHeight] = useState(9); // ft
  const [fanSpeed, setFanSpeed] = useState('medium');

  const performance = calculateCorsiRosenthalPerformance(roomLength, roomWidth, ceilingHeight, fanSpeed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-slate-100">
            Indoor Air Quality (IAQ) Smart Hacks & Remediation Studio
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Indoor air is often 3x to 5x more hazardous than outdoor air when smog penetrates leaky doors and combines with cooking/heating combustion. Use these zero-cost and budget-friendly engineering hacks to purify your home.
        </p>
      </div>

      {/* Feature 1: Interactive DIY Corsi-Rosenthal Box Simulator */}
      <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100">
                DIY Corsi-Rosenthal Box Air Purifier: CADR & Purge Simulator
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Validated by UC Davis & EPA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate clean air volume and time required to purge 90% of toxic winter particulates from your specific room.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Build Cost: ~$35 (Saves $300+)
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Room Length:</span>
              <span className="font-mono text-emerald-400 font-bold">{roomLength} ft</span>
            </div>
            <input
              type="range"
              min="10"
              max="30"
              value={roomLength}
              onChange={(e) => setRoomLength(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Room Width:</span>
              <span className="font-mono text-emerald-400 font-bold">{roomWidth} ft</span>
            </div>
            <input
              type="range"
              min="10"
              max="25"
              value={roomWidth}
              onChange={(e) => setRoomWidth(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Ceiling Height:</span>
              <span className="font-mono text-emerald-400 font-bold">{ceilingHeight} ft</span>
            </div>
            <select
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1 text-slate-200 focus:outline-none text-xs"
            >
              <option value="8">8 ft (Standard)</option>
              <option value="9">9 ft (Modern)</option>
              <option value="10">10 ft (High ceiling)</option>
              <option value="12">12 ft (Loft)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-medium mb-1">
              <span>Fan Speed:</span>
              <span className="font-mono text-emerald-400 font-bold uppercase">{fanSpeed}</span>
            </div>
            <select
              value={fanSpeed}
              onChange={(e) => setFanSpeed(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1 text-slate-200 focus:outline-none text-xs"
            >
              <option value="low">Low (Whisper Quiet - 240 CFM)</option>
              <option value="medium">Medium (Standard Living - 390 CFM)</option>
              <option value="high">High (Maximum Scrub - 510 CFM)</option>
            </select>
          </div>
        </div>

        {/* Live Calculation Output Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Room Volume</span>
            <div className="text-xl font-bold font-mono text-slate-100 mt-1">
              {performance.roomVolumeCuFt} <span className="text-xs font-normal text-slate-400">cu.ft</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">({performance.roomVolumeM3} m³)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Clean Air Delivery (CADR)</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              {performance.cadrCFM} <span className="text-xs font-normal text-emerald-400/80">CFM</span>
            </div>
            <span className="text-[10px] text-emerald-400">Exceeds $400 HEPA towers</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Air Changes Per Hour</span>
            <div className="text-xl font-bold font-mono text-sky-400 mt-1">
              {performance.ach} <span className="text-xs font-normal text-sky-400/80">ACH</span>
            </div>
            <span className="text-[10px] text-sky-300">Hospital isolation grade: 6+</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 bg-emerald-950/20">
            <span className="text-[10px] font-semibold text-emerald-300 uppercase">90% Purge Time</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              {performance.timeTo90Minutes} <span className="text-xs font-normal text-emerald-300">min</span>
            </div>
            <span className="text-[10px] text-emerald-400">Rapid toxic clearance</span>
          </div>
        </div>

        {/* Step-by-Step DIY Build Guide */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2.5">
          <div className="font-bold text-slate-200 flex items-center justify-between">
            <span>🛠️ 4-Step Assembly Blueprint</span>
            <span className="text-[11px] text-emerald-400 font-mono">Build time: ~15 minutes</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
            <li><strong className="text-slate-100">Assemble the Cube</strong>: Tape 4 MERV-13 filters (20"x20"x2") together to form a square column with filter airflow arrows pointing inward.</li>
            <li><strong className="text-slate-100">Seal the Base</strong>: Tape a 20"x20" piece of flat cardboard to the bottom to close the bottom surface completely.</li>
            <li><strong className="text-slate-100">Mount the Fan</strong>: Place the 20" box fan on top, blowing UPWARD (exhausting clean air into the room). Seal all 4 top seams with duct tape.</li>
            <li><strong className="text-slate-100">Add the Shroud</strong>: Cut a 14" circular hole in a piece of cardboard and tape it to the front face of the fan. This simple cardboard shroud eliminates blade tip vortex turbulence and boosts airflow by <strong>20%</strong>!</li>
          </ol>
        </div>
      </div>

      {/* Grid: Other High-Impact IAQ Hacks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hack 1: Window Ventilation Timing */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Clock className="w-4 h-4" />
            <h3 className="font-bold text-sm text-slate-200">Inversion Window Protocol</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Indoor CO₂ buildup causes brain fog and lethargy. To flush CO₂ without flooding your home with toxic smog, crack opposing windows for <strong>15 minutes only</strong> during the Solar Window (<strong>{activeCity.solarWindowStart} – {activeCity.solarWindowEnd}</strong>).
          </p>
          <div className="p-2 rounded-lg bg-red-950/30 border border-red-500/20 text-[11px] text-red-300">
            🚨 <strong>Strict Lockdown</strong>: Never open windows between 06:00–09:30 AM or after 18:00.
          </div>
        </div>

        {/* Hack 2: Kitchen Pressure & Exhaust Protocol */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-orange-400">
            <Flame className="w-4 h-4" />
            <h3 className="font-bold text-sm text-slate-200">Kitchen Exhaust Protocol</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cooking oils and gas stove combustion release ultrafine PM0.1 particles. Run your kitchen range hood on MAX <strong>2 minutes before cooking</strong> to establish negative pressure, and keep kitchen doors shut to protect living areas.
          </p>
          <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300">
            💡 <strong>Sustainable Swap</strong>: Steam or pressure-cook instead of shallow frying (eliminates 88% oil aerosols).
          </div>
        </div>

        {/* Hack 3: NASA Clean Air Botanical Array */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Leaf className="w-4 h-4" />
            <h3 className="font-bold text-sm text-slate-200">NASA Botanical Filters</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            While plants cannot replace mechanical HEPA filters for particulate mass, species like <strong>Snake Plant (Sansevieria)</strong> utilize CAM photosynthesis to emit oxygen at night, absorbing benzene and VOCs in bedrooms.
          </p>
          <div className="p-2 rounded-lg bg-sky-950/30 border border-sky-500/20 text-[11px] text-sky-300">
            🌿 <strong>Pairing</strong>: 2 Snake plants in bedroom + 1 Areca palm in living room for humidity balance.
          </div>
        </div>
      </div>
    </div>
  );
}
