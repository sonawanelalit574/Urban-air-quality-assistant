import React, { useState } from 'react';
import { Sun, AlertCircle, Info } from 'lucide-react';

export default function DiurnalChart({ activeCity }) {
  const [selectedHour, setSelectedHour] = useState(activeCity.hourly[3] || activeCity.hourly[0]);
  const maxAqi = Math.max(...activeCity.hourly.map(h => h.aqi), 450);

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <span>24-Hour Thermal Inversion & Smog Curve</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Diurnal Model
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Hover over time slots to inspect temperature, PM2.5 concentration, and atmospheric boundary stability.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Inversion Peak Trap</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Solar Clean Window</span>
          </div>
        </div>
      </div>

      {/* Interactive Bar Chart Visualization */}
      <div className="pt-6 pb-2">
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 items-end h-44 border-b border-slate-800 pb-2">
          {activeCity.hourly.map((h, idx) => {
            const heightPercent = Math.min(100, Math.max(15, (h.aqi / maxAqi) * 100));
            const isSelected = selectedHour.time === h.time;
            const isPeak = h.isPeak;
            const isSolar = h.isSolarWindow;

            let barColor = 'bg-slate-700 hover:bg-slate-600';
            if (isPeak) barColor = 'bg-gradient-to-t from-red-600 to-rose-400';
            else if (isSolar) barColor = 'bg-gradient-to-t from-emerald-600 to-teal-400';
            else if (h.aqi > 300) barColor = 'bg-purple-600';
            else if (h.aqi > 200) barColor = 'bg-red-500/80';
            else if (h.aqi > 150) barColor = 'bg-orange-500/80';

            return (
              <div
                key={idx}
                onMouseEnter={() => setSelectedHour(h)}
                onClick={() => setSelectedHour(h)}
                className="flex flex-col items-center h-full justify-end cursor-pointer group relative"
              >
                {/* Floating indicator */}
                {isSolar && (
                  <Sun className="w-3.5 h-3.5 text-emerald-400 absolute -top-5 animate-pulse" />
                )}
                {isPeak && (
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 absolute -top-5" />
                )}

                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-md transition-all duration-200 ${barColor} ${
                    isSelected ? 'ring-2 ring-white scale-105 shadow-lg' : 'opacity-85 group-hover:opacity-100'
                  }`}
                />

                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  {h.time.split(':')[0]}h
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Hour Details Box */}
      {selectedHour && (
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg font-mono font-bold text-sm ${
              selectedHour.isSolarWindow ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {selectedHour.time}
            </div>
            <div>
              <div className="font-semibold text-slate-200 flex items-center gap-2">
                <span>AQI: <span className="font-mono text-red-400">{selectedHour.aqi}</span></span>
                <span>·</span>
                <span>PM2.5: <span className="font-mono text-amber-300">{selectedHour.pm25} µg/m³</span></span>
                <span>·</span>
                <span>Temp: <span className="font-mono text-slate-300">{selectedHour.temp}°C</span></span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {selectedHour.isSolarWindow
                  ? '☀️ Solar Window Active: Sunlight has warmed the ground, expanding boundary layer and flushing ground toxins.'
                  : selectedHour.isPeak
                  ? '🚨 Peak Smog Trap: Nocturnal radiation cooling has produced severe thermal capping. Ground exposure is dangerous.'
                  : 'Atmospheric stability maintains stagnant conditions. Keep air cleaners active.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 font-medium">
            <span className={`px-2.5 py-1 rounded-full text-[10px] ${
              selectedHour.isSolarWindow
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {selectedHour.isSolarWindow ? 'Recommended Outdoor Window' : 'Indoor Shelter Advised'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
