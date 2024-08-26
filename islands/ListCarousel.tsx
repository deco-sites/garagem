import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";


type SlideProps = {
    class?: string;
    key?: number;
    layout?: string;
    data: {
        imageDesktop?: string;
        imageMobile?: string;
        icon?: string;
        text?: string;
    };
};

type CarouselProps = {
    interval?: number;
    automatic?: boolean;
    layout?: string;
    data?: SlideProps["data"][];
};

const Slide = (props: SlideProps) => {
  const { key, data } = props;
  const { imageDesktop, imageMobile, icon, text } = data;

  if (props.class === undefined) props.class = "";
  return (
    <div key={key} className={`${props.class}`}>
        <figure>
            <Image
                width={793}
                height={470}
                class="object-fit w-full z-10 hidden lg:block"
                sizes="(max-width: 793px) 100vw, 30vw"
                src={imageDesktop ?? ""}
                alt={imageDesktop}
                decoding="async"
                loading="lazy"
            />
            <Image
                width={320}
                height={280}
                class="object-fit w-full z-10 lg:hidden"
                sizes="(max-width: 320px) 100vw, 30vw"
                src={imageMobile ?? ""}
                alt={imageMobile}
                decoding="async"
                loading="lazy"
            />
        </figure>
    </div>
  );
};

const ListCarousel = (props: CarouselProps) => {
    const SLIDE_DATA = props.data ?? [];
    const NAVIGATION_COLOR = `text-primary`;
    const CHEVRON_STYLE = `absolute z-30 w-10 h-10 ${NAVIGATION_COLOR} cursor-pointer`;
    const SHOW_ARROW_NAVIGATION = false;
    const SHOW_NAVIGATION = true;
    const SLIDE_INTERVAL = props.interval ?? 3.5;
    const currentSlide = useSignal(0);
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
    <div class={"slide_nav z-30 h-full"}>
        <div className="container h-full lg:px-0 flex flex-col justify-between gap-6">
            {SLIDE_DATA.map((_item, idx) => {
                return (
                <button
                    class={`${NAVIGATION_COLOR} ${idx !== currentSlide.value ? 'opacity-50' : 'opacity-100'} relative focus:outline-none overflow-hidden flex flex-col items-center h-full gap-8`}
                    onClick={() => {
                        goToSlide(idx);
                    }}
                    key={idx}
                >
                    <h3 className="flex gap-6 w-full">
                        <span className="flex shrink-0 items-center justify-center w-14 h-16 rounded-lg bg-primary">
                            <Image
                                width={24}
                                height={24}
                                class="object-fit z-10"
                                sizes="(max-width: 180px) 100vw, 30vw"
                                src={_item.icon ?? ""}
                                alt={_item.icon}
                                decoding="async"
                                loading="lazy"
                            />
                        </span>
                        <span class="shrink text-left">{_item.text}</span>
                    </h3>
                    <span class="sr-only">Go to slide {idx}</span>
                    {idx === currentSlide.value
                    ? <span class={`not-sr-only relative flex items-center w-full h-px border border-gray-400 rounded-lg origin-left-right animated-before my-1`} 
                        style={{ '--slide-interval': `${SLIDE_INTERVAL}s` }}></span>
                    : <span class="not-sr-only block w-full h-1.5 rounded-lg"></span>}
                </button>
                );
            })}
        </div>
    </div>
);

return (
    <div
        ref={slideshowRef}
        class={`slideshow relative display p-0 overflow-hidden`}
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
                
                <span class="sr-only">Previous slide</span>
            </button>
            <button
                class={`right-0 ${CHEVRON_STYLE}`}
                style="top: calc(50% - 20px)"
                onClick={() => chevronClick(nextSlide)}
            >
                
                <span class="sr-only">Next slide</span>
            </button>
        </div>
    }
        <div className="flex flex-col lg:flex-row gap-10">
            
            <div className="w-full order-2 lg:order-1 lg:w-1/3">
                {SHOW_NAVIGATION && <DotsNavigation />}
            </div>
            
            <div class={`relative overflow-hidden w-full order-1 lg:order-2 lg:w-2/3 flex self-auto h-[252px] md:h-[438px] lg:h-[390px] xl:h-[491px] 2xl:h-[600px]`}>
                {SLIDE_DATA.map((slide, idx) => (
                    <div key={idx} class={slideClasses(idx)}>
                        <Slide key={idx} data={slide} layout={props.layout}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};

export default ListCarousel;