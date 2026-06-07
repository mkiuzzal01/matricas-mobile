import { TValuation } from "@/redux/types";

export const demoValuation: TValuation = {
  id: 101,
  address: "Banani Road 11, Dhaka",
  property_type: "Apartment",
  city: "Dhaka",

  marktwert: 12500000,
  spanne: [11800000, 13200000],
  qm_preis: 85000,

  baujahr: 2015,
  wohnflaeche: 1450,
  zimmer: 3,
  etage: "5th Floor",

  lage_score: 8.7,
  lage_sub: {
    safety: 9,
    transport: 8,
    schools: 9,
    shopping: 8,
    greenery: 7,
  },

  trend_1j: 4.2,
  trend_5j: 18.6,

  bodenrichtwert: 72000,
  miete_kalt: 45000,
  mietmultiplikator: 23.1,
  vermarktung_tage: 42,
  rendite_brutto: 5.8,

  prognose_1j: 6.1,
  angebote_aktuell: 14,

  marktlage_de: "Stabile Nachfrage mit leichtem Wachstum",
  marktlage_en: "Stable demand with moderate growth",
  marktlage_type: "balanced",

  confidence: 0.87,

  comparables: [
    {
      id: 1,
      address: "Gulshan 2, Dhaka",
      price: 13000000,
      size: 1500,
      price_per_sqm: 86600,
    },
    {
      id: 2,
      address: "Dhanmondi 27, Dhaka",
      price: 12000000,
      size: 1400,
      price_per_sqm: 85700,
    },
    {
      id: 3,
      address: "Uttara Sector 10, Dhaka",
      price: 11000000,
      size: 1350,
      price_per_sqm: 81400,
    },
  ],

  preisverlauf: [
    { j: "2021", p: 10000000 },
    { j: "2022", p: 10600000 },
    { j: "2023", p: 11400000 },
    { j: "2024", p: 12100000 },
    { j: "2025", p: 12500000 },
  ],

  mietverlauf: [
    { year: "2021", rent: 38000 },
    { year: "2022", rent: 40000 },
    { year: "2023", rent: 42000 },
    { year: "2024", rent: 44000 },
    { year: "2025", rent: 45000 },
  ],

  infrastruktur: [
    { type: "school", name: "Banani Model School", distance_km: 0.6 },
    { type: "hospital", name: "United Hospital", distance_km: 2.1 },
    { type: "metro", name: "Airport Rail Station", distance_km: 3.4 },
    { type: "mall", name: "Bashundhara City", distance_km: 4.2 },
  ],

  sozio: {
    population_density: "high",
    income_level: "upper-middle",
    crime_rate: "low",
  },

  quellen: [
    "Dhaka Real Estate Index 2025",
    "Local Market Survey",
    "Government Land Registry",
  ],

  created_at: new Date().toISOString(),

  actions: {
    new_valuation_url: "/valuation/new",
    pdf_report_download: "/valuation/101/pdf",
    share_url: "/valuation/101/share",
  },
};
