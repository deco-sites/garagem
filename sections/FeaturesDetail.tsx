import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import ListCarousel  from "site/islands/ListCarousel.tsx";
export interface Section {
    content?: {
        title?: Title[];
        backgroundColor?: Color;
    };
}

type Title = {
    highlight?: string;
    highlightColor?: Color;
    title: string;
};

export interface FeaturesDetail {
    content?: {
        imageDesktop?: ImageWidget;
        imageMobile?: ImageWidget;
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
    layout?: 'left' | 'right';
}

export interface Props {
    section?: Section[];
    slide?: FeaturesDetail[];
    setup?: SliderSetup[];
}

function FeaturesDetail(
    { section, setup, slide }: { section: Section, slide: FeaturesDetail, setup: SliderSetup},
){
    const { title, backgroundColor } = section.content ?? {};
    const { content } = slide;

    
    return (
        <div class="py-24" style={`background-color: ${backgroundColor}`}>
            <div className="container px-4 lg:px-0 flex flex-col">
                {title?.map((item, idx) => (
                    <h1 key={idx}
                        class="text-3xl md:text-5xl font-semibold text-primary pb-7">
                        <span style={{color: item?.highlightColor}}>{item?.highlight}</span>
                        {item?.title}
                    </h1>
                ))}
                <div className="py-14">
                    <ListCarousel
                        data={content}
                        layout={setup.layout}
                        interval={setup.interval}
                        automatic={setup.autoplay}
                    />
                </div>
            </div>
        </div>
    );
}

export default FeaturesDetail;
