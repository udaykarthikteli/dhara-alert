export const nerStatesData = [
  {
    id: "meg",
    name: "Meghalaya",
    capital: "Shillong",
    center: [25.5788, 91.8933],
    zoom: 9,
    overallRisk: "CRITICAL",
    riskScore: 88,
    activeSensorsCount: 42,
    districts: ["East Khasi Hills", "West Jaintia Hills", "Ri-Bhoi", "South Garo Hills"],
    vulnerableHighways: [
      { id: "nh27", name: "NH-27 (Guwahati - Shillong Highway)", status: "CAUTION", condition: "Pore pressure rising at Nongpoh stretch", riskLevel: "HIGH" },
      { id: "nh44", name: "NH-44E (Shillong - Dawki Corridor)", status: "BLOCKED", condition: "Active rockfall near Pynursla (Km 42)", riskLevel: "CRITICAL" }
    ],
    hotspots: [
      { id: "hs1", name: "Pynursla Slope Failure Zone", lat: 25.2811, lng: 91.8988, risk: "CRITICAL", riskScore: 92, moisture: "94%", rainfall: "210 mm/24h", slope: "52°", road: "NH-44E" },
      { id: "hs2", name: "Cherrapunji (Sohra) Cliff Edge", lat: 25.2702, lng: 91.7323, risk: "HIGH", riskScore: 84, moisture: "91%", rainfall: "320 mm/24h", slope: "60°", road: "Sohra-Shella Rd" },
      { id: "hs3", name: "Nongpoh Valley Slide Zone", lat: 25.9015, lng: 91.8803, risk: "HIGH", riskScore: 78, moisture: "86%", rainfall: "175 mm/24h", slope: "40°", road: "NH-27" }
    ]
  },
  {
    id: "asm",
    name: "Assam",
    capital: "Dispur",
    center: [26.1445, 91.7362],
    zoom: 8,
    overallRisk: "HIGH",
    riskScore: 79,
    activeSensorsCount: 68,
    districts: ["Dima Hasao", "Cachar", "Karbi Anglong", "Kamrup Metropolitan"],
    vulnerableHighways: [
      { id: "nh27_asm", name: "NH-27 (Lumding - Haflong Rail/Road link)", status: "BLOCKED", condition: "Track & road bed washed away near Jatinga", riskLevel: "CRITICAL" },
      { id: "nh37", name: "NH-37 (Guwahati - Silchar Bypass)", status: "CAUTION", condition: "Mudslide risk at Sonapur hill section", riskLevel: "HIGH" }
    ],
    hotspots: [
      { id: "hs4", name: "Jatinga Valley (Dima Hasao)", lat: 25.1211, lng: 93.0332, risk: "CRITICAL", riskScore: 95, moisture: "98%", rainfall: "285 mm/24h", slope: "48°", road: "Lumding-Haflong Rd" },
      { id: "hs5", name: "Sonapur Hill Pass (Kamrup)", lat: 26.1122, lng: 91.9844, risk: "HIGH", riskScore: 76, moisture: "82%", rainfall: "145 mm/24h", slope: "38°", road: "NH-37" }
    ]
  },
  {
    id: "sik",
    name: "Sikkim",
    capital: "Gangtok",
    center: [27.3389, 88.6138],
    zoom: 9,
    overallRisk: "CRITICAL",
    riskScore: 91,
    activeSensorsCount: 35,
    districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    vulnerableHighways: [
      { id: "nh10", name: "NH-10 (Siliguri - Gangtok Arterial Road)", status: "BLOCKED", condition: "Major landslide at Teesta Bazar & 29th Mile", riskLevel: "CRITICAL" },
      { id: "jn_rd", name: "Jawaharlal Nehru Road (Gangtok - Nathula)", status: "CAUTION", condition: "Sub-zero ice thaw slide near Kyongnosla", riskLevel: "HIGH" }
    ],
    hotspots: [
      { id: "hs6", name: "29th Mile (Teesta River Basin)", lat: 27.0855, lng: 88.4288, risk: "CRITICAL", riskScore: 96, moisture: "99%", rainfall: "260 mm/24h", slope: "58°", road: "NH-10" },
      { id: "hs7", name: "Chungthang Dam Boundary Zone", lat: 27.6044, lng: 88.6488, risk: "HIGH", riskScore: 89, moisture: "90%", rainfall: "190 mm/24h", slope: "50°", road: "North Sikkim Hwy" }
    ]
  },
  {
    id: "aru",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    center: [27.0844, 93.6053],
    zoom: 8,
    overallRisk: "HIGH",
    riskScore: 82,
    activeSensorsCount: 50,
    districts: ["Tawang", "West Kameng", "Papum Pare", "Subansiri"],
    vulnerableHighways: [
      { id: "tawang_hwy", name: "Trans-Arunachal Highway (Bhalukpong - Tawang)", status: "CAUTION", condition: "Sela Tunnel approach road debris clearance", riskLevel: "HIGH" },
      { id: "itanagar_rd", name: "Itanagar - Banderdewa Highway", status: "CLEAR", condition: "Monitored by tiltmeters", riskLevel: "MODERATE" }
    ],
    hotspots: [
      { id: "hs8", name: "Sela Pass Boundary (Tawang)", lat: 27.5033, lng: 92.1055, risk: "HIGH", riskScore: 86, moisture: "88%", rainfall: "160 mm/24h", slope: "55°", road: "Tawang Hwy" },
      { id: "hs9", name: "Bhalukpong Mountain Stretch", lat: 27.0122, lng: 92.6399, risk: "HIGH", riskScore: 81, moisture: "85%", rainfall: "175 mm/24h", slope: "45°", road: "NH-229" }
    ]
  },
  {
    id: "nag",
    name: "Nagaland",
    capital: "Kohima",
    center: [25.6751, 94.1086],
    zoom: 9,
    overallRisk: "HIGH",
    riskScore: 85,
    activeSensorsCount: 29,
    districts: ["Kohima", "Dimapur", "Phek", "Mokokchung"],
    vulnerableHighways: [
      { id: "nh29", name: "NH-29 (Dimapur - Kohima Highway)", status: "BLOCKED", condition: "Massive mudslide near Pagala Pahar", riskLevel: "CRITICAL" }
    ],
    hotspots: [
      { id: "hs10", name: "Pagala Pahar Rockfall Zone", lat: 25.7511, lng: 93.8944, risk: "CRITICAL", riskScore: 94, moisture: "96%", rainfall: "230 mm/24h", slope: "62°", road: "NH-29" },
      { id: "hs11", name: "Kohima Checkpost Pass", lat: 25.6700, lng: 94.1100, risk: "MODERATE", riskScore: 68, moisture: "74%", rainfall: "110 mm/24h", slope: "35°", road: "Kohima Bypass" }
    ]
  },
  {
    id: "mni",
    name: "Manipur",
    capital: "Imphal",
    center: [24.8170, 93.9368],
    zoom: 9,
    overallRisk: "HIGH",
    riskScore: 80,
    activeSensorsCount: 31,
    districts: ["Noney", "Tamenglong", "Imphal West", "Churachandpur"],
    vulnerableHighways: [
      { id: "nh37_mni", name: "NH-37 (Imphal - Jiribam Highway)", status: "BLOCKED", condition: "Bridge & slope sinking near Noney Yard", riskLevel: "CRITICAL" }
    ],
    hotspots: [
      { id: "hs12", name: "Tupul Railway Yard (Noney)", lat: 24.7899, lng: 93.6588, risk: "CRITICAL", riskScore: 93, moisture: "97%", rainfall: "250 mm/24h", slope: "50°", road: "NH-37" },
      { id: "hs13", name: "Tamenglong Hill Ridge", lat: 24.9855, lng: 93.4988, risk: "HIGH", riskScore: 77, moisture: "81%", rainfall: "140 mm/24h", slope: "42°", road: "State Hwy 5" }
    ]
  },
  {
    id: "mzo",
    name: "Mizoram",
    capital: "Aizawl",
    center: [23.7271, 92.7176],
    zoom: 9,
    overallRisk: "CRITICAL",
    riskScore: 87,
    activeSensorsCount: 38,
    districts: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    vulnerableHighways: [
      { id: "nh54", name: "NH-54 (Aizawl - Lunglei Corridor)", status: "CAUTION", condition: "Hunthar Veng landslide subsidence active", riskLevel: "HIGH" }
    ],
    hotspots: [
      { id: "hs14", name: "Hunthar Veng Subsidence Zone", lat: 23.7422, lng: 92.7055, risk: "CRITICAL", riskScore: 90, moisture: "93%", rainfall: "215 mm/24h", slope: "47°", road: "NH-54" },
      { id: "hs15", name: "Bawngkawn Slope Pass", lat: 23.7588, lng: 92.7311, risk: "HIGH", riskScore: 83, moisture: "87%", rainfall: "165 mm/24h", slope: "41°", road: "Aizawl Ring Rd" }
    ]
  },
  {
    id: "trp",
    name: "Tripura",
    capital: "Agartala",
    center: [23.8315, 91.2868],
    zoom: 9,
    overallRisk: "MODERATE",
    riskScore: 62,
    activeSensorsCount: 22,
    districts: ["Dhalai", "Unakoti", "North Tripura", "West Tripura"],
    vulnerableHighways: [
      { id: "nh8", name: "NH-8 (Agartala - Sabroom Corridor)", status: "CLEAR", condition: "Minor soil erosion under control", riskLevel: "MODERATE" }
    ],
    hotspots: [
      { id: "hs16", name: "Atharamura Hill Range", lat: 23.8211, lng: 91.7588, risk: "MODERATE", riskScore: 65, moisture: "70%", rainfall: "95 mm/24h", slope: "30°", road: "NH-8" }
    ]
  }
];

export const sampleCitizenReports = [
  {
    id: "rep-101",
    timestamp: "10 mins ago",
    author: "Rongsen Ao (Field Official)",
    location: "Pagala Pahar (NH-29, Nagaland)",
    lat: 25.7511,
    lng: 93.8944,
    category: "Road Blocked by Debris",
    severity: "CRITICAL",
    description: "Huge boulder collapsed onto the main highway lane. Single lane traffic blocked. Emergency JCB deployed.",
    photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?w=500&auto=format&fit=crop&q=60",
    verified: true,
    gpsTag: "25.7511° N, 93.8944° E"
  },
  {
    id: "rep-102",
    timestamp: "25 mins ago",
    author: "Bantei Lyngdoh (Village Headman)",
    location: "Pynursla Market Curve (Meghalaya)",
    lat: 25.2811,
    lng: 91.8988,
    category: "Surface Tension Crack",
    severity: "HIGH",
    description: "Deep 4-inch crack developed along 50 meters of the road shoulder following continuous 3-day rainfall.",
    photoUrl: "https://images.unsplash.com/photo-1508873696983-2df515122519?w=500&auto=format&fit=crop&q=60",
    verified: true,
    gpsTag: "25.2811° N, 91.8988° E"
  },
  {
    id: "rep-103",
    timestamp: "1 hour ago",
    author: "Tashi Bhutia (Citizen)",
    location: "Teesta Bazar Bridge Approach (Sikkim)",
    lat: 27.0855,
    lng: 88.4288,
    category: "Flash Flood / Mudslide",
    severity: "CRITICAL",
    description: "Teesta river overflowing onto riverbank road bed. Sludge accumulation 2 feet deep.",
    photoUrl: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&auto=format&fit=crop&q=60",
    verified: true,
    gpsTag: "27.0855° N, 88.4288° E"
  }
];
