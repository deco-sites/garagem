import { useSignal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
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

interface DotsNavigationProps {
    goToSlide: (slide_index?: number) => void;
    currentSlide: {
        value: number;
    }
    SLIDE_INTERVAL: number;
}

type CarouselProps = {
    interval?: number;
    automatic?: boolean;
    layout?: string;
    data?: SlideProps["data"][];
};

const Slide = (props: SlideProps) => {
  const { key, data } = props;
  const { imageDesktop, imageMobile } = data;

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
    const SLIDE_INTERVAL = props.interval ?? 3.5;
    const currentSlide = useSignal(0);
    const automatic = useSignal(props.automatic ?? true);
    const slideshowRef = useRef<HTMLDivElement>(null);
    const layout = props.layout === 'left';
    const [activeSlide, setActiveSlide] = useState(-1);

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

    const DotsNavigation = ({ goToSlide, currentSlide, SLIDE_INTERVAL }: DotsNavigationProps) => (
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
                            <span class="shrink text-left text-lg font-medium leading-5">{_item.text}</span>
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

    useEffect(() => {
        if (currentSlide.value !== activeSlide) {
            setTimeout(() => setActiveSlide(currentSlide.value), 100);
        }
    }, [currentSlide.value]);

    return (
        <div
            class={`slideshow relative display p-0 overflow-hidden`}
            aria-label="Slideshow"
            tabIndex={0}
        >
            {/* Layout para dispositivos maiores */}
            <div className="hidden lg:flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-1/3 md:py-4" style={layout === true ? {order: 2} : {order: 1}}>
                    <DotsNavigation goToSlide={goToSlide} currentSlide={currentSlide} SLIDE_INTERVAL={SLIDE_INTERVAL} />
                </div>
                <div class={`relative overflow-hidden w-full lg:order-1 lg:w-2/3 flex self-auto h-[252px] md:h-[438px] lg:h-[390px] xl:h-[491px] 2xl:h-[600px]`} style={layout === true ? {order: 1} : ''}>
                    {SLIDE_DATA.map((slide, idx) => (
                        <div key={idx} class={slideClasses(idx)}>
                            <Slide key={idx} data={slide} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Layout para mobile */}
            <div className="lg:hidden flex flex-col gap-6">
                {SLIDE_DATA.map((slide, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        <button
                            class={`${NAVIGATION_COLOR} relative focus:outline-none flex flex-col items-center gap-4`}
                            onClick={() => goToSlide(idx)}
                        >
                            <h3 className="flex gap-4 w-full">
                                <span className="flex shrink-0 items-center justify-center w-14 h-16 rounded-lg bg-primary">
                                    <Image
                                        width={24}
                                        height={24}
                                        class="object-fit z-10"
                                        sizes="(max-width: 180px) 100vw, 30vw"
                                        src={slide.icon ?? ""}
                                        alt={slide.icon}
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </span>
                                <span class="shrink text-left text-lg font-medium leading-5">{slide.text}</span>
                            </h3>
                        </button>
                        {/* Exibindo o slider correspondente abaixo do botão no mobile com animação */}
                        <div
                            class={`w-full mt-4 fade-in-slide-up ${
                                activeSlide === idx ? 'fade-in-slide-up-active' : ''
                            }`}
                        >
                            <Slide key={idx} data={slide} />
                            {/* Barra de Progresso também no mobile */}
                            <span
                                class={`not-sr-only relative flex items-center 
                                        w-full h-px border border-gray-400 rounded-lg 
                                        origin-left-right animated-before my-1
                                        mt-4
                                `}
                                style={{ '--slide-interval': `${SLIDE_INTERVAL}s` }}
                            ></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCarousel;