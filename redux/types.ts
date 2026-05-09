// ════════════════════════════════════════
// METRICAS — Data Types
// Complete property valuation data model
// ════════════════════════════════════════

export interface TComparable {
  addr: string;
  preis: number;
  qm: number;
  dist: string;
  bj: number;
  qm_p: number;
}

export interface TPricePoint {
  j: string; // Year
  p: number; // Price (€/m² for buy, €/m²/month for rent)
}

export interface TInfrastructureItem {
  de: string;
  en: string;
  val: string; // e.g. "1 min"
  icon: string; // emoji
}

export interface TLocationSubScores {
  mikrolage: number; // 0-100
  makrolage: number; // 0-100
  infrastruktur: number; // 0-100
  sozial: number; // 0-100
}

export interface TSocio {
  kaufkraft_idx: number; // Purchasing power index (100 = average)
  altersschnitt: number; // Average age
  einwohner_qkm: number; // Population density per km²
  arbeitslosenquote: number; // Unemployment rate %
  akademiker_anteil: number; // University degree share %
}

export type TMarketType = 'sell' | 'bal' | 'buy';

export interface TSurveyResults {
  // Core valuation
  marktwert: number; // Market value in EUR
  spanne: [number, number]; // Value range [min, max]
  confidence: number; // Confidence score 0-100
  qm_preis: number; // Price per sqm

  // Trends & forecast
  trend_1j: number; // 1-year price trend %
  trend_5j: number; // 5-year price trend %
  prognose_1j: number; // 1-year forecast %
  bodenrichtwert: number; // Land value per sqm

  // Rental & yield
  miete_kalt: number; // Cold rent €/m²/month
  rendite_brutto: number; // Gross rental yield %
  mietmultiplikator: number; // Rent multiplier
  vermarktung_tage: number; // Average days on market
  angebote_aktuell: number; // Current listings in area

  // Property details
  baujahr: number;
  wohnflaeche: number;
  zimmer: number;
  etage: string;
  city: string;

  // Location
  lage_score: number; // 0-100
  lage_sub: TLocationSubScores;
  marktlage_de: string;
  marktlage_en: string;
  marktlage_type: TMarketType;

  // Comparables & history
  comparables: TComparable[];
  preisverlauf: TPricePoint[];
  mietverlauf: TPricePoint[];

  // Infrastructure & neighborhood
  infrastruktur: TInfrastructureItem[];
  sozio: TSocio;

  // Data sources
  quellen: string[];
}
