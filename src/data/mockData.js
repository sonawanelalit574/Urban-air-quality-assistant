export const CITIES = [
  {
    id: 'delhi',
    name: 'Delhi-NCR',
    country: 'India',
    lat: 28.6139,
    lon: 77.2090,
    currentAqi: 395,
    status: 'Hazardous',
    statusColor: 'bg-red-700 text-red-100 border-red-500',
    pm25: 268.4,
    pm10: 412.0,
    no2: 84.5,
    co: 2.8,
    temp: 14,
    humidity: 78,
    windSpeed: 3.2,
    inversionBoundaryMeters: 140,
    inversionActive: true,
    solarWindowStart: '12:30 PM',
    solarWindowEnd: '03:45 PM',
    primaryPollutant: 'PM2.5 (Biomass & Vehicular)',
    advisory: 'Emergency smog conditions. Thermal inversion has trapped toxic particulates beneath 140m. Avoid morning outdoor activities completely.',
    hourly: [
      { time: '00:00', aqi: 340, pm25: 220, temp: 13, inversion: true },
      { time: '02:00', aqi: 360, pm25: 235, temp: 12, inversion: true },
      { time: '04:00', aqi: 390, pm25: 255, temp: 11, inversion: true },
      { time: '06:00', aqi: 440, pm25: 310, temp: 11, inversion: true, isPeak: true },
      { time: '08:00', aqi: 460, pm25: 325, temp: 13, inversion: true, isPeak: true },
      { time: '10:00', aqi: 380, pm25: 245, temp: 16, inversion: true },
      { time: '12:00', aqi: 240, pm25: 140, temp: 21, inversion: false, isSolarWindow: true },
      { time: '14:00', aqi: 185, pm25: 98, temp: 23, inversion: false, isSolarWindow: true },
      { time: '16:00', aqi: 230, pm25: 130, temp: 20, inversion: false },
      { time: '18:00', aqi: 320, pm25: 205, temp: 17, inversion: true },
      { time: '20:00', aqi: 370, pm25: 240, temp: 15, inversion: true },
      { time: '22:00', aqi: 360, pm25: 230, temp: 14, inversion: true }
    ]
  },
  {
    id: 'slc',
    name: 'Salt Lake City Basin',
    country: 'United States',
    lat: 40.7608,
    lon: -111.8910,
    currentAqi: 172,
    status: 'Unhealthy',
    statusColor: 'bg-red-500 text-white border-red-400',
    pm25: 96.2,
    pm10: 124.0,
    no2: 42.1,
    co: 1.2,
    temp: -2,
    humidity: 82,
    windSpeed: 2.1,
    inversionBoundaryMeters: 220,
    inversionActive: true,
    solarWindowStart: '01:00 PM',
    solarWindowEnd: '03:30 PM',
    primaryPollutant: 'PM2.5 (Cold-pool Basin Inversion)',
    advisory: 'Winter cold air pool trapped by Wasatch mountains. Ground pollution cannot escape. Reschedule outdoor runs to mid-afternoon.',
    hourly: [
      { time: '00:00', aqi: 150, pm25: 75, temp: -4, inversion: true },
      { time: '04:00', aqi: 165, pm25: 88, temp: -5, inversion: true },
      { time: '08:00', aqi: 195, pm25: 115, temp: -3, inversion: true, isPeak: true },
      { time: '10:00', aqi: 180, pm25: 102, temp: 0, inversion: true },
      { time: '12:00', aqi: 140, pm25: 68, temp: 2, inversion: false, isSolarWindow: true },
      { time: '14:00', aqi: 115, pm25: 52, temp: 3, inversion: false, isSolarWindow: true },
      { time: '16:00', aqi: 135, pm25: 65, temp: 1, inversion: false },
      { time: '20:00', aqi: 170, pm25: 94, temp: -2, inversion: true }
    ]
  },
  {
    id: 'milan',
    name: 'Milan / Po Valley',
    country: 'Italy',
    lat: 45.4642,
    lon: 9.1900,
    currentAqi: 164,
    status: 'Unhealthy',
    statusColor: 'bg-red-500 text-white border-red-400',
    pm25: 88.5,
    pm10: 110.0,
    no2: 56.4,
    co: 1.4,
    temp: 5,
    humidity: 89,
    windSpeed: 1.8,
    inversionBoundaryMeters: 190,
    inversionActive: true,
    solarWindowStart: '12:00 PM',
    solarWindowEnd: '02:30 PM',
    primaryPollutant: 'PM2.5 & NO2 (Alpine Ring Basin)',
    advisory: 'Stagnant high-pressure system across Lombardy plain. Dense morning fog mixing with diesel particulate. Ventilate homes only midday.',
    hourly: [
      { time: '00:00', aqi: 145, pm25: 72, temp: 4, inversion: true },
      { time: '04:00', aqi: 155, pm25: 80, temp: 3, inversion: true },
      { time: '08:00', aqi: 185, pm25: 108, temp: 4, inversion: true, isPeak: true },
      { time: '12:00', aqi: 130, pm25: 60, temp: 8, inversion: false, isSolarWindow: true },
      { time: '14:00', aqi: 110, pm25: 48, temp: 9, inversion: false, isSolarWindow: true },
      { time: '18:00', aqi: 160, pm25: 85, temp: 6, inversion: true }
    ]
  },
  {
    id: 'beijing',
    name: 'Beijing Plain',
    country: 'China',
    lat: 39.9042,
    lon: 116.4074,
    currentAqi: 215,
    status: 'Very Unhealthy',
    statusColor: 'bg-purple-600 text-white border-purple-500',
    pm25: 154.0,
    pm10: 220.0,
    no2: 68.2,
    co: 1.9,
    temp: -1,
    humidity: 62,
    windSpeed: 2.8,
    inversionBoundaryMeters: 160,
    inversionActive: true,
    solarWindowStart: '01:00 PM',
    solarWindowEnd: '03:30 PM',
    primaryPollutant: 'PM2.5 (Regional Heating & Transport)',
    advisory: 'Orange Alert winter stagnation. High atmospheric stability. N95/FFP2 respirators mandatory during outdoor transit.',
    hourly: [
      { time: '00:00', aqi: 190, pm25: 130, temp: -3, inversion: true },
      { time: '07:00', aqi: 245, pm25: 185, temp: -2, inversion: true, isPeak: true },
      { time: '13:00', aqi: 145, pm25: 85, temp: 4, inversion: false, isSolarWindow: true },
      { time: '15:00', aqi: 130, pm25: 72, temp: 5, inversion: false, isSolarWindow: true },
      { time: '19:00', aqi: 210, pm25: 150, temp: 0, inversion: true }
    ]
  }
];

