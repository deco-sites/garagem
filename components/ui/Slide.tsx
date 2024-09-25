import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import ModalButton from "site/islands/ModalButton.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  style?: "Outline" | "Ghost";
}

type Title = {
    highlight?: string;
    highlightColor?: string;
    title: string;
};

export interface Banners {
  backgroundColor?: Color;
  tagline?: ImageWidget;
  title?: Title[];
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

interface Props {
    data: Banners;
    class: string;
    key: number;
    layout?: string;
}

function Slide(
  { data, ...otherProps }: Props,
) {
    const { backgroundColor, tagline, title, image, description, button } = data;
    const { key, layout } = otherProps;

    return (
        <>
            {layout === "HeroBanner" && (
                <div key={key} class={`${otherProps.class} pt-24 pb-20`} style={
                    "background-color: " + backgroundColor
                }>
                    <div class="container w-full">
                        <div class="px-4 lg:px-0 grid gap-7 lg:grid-cols-2">
                            <div class="flex flex-col justify-center order-2 lg:order-1">
                                <figure class="pb-7">
                                    <Image
                                        width={140}
                                        height={27}
                                        class="object-fit z-10"
                                        sizes="(max-width: 180px) 100vw, 30vw"
                                        src={tagline ?? ""}
                                        alt={tagline}
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </figure>
                                {title?.map((item) => (
                                    <h1 class="text-3xl md:text-5xl font-semibold text-white pb-7">
                                        <span style={{color: item?.highlightColor}}>{item?.highlight}</span>
                                        {item?.title}
                                    </h1>
                                ))}
                                <p class="text-white pb-7">{description}</p>
                                <div class="flex space-x-4">
                                    {button?.map((item, idx) => (
                                        <ModalButton text={item.text} icon={false} key={idx}/>
                                    ))}
                                </div>
                            </div>
                            <figure class="flex justify-end order-1 lg:order-2">
                                <Image
                                    width={710}
                                    height={590}
                                    class="object-fit z-10"
                                    sizes="(max-width: 710px) 100vw, 30vw"
                                    src={image ?? ""}
                                    alt={image}
                                    decoding="async"
                                    loading="lazy"
                                />
                            </figure>
                        </div>
                    </div>   
                </div>
            )}
            {layout === "Features" && (
                <div></div>
            )}
        </>
    );
}

export default Slide;