import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";
import Carousel from "site/islands/Carousel.tsx";

export interface Props {
  title?: string;
  banners?: Banners[];
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    showArrows?: boolean;
  };
  data?: Banners[]; // Add the data property
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
  placement?: "left" | "right";
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
  title = "HeroBanner",
  layout = {
    numberOfSliders: {
      mobile: 1,
      desktop: 3,
    },
    showArrows: false,
  } as Props["layout"],
  banners = [
    {
      title: "Here's an intermediate size heading you can edit",
      description: "This text is fully editable and ready for your personal touch. Just click here, head over to the section window, or dive straight into the code to make changes as you see fit. Whether it's about the content, formatting, font, or anything in between, editing is just a click away.",
      tagline: "Tagline",
      image: DEFAULT_IMAGE,
      placement: "left",
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
    <Carousel
        class="relative"
        currentSlide={0}
        interval={5000}
        automatic={true}
        data={banners}
        showArrows={false}
    />
  );
}

export default HeroBanner;