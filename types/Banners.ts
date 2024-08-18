import type { ImageWidget, Color } from "apps/admin/widgets.ts";

export interface Banners {
  [x: string]: any;
  backgroundColor?: Color;
  tagline?: ImageWidget;
  title?: string;
  description?: string;
  image?: ImageWidget;
  // placement: "left" | "right";
  button?: CTA[];
  cta?: CTA[];
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };
}
export interface CTA {
  id?: string;
  href: string;
  text: string;
  style?: "Outline" | "Ghost";
}