import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../sdk/useId.ts";
import Carousel  from "site/islands/Carousel.tsx";

/**
 * @titleBy alt
 */
export interface Section {
  content?: {
    title?: Title[];
  };
}
export interface Features {
  content?: {
    image?: ImageWidget;
    backgroundColor?: Color;
    title?: string;
    description?: string;
    button?: {
      id?: string;
      href: string;
      text: string;
      icon: boolean;
    }[];
  }[];
}

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
interface Title {
  highlight?: string;
  highlightColor?: Color;
  title: string;
}

export interface Props {
  title?: string;
  section?: Section;
  slides?: Features[];
  setup?: SliderSetup;
}

function Features(
  { section, slide, setup }: { section: Section, slide: Features; setup: SliderSetup },
) {
  const {
    content,
  } = slide;

  return (
    <div className="px-4 py-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
          <div className="section-content max-w-72 md:max-w-full">
            {section?.content?.title?.map((item, idx) => (
              <h1 key={idx}
                  class="text-3xl md:text-5xl font-semibold text-primary pb-7">
                  <span style={{color: item?.highlightColor}}>{item?.highlight}</span>
                  {item?.title}
              </h1>
            ))}
          </div>
          <Carousel
            position="relative"
            class="min-h-[758px] md:min-h-[730px]"
            interval={setup.interval}
            automatic={setup.autoplay}
            infinite={false}
            data={content}
            showArrows={true}
            layout={setup.layout}
            showNavigation={setup.dots}
          />
        </div>
      </div>
    </div>
  );
}

export default Features;