export const VULNERABILITY_PROFILES = [
  {
    id: 'toddler_asthma',
    label: 'Family with Toddler & Asthmatic Member',
    description: 'High risk for acute bronchospasm and developing respiratory tissue. Sensitive to PM2.5 > 35 µg/m³.',
    sensitivityMultiplier: 2.8,
    maskRecommendation: 'Tight-fitting N95/FFP2 with silicone seal',
    recommendedOutdoorCapAqi: 100
  },
  {
    id: 'seniors_copd',
    label: 'Senior Citizen / Cardiovascular Risk',
    description: 'Elevated vulnerability to systemic arterial inflammation and spike in blood pressure from ultrafine particles.',
    sensitivityMultiplier: 2.4,
    maskRecommendation: 'Valved or unvalved N95 with low inhalation resistance',
    recommendedOutdoorCapAqi: 100
  },
  {
    id: 'healthy_adults',
    label: 'General Healthy Household',
    description: 'Standard exposure tolerance, but cumulative chronic toxicity risks during multi-week winter smog domes.',
    sensitivityMultiplier: 1.0,
    maskRecommendation: 'N95 or KF94 during peak hours',
    recommendedOutdoorCapAqi: 150
  }
];

export const IAQ_HACKS = [
  {
    id: 'corsi_rosenthal',
    name: 'DIY Corsi-Rosenthal Box Air Cleaner',
    category: 'DIY Filtration',
    cost: '$35 - $45',
    commercialEquivCost: '$350 - $500',
    cadr: '450 - 550 CFM',
    purgeMinutes: 14,
    efficiency: '92% PM2.5 reduction',
    description: 'Constructed using a standard 20-inch box fan and 4x MERV-13 furnace filters taped in a cube with a cardboard shroud. Delivers commercial clean air delivery rate (CADR) at 1/10th the cost.',
    materials: ['1x 20" Box Fan ($20)', '4x MERV-13 Filters 20x20x2 ($20 total)', 'Duct Tape', 'Cardboard Shroud cutout'],
    impactBadge: 'Top Recommended Budget Hack'
  },
  {
    id: 'cross_vent_timing',
    name: 'Inversion-Aware Micro-Ventilation',
    category: 'Ventilation Protocol',
    cost: 'Free ($0)',
    commercialEquivCost: 'N/A',
    cadr: 'Natural Dispersal',
    purgeMinutes: 20,
    efficiency: 'Maintains CO2 < 800 ppm without smog spike',
    description: 'Never open windows between 06:00-09:30 AM or after 18:00 (peak thermal inversion). Open opposing windows for exactly 15 minutes between 13:00-14:30 when solar heating dilutes ground particulates.',
    materials: ['Window latches', 'Outdoor AQI check'],
    impactBadge: 'Zero Cost Protocol'
  },
  {
    id: 'botanical_filtration',
    name: 'NASA Clean Air Botanical Array',
    category: 'Natural IAQ Support',
    cost: '$25 - $40',
    commercialEquivCost: 'Long-term IAQ Balance',
    cadr: 'Secondary VOC Sink',
    purgeMinutes: 'Continuous',
    efficiency: 'VOC & Formaldehyde absorption + O2 output',
    description: 'Snake Plant (Sansevieria) produces oxygen at night (CAM photosynthesis), making it ideal for bedrooms. Areca Palm and Peace Lily add humidity and absorb volatile compounds.',
    materials: ['2x Snake Plants (Bedrooms)', '1x Areca Palm (Living Room)', 'Well-drained pots'],
    impactBadge: 'Living Filter'
  },
  {
    id: 'kitchen_exhaust_protocol',
    name: 'Kitchen Pressure & Exhaust Run Protocol',
    category: 'Source Control',
    cost: 'Free ($0)',
    commercialEquivCost: 'Prevents 180 µg/m³ indoor spike',
    cadr: 'Direct Evacuation',
    purgeMinutes: 10,
    efficiency: 'Eliminates 85% cooking PM2.5',
    description: 'Frying and roasting release ultrafine oils and acrolein. Turn exhaust fan to MAX 2 minutes BEFORE igniting stove, close kitchen door to seal living area, and run exhaust for 10 minutes post-cooking.',
    materials: ['Existing kitchen hood', 'Closed interior door'],
    impactBadge: 'Crucial Health Habit'
  }
];

