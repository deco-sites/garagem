import { useSignal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import IconArrowRight from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/arrow-right.tsx"
import IconArrowLeft from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/arrow-left.tsx"
import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "site/components/ui/Button.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  style?: "Outline" | "Ghost";
}

interface Button {
  id?: string;
  href: string;
  text: string;
  icon: boolean;
}

type SlideProps = {
  class?: string;
  key?: number;
  layout?: string;
  activate?: () => void;
  data: {
    backgroundColor?: Color;
    tagline?: ImageWidget;
    title?: string;
    description?: string;
    image?: ImageWidget;
    placement?: "left" | "right";
    button?: Button[];
    cta?: CTA[];
    disableSpacing?: {
      top?: boolean;
      bottom?: boolean;
    };
    isVisible?: boolean;
  };
};

type CarouselProps = {
  class?: string;
  showNavigation?: boolean;
  interval?: number;
  automatic?: boolean;
  showArrows?: boolean;
  data?: SlideProps["data"][];
  layout?: string;
  position?: string;
  infinite?: boolean;
};

const Slide = (props: SlideProps) => {
  const { key, data } = props;
  const { backgroundColor, tagline, title, image, description, button } = data;
  if (props.class === undefined) props.class = "";
  return (
    <div key={key} className={`${props.class} w-96 flex self-auto justify-stretch`}>
        <div className="flex flex-col p-6 rounded-xl flex self-auto justify-between" style={"background-color: " + backgroundColor}>
            <figure class="pb-7">
                <Image
                    width={308}
                    height={346}
                    class="object-fit z-10"
                    sizes="(max-width: 180px) 100vw, 30vw"
                    src={image ?? ""}
                    alt={image}
                    decoding="async"
                    loading="lazy"
                />
            </figure>
            <h2 class="text-3xl font-semibold text-primary pb-7">{title}</h2>
            <p class="text-primary text-base pb-7">{description}</p>
            <div class="flex space-x-4 ">
                {button?.map((button) => (
                    <Button key={button.id} href={button.href} text={button.text} icon={button.icon}/>
                ))}
            </div>
        </div>
    </div>
  );
};

