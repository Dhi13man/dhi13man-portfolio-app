import type { Links } from "./common";

export interface Recommendation {
  text: string;
  from: string;
  links?: Links;
}