export const COMMUNITY_SAFE_HAVENS = [
  {
    id: 'sh_1',
    name: 'City Central Library – High-Filtration Haven',
    type: 'Public Library',
    distanceKm: 1.2,
    indoorAqi: 24,
    filtration: 'Central HVAC with MERV 16 + Activated Carbon',
    capacity: '250 people',
    status: 'Open (Quiet Study & Clean Breathing)',
    hours: '08:00 AM - 08:00 PM'
  },
  {
    id: 'sh_2',
    name: 'Community Sports Complex (Sealed Indoor Arena)',
    type: 'Recreation Center',
    distanceKm: 2.4,
    indoorAqi: 35,
    filtration: 'Industrial HEPA scrubbers installed for winter smog',
    capacity: '400 people',
    status: 'Open (Indoor walking & senior lounge)',
    hours: '06:00 AM - 09:00 PM'
  },
  {
    id: 'sh_3',
    name: 'District Multi-Specialty Clinic Air Refuge',
    type: 'Healthcare Hub',
    distanceKm: 0.8,
    indoorAqi: 18,
    filtration: 'Hospital-grade ISO Class 8 HEPA',
    capacity: '60 people (Priority to infants & elderly)',
    status: 'Open 24/7 (Medical Nebulization Available)',
    hours: '24 Hours'
  }
];
