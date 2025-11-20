export interface Links {
  primary?: string;
  others?: string[];
}

export interface Images {
  primary?: string;
  others?: string[];
}

export interface DateRange {
  startDate: string;
  endDate: string | "Present";
}
