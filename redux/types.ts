export interface TValuation {
  id: number;
  address: string;
  property_type: string;
  city: string;

  marktwert: number;
  spanne: [number, number];
  qm_preis: number;

  baujahr: number;
  wohnflaeche: number;
  zimmer: number;
  etage: string;

  lage_score: number;
  lage_sub: Record<string, any>;

  trend_1j: number;
  trend_5j: number;

  bodenrichtwert: number;
  miete_kalt: number;
  mietmultiplikator: number;
  vermarktung_tage: number;
  rendite_brutto: number;

  prognose_1j: number;
  angebote_aktuell: number;

  marktlage_de: string;
  marktlage_en: string;
  marktlage_type: string;

  confidence: number;

  comparables: TComparable[];

  preisverlauf: TPriceHistory[];
  mietverlauf: TRentHistory[];

  infrastruktur: TInfrastructure[];

  sozio: Record<string, any>;

  quellen: string[];

  created_at: string;

  actions: TValuationActions;
}

export interface TPriceHistory {
  j: string;
  p: number;
}

export interface TRentHistory {
  [key: string]: any;
}

export interface TComparable {
  [key: string]: any;
}

export interface TInfrastructure {
  [key: string]: any;
}

export interface TValuationActions {
  new_valuation_url: string;
  pdf_report_download: string;
  share_url: string;
}
