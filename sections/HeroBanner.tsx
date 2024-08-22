import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import HeroCarousel from "site/islands/HeroCarousel.tsx";

interface SliderSetup {
  /** @description Slider layout definition (default: HeroBanner) */
  layout?: "HeroBanner" | "Features" | "List";
  /**
   * @title Interval
   * @description Time (in seconds) between slide changes (default: 3.5)
   */
  interval?: number;
  /**
   * @title Show arrows
   * @description Show arrows to navigate through the images (default: false)
  */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description Show dots to navigate through the images (default: false)
  */
  dots?: boolean;
  /**
   * @title Autoplay
   * @description Defines if the carousel should start autoplaying (default: true)
  */
  autoplay?: boolean;
  /**
   * @title Start at
   * @description Index of the slide to start at (default: 0) counting from 0
  */
  startAt?: number;
}
export interface Props {
  banners?: Banners[];
  setup?: SliderSetup;
}

export interface CTA {
  id?: string;
  href: string;
  text: string;
  style?: "Outline" | "Ghost";
}

export interface Banners {
  backgroundColor?: Color;
  tagline?: ImageWidget;
  title?: string;
  description?: string;
  image?: ImageWidget;
  button?: CTA[];
  cta?: CTA[];
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };
}

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/772e246e-1959-46ac-a309-3f25ab20af6f";

function HeroBanner({
  setup: { layout, interval, arrows, dots, autoplay, startAt } = {},
  banners = [
    {
      title: "Here's an intermediate size heading you can edit",
      description: "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
      tagline: "Tagline",
      image: DEFAULT_IMAGE,
      disableSpacing: {
        top: false,
        bottom: false,
      },
      cta : [
        { id: "change-me-1", href: "/", text: "Change me", style: "Outline" },
        { id: "change-me-2", href: "/", text: "Change me", style: "Ghost" },
      ],
    }
  ],
}: Props) {

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <HeroCarousel
        class="relative overflow-hidden"
        interval={interval}
        automatic={false}
        data={banners}
        showArrows={arrows}
        layout={layout}
        showNavigation={dots}
    />
  );
}

export default HeroBanner;