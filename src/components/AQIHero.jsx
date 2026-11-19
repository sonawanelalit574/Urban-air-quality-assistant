import React from 'react';
import { AlertTriangle, Sun, Shield, Droplets, Wind as WindIcon, Gauge, Clock, ChevronRight } from 'lucide-react';
import { getAQICategory } from '../services/airQualityService';

export default function AQIHero({ activeCity, activeProfile, onNavigateToRoutine }) {
  const aqiInfo = getAQICategory(activeCity.currentAqi);
  const whoRatio = Math.round((activeCity.pm25 / 15) * 10) / 10;

  return (
    <div className="space-y-4">
      {/* Top Banner Alert */}
      <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400 shrink-0 border border-red-500/30 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-red-200">
                Severe Winter Thermal Inversion Active in {activeCity.name}
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                Lid at {activeCity.inversionBoundaryMeters}m
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Cold ground air is locked under warm air. Particulates cannot disperse until midday solar radiation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={onNavigateToRoutine}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow-md shadow-emerald-500/20"
          >
            <span>Shift Daily Routine</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: Live AQI & Primary Severity */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current US AQI (Air Quality Index)
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl font-black font-mono tracking-tight text-red-400">
                  {activeCity.currentAqi}
                </span>
                <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${aqiInfo.badge}`}>
                  {activeCity.status}
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300">
              <Gauge className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Primary Concern:</span>
              <span className="font-semibold text-red-300">{activeCity.primaryPollutant}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>WHO 24h Threshold Comparison:</span>
              <span className="font-bold text-amber-400 font-mono">{whoRatio}x above safe limit</span>
            </div>
          </div>
        </div>

        {/* Card 2: Solar Window & Inversion Physics */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border-emerald-500/20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '20s' }} />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Solar Clean Air Window
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white font-mono">
                  {activeCity.solarWindowStart} – {activeCity.solarWindowEnd}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Optimal time for cross-ventilation, school sports, and essential grocery errands.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-medium">Inversion Ceiling</span>
              <div className="text-sm font-bold text-slate-200 mt-0.5">{activeCity.inversionBoundaryMeters} meters</div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-medium">Midday Dispersion</span>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">~55% Drop in PM2.5</div>
            </div>
          </div>
        </div>

        {/* Card 3: Vulnerability Guidance & Mask Directive */}
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Household Defense Protocol
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-200 mt-2">
              {activeProfile.label}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {activeProfile.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300">
              <span className="font-semibold block">Required Mask:</span>
              <span className="text-[11px]">{activeProfile.maskRecommendation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pollutant Breakdown Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">PM2.5 (Fine Particles)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold font-mono text-red-400">{activeCity.pm25}</span>
            <span className="text-[10px] text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-red-400/90 font-medium">Safe Limit: 15 µg/m³</span>
        </div>

        <div className="glass-card p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">PM10 (Coarse Dust)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold font-mono text-amber-400">{activeCity.pm10}</span>
            <span className="text-[10px] text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-amber-400/90 font-medium">Safe Limit: 45 µg/m³</span>
        </div>

        <div className="glass-card p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Nitrogen Dioxide (NO₂)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold font-mono text-orange-400">{activeCity.no2}</span>
            <span className="text-[10px] text-slate-400">ppb</span>
          </div>
          <span className="text-[10px] text-orange-400/90 font-medium">Traffic & Idling indicator</span>
        </div>

        <div className="glass-card p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">Weather & Dispersion</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold font-mono text-slate-200">{activeCity.temp}°C</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <WindIcon className="w-3 h-3 text-emerald-400" />
              {activeCity.windSpeed} km/h
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Humidity: {activeCity.humidity}% (Traps fog)</span>
        </div>
      </div>
    </div>
  );
}