const Carousel = (props: CarouselProps) => {
  const SLIDE_DATA = props.data ?? [];
  const NAVIGATION_COLOR = `hover:text-gray-300 text-primary`;
  const CHEVRON_STYLE = `w-16 h-14 ${NAVIGATION_COLOR} cursor-pointer border border-gray-300 rounded-lg`;
  const SHOW_ARROW_NAVIGATION = props.showArrows ?? false;
  const SHOW_NAVIGATION = props.showNavigation ?? false;
  const SLIDE_INTERVAL = props.interval ?? 3.5;
  const automatic = useSignal(props.automatic ?? true);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const position = props.position ?? "absolute";
  const isInfinite = props.infinite ?? true

  useEffect(() => {
    updateSlideVisibility();
  }, []);

  useEffect(() => {
    if (SLIDE_DATA.length > 0) {
      SLIDE_DATA.forEach((slide) => {
        slide.isVisible = true;
      });
    }
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [shownSlides, setShownSlides] = useState(new Set());
  const [slideVisibility, setSlideVisibility] = useState(
    SLIDE_DATA.map(() => ({ visible: true, position: 0 }))
  );

  useEffect(() => {
    setSlideVisibility(SLIDE_DATA.map(() => ({ visible: true, position: 0 })));
  }, []);

  const updateSlideVisibility = () => {
    setSlideVisibility((prevVisibility) =>
      prevVisibility.map((_, index) => ({
        visible:
          index === SLIDE_DATA.length - 1 ||
          !shownSlides.has(index) ||
          index === currentSlide,
        position: index - currentSlide,
      }))
    );
  };

  useEffect(() => {
    updateSlideVisibility();
  }, [currentSlide, shownSlides]);

  const nextSlide = () => {
    if (currentSlide < SLIDE_DATA.length - 1) {
      setShownSlides((prev) => new Set(prev).add(currentSlide));
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
  setShownSlides((prev) => {
    const newShownSlides = new Set(prev);
    newShownSlides.delete(currentSlide);
    return newShownSlides;
  });

  if (currentSlide > 0) {
    setCurrentSlide(currentSlide - 1);
  }
};

  const chevronClick = (doCallback: () => void) => {
    if (automatic.value) automatic.value = false;
    return doCallback();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (automatic.value && currentSlide < SLIDE_DATA.length - 1) nextSlide();
    }, SLIDE_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const slideClasses = (idx: any, index: any) => {
    const TRANSITION_CLASS = () => {
      if (idx.visible === false) return `opacity-0 translate-x-full scale-3d`;
      if (idx.position === 0 && idx.position !== index) return '-translate-x-full';
      
      return 'translate-x-0 scale-100 opacity-100';
    }
    return `${TRANSITION_CLASS()}`;
  }

  const ArrowKeyNavigation = () => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (automatic.value) automatic.value = false;
      switch (event.code) {
        case "ArrowLeft":
          event.preventDefault();
          previousSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextSlide();
          break;
        default:
          break;
      }
    };
    slideshowRef.current?.addEventListener("keydown", keydownHandler);
    return () =>
      slideshowRef.current?.removeEventListener("keydown", keydownHandler);
  };
  useEffect(ArrowKeyNavigation, []);
  

  const goToSlide = (slide_index: number) => {
    if (automatic.value) automatic.value = false;
    setCurrentSlide(slide_index);
  };

  const DotsNavigation = () => (
    <div class={"slide_nav w-full z-40 absolute bottom-10  lg:bottom-16"}>
      <div className="container px-4 lg:px-0 flex gap-6">
        {SLIDE_DATA.map((_item, idx) => {
          return (
            <button
              class={`${NAVIGATION_COLOR} relative focus:outline-none overflow-hidden rounded-lg bg-white bg-opacity-30`}
              onClick={() => {
                goToSlide(idx);
              }}
              key={idx}
            >
              <span class="sr-only">Go to slide {idx}</span>
              {idx === currentSlide ? (
                <span
                  class={`not-sr-only block w-20 h-1.5 rounded-lg animate-progress bg-white origin-left-right`}
                  style={{
                    animation: `progress ${SLIDE_INTERVAL}s linear infinite`,
                  }}
                ></span>
              ) : (
                <span class="not-sr-only block w-20 h-1.5 rounded-lg"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
  return (
    <div
      ref={slideshowRef}
      class={`slideshow ${props.class ?? ""}`}
      aria-label="Slideshow"
      tabIndex={0}
    >
      {SHOW_ARROW_NAVIGATION && (
        <div class="position left-0 absolute flex justify-between gap-x-5 z-40" style="top: calc(75% - 20px)">
          <button
            class={`${CHEVRON_STYLE} z-40 flex items-center justify-center`}
            onClick={() => chevronClick(previousSlide)}
          >
            <IconArrowLeft class="w-10 h-10" aria-hidden="true" />
            <span class="sr-only">Previous slide</span>
          </button>
          <button
            class={`${CHEVRON_STYLE} z-40 flex items-center justify-center`}
            onClick={() => chevronClick(nextSlide)}
          >
            <IconArrowRight class="w-10 h-10" aria-hidden="true" />
            <span class="sr-only">Next slide</span>
          </button>
        </div>
      )}

      <div class={`relative overflow-hidden flex self-auto justify-stretch gap-x-4 mx-auto`}>
        {SLIDE_DATA.map((slide, idx) => (
          <div key={idx} class={`slide-item-${idx} transition-all flex self-auto justify-stretch 
          ease-in-out duration-700 transform transform-gpu
            ${slideClasses(slideVisibility[idx], idx)}
          `}>
            <Slide key={idx} data={slide} />
          </div>
        ))}
      </div>

      {SHOW_NAVIGATION && <DotsNavigation />}
    </div>
  );
};

export default Carousel;