import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import ListCarousel  from "site/islands/ListCarousel.tsx";

export interface Section {
    content?: {
        title?: string;
        backgroundColor?: Color;
    };
}
export interface FeaturesDetail {
    content?: {
        image?: ImageWidget;
        icon?: ImageWidget;
        text?: string;
    }[];
}

export interface SliderSetup {
    /**
    * @title Autoplay
    * @description Defines if the carousel should start autoplaying (default: true)
    */
    autoplay?: boolean;
    /**
    * @title Interval
    * @description Time (in seconds) between slide changes (default: 3.5)
    */
    interval?: number;
    /** @description Content alignment */
    layout?: "left" | "right";
}

export interface Props {
    section?: Section[];
    content?: FeaturesDetail[];
    setup?: SliderSetup[];
}

function FeaturesDetail(
    { section, content, setup }: { section: Section, content: FeaturesDetail; setup: SliderSetup },
){
    return (
        <div class="py-24">
            <h1 class="md:text-5xl font-semibold"></h1>
        </div>
    );
}

export default FeaturesDetail;
