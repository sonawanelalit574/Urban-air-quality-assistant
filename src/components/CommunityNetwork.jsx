import React, { useState } from 'react';
import { Users, AlertTriangle, ShieldCheck, MapPin, Plus, CheckCircle, MessageSquare, Car, Share2 } from 'lucide-react';
import { COMMUNITY_SAFE_HAVENS } from '../data/mockData';

export default function CommunityNetwork({ activeCity }) {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Open Waste / Leaf Burning',
      location: 'Sector 4 Park Perimeter',
      severity: 'Critical Hazard',
      severityColor: 'bg-red-500 text-white',
      timeAgo: '12m ago',
      reportedBy: 'Neighbor Sarah M.',
      upvotes: 18,
      status: 'Municipal Air Patrol Dispatched'
    },
    {
      id: 2,
      type: 'School Bus Idling Hotspot',
      location: 'Oakridge Academy Gate 2',
      severity: 'Moderate',
      severityColor: 'bg-amber-500 text-slate-900',
      timeAgo: '35m ago',
      reportedBy: 'Parent Council',
      upvotes: 9,
      status: 'Advisory sent to Principal'
    },
    {
      id: 3,
      type: 'Uncovered Construction Sand Dust',
      location: 'Maple & 5th Avenue Crossing',
      severity: 'High Dust Plume',
      severityColor: 'bg-orange-500 text-white',
      timeAgo: '1h ago',
      reportedBy: 'Local Residents Assoc.',
      upvotes: 14,
      status: 'Sprinkler Suppression Requested'
    }
  ]);

  // Form state for new report
  const [hazardType, setHazardType] = useState('Open Waste / Leaf Burning');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newRep = {
        id: Date.now(),
        type: hazardType,
        location: locationName,
        severity: 'Pending Verification',
        severityColor: 'bg-emerald-500 text-slate-900',
        timeAgo: 'Just now',
        reportedBy: 'You (Verified Citizen)',
        upvotes: 1,
        status: 'Broadcasted to Neighborhood Shield'
      };
      setReports([newRep, ...reports]);
      setLocationName('');
      setDescription('');
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-slate-100">
            Neighborhood Smog Shield & Community Collective Network
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Individual protection is vital, but collective action stops the pollution source. Report local toxic emissions, coordinate clean school runs, and discover nearby clean air safe havens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Reporting & Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Incident Reporting Form */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Report Localized Smog Hazard in {activeCity.name}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Hazard Category</label>
                  <select
                    value={hazardType}
                    onChange={(e) => setHazardType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
                  >
                    <option value="Open Waste / Leaf Burning">🔥 Open Waste / Leaf Burning</option>
                    <option value="Heavy Diesel Fleet Idling">🚚 Heavy Diesel Fleet Idling</option>
                    <option value="Uncovered Construction Dust">🏗️ Uncovered Construction Dust</option>
                    <option value="Industrial Chimney Dense Smoke">🏭 Industrial Chimney Dense Smoke</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Specific Location / Cross-Street</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Behind Sector 4 Market"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Optional Details</label>
                <input
                  type="text"
                  placeholder="e.g. Dense black smoke blowing into residential windows"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  Reports auto-alert local authorities and neighbor alerts
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Broadcast Alert'}</span>
                </button>
              </div>

              {submitSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Hazard report broadcasted! 24 neighbors in your vicinity notified.</span>
                </div>
              )}
            </form>
          </div>

          {/* Live Community Feed */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Live Neighborhood Smog Feed</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Real-Time Community Radar</span>
            </div>

            <div className="space-y-2.5">
              {reports.map((rep) => (
                <div key={rep.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rep.severityColor}`}>
                        {rep.severity}
                      </span>
                      <span className="font-semibold text-slate-200">{rep.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{rep.location}</span>
                      <span>·</span>
                      <span>{rep.timeAgo}</span>
                      <span>·</span>
                      <span className="text-slate-500">by {rep.reportedBy}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    <span className="text-[11px] font-medium text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {rep.status}
                    </span>
                    <button
                      onClick={() => {
                        setReports(reports.map(r => r.id === rep.id ? { ...r, upvotes: r.upvotes + 1 } : r));
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 border border-slate-700"
                    >
                      👍 {rep.upvotes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Safe Haven Refuges */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Clean Air Safe Havens</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-bold uppercase">Filtered Hubs</span>
            </div>
            <p className="text-xs text-slate-400">
              Public facilities equipped with hospital-grade filtration where vulnerable citizens can breathe clean air during emergency smog peaks.
            </p>

            <div className="space-y-3">
              {COMMUNITY_SAFE_HAVENS.map((sh) => (
                <div key={sh.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-200">{sh.name}</h4>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{sh.distanceKm} km away</span>
                        <span>·</span>
                        <span>{sh.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Indoor AQI {sh.indoorAqi}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 space-y-0.5">
                    <div><strong className="text-slate-400">Filtration:</strong> {sh.filtration}</div>
                    <div><strong className="text-slate-400">Hours:</strong> {sh.hours} ({sh.capacity})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Carpool Box */}
          <div className="glass-card rounded-2xl p-4 border border-sky-500/20 space-y-2.5">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wide">
              <Car className="w-4 h-4" />
              <span>Green School Carpool Initiative</span>
            </div>
            <p className="text-xs text-slate-300">
              Idling school cars generate <strong>40% of localized morning PM2.5</strong> in residential zones. 12 parents on your street are pooling trips.
            </p>
            <button
              onClick={() => alert('Connected with Sector 4 Green Carpool Coordinator!')}
              className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
            >
              Join Neighborhood School Pool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
