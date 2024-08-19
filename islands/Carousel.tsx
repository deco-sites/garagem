import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import IconCircleChevronsRight from "https://deno.land/x/tabler_icons_tsx@0.0.6/tsx/circle-chevrons-right.tsx";
import IconCircleChevronsLeft from "https://deno.land/x/tabler_icons_tsx@0.0.6/tsx/circle-chevrons-left.tsx";
import Slide from "./Slide.tsx";
import type { ImageWidget, Color } from "apps/admin/widgets.ts";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  style?: "Outline" | "Ghost";
}

type SlideProps = {
    class?: string;
    key?: number;
    data: {
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
    };
};

type CarouselProps = {
    showNavigation?: boolean;
    interval?: number;
    currentSlide?: number;
    automatic?: boolean;
    class?: string;
    showArrows?: boolean;
    data?: SlideProps["data"][];
    layout?: string;
};

const Carousel = (props: CarouselProps) => {
    const SLIDE_DATA = props.data ?? [];
    const NAVIGATION_COLOR = `hover:text-gray-300 text-primary`;
    const CHEVRON_STYLE = `absolute z-30 w-10 h-10 ${NAVIGATION_COLOR} cursor-pointer`;
    const SHOW_ARROW_NAVIGATION = props.showArrows ?? false;
    const SHOW_NAVIGATION = props.showNavigation ?? false;
    const SLIDE_INTERVAL = props.interval ?? 3.5;
    const currentSlide = useSignal(props.currentSlide ?? 0);
    const automatic = useSignal(props.automatic ?? true);
    const slideshowRef = useRef<HTMLDivElement>(null);

const slideClasses = (idx = 0) => {
    let outgoingSlide = currentSlide.value - 1;
    let incomingSlide = currentSlide.value + 1;
    if (outgoingSlide === -1) outgoingSlide = SLIDE_DATA.length - 1;
    if (incomingSlide === SLIDE_DATA.length) incomingSlide = 0;
    const TRANSITION_CLASS = () => {
        if (currentSlide.value === idx) return "translate-x-0 z-20";
        if (incomingSlide === idx) return "translate-x-full z-10";
        if (outgoingSlide === idx) return "-translate-x-full z-10";
        return "translate-x-full";
    };
    return `slide w-full absolute top-0 left-0 transition-all ease-in-out duration-700 transform ${TRANSITION_CLASS()}`;
};

const nextSlide = () => {
    if (SLIDE_DATA.length === currentSlide.value + 1) {
    currentSlide.value = 0;
    } else {
    currentSlide.value++;
    }
};

const previousSlide = () => {
    if (currentSlide.value === 0) {
        currentSlide.value = SLIDE_DATA.length - 1;
    } else {
        currentSlide.value--;
    }
};

const chevronClick = (doCallback = () => {}) => {
    if (automatic.value) automatic.value = false;
    return doCallback();
};

useEffect(() => {
    const interval = setInterval(() => {
        if (automatic.value) nextSlide();
    }, SLIDE_INTERVAL * 1000);
    return () => clearInterval(interval);
}, []);

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

const goToSlide = (slide_index = 0) => {
    if (automatic.value) automatic.value = false;
    currentSlide.value = slide_index;
};

const DotsNavigation = () => (
    <div class={"slide_nav w-full z-30 absolute bottom-10  lg:bottom-16"}>
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
                    {idx === currentSlide.value
                    ? <span class={`not-sr-only block w-20 h-1.5 rounded-lg animate-progress bg-white origin-left-right`} 
                        style={{animation: `progress ${SLIDE_INTERVAL}s linear infinite`}}></span>
                    : <span class="not-sr-only block w-20 h-1.5 rounded-lg"></span>}
                </button>
                );
            })}
        </div>
    </div>
);

return (
    <div
        ref={slideshowRef}
        class={`slideshow relative flex-1 flex-end p-0 overflow-hidden ${
            props.class ?? ""
        }`}
        aria-label="Slideshow"
        tabIndex={0}
    >
    {SHOW_ARROW_NAVIGATION &&
        <div>
            <button
                class={`left-0 ${CHEVRON_STYLE}`}
                style="top: calc(50% - 20px)"
                onClick={() => chevronClick(previousSlide)}
            >
                <IconCircleChevronsLeft class="w-10 h-10" aria-hidden="true" />
                <span class="sr-only">Previous slide</span>
            </button>
            <button
                class={`right-0 ${CHEVRON_STYLE}`}
                style="top: calc(50% - 20px)"
                onClick={() => chevronClick(nextSlide)}
            >
                <IconCircleChevronsRight class="w-10 h-10" aria-hidden="true" />
                <span class="sr-only">Next slide</span>
            </button>
        </div>
    }
    
    {SLIDE_DATA.map((item, idx) => (
        <Slide
            data={item}
            layout={props.layout}
            key={idx}
            class={slideClasses(idx)}
        />
    ))}
    { SHOW_NAVIGATION && <DotsNavigation /> }
        <Slide
            data={SLIDE_DATA[0]}
            layout={props.layout}
            class="opacity-0 pointer-events-none"
            key={SLIDE_DATA.length}
        />
    </div>
);
};

export default Carousel;