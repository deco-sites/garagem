import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import ModalButton from "site/islands/ModalButton.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
}

export interface CardList {
    icon?: ImageWidget
    text?: string
}

export interface Features {
    title?: string;
    features?: {
        title?: string;
        iconOne?: ImageWidget;
        iconTwo?: ImageWidget;
    }[];
}

type Title = {
    highlight?: string;
    highlightColor?: Color;
    title: string;
};

export interface Cards {
    /** @format rich-text */
    title: string;
    subtitle?: string;
    list: CardList[];
    backgroundColor?: Color;
    cta: CTA;
}

export interface Props {
    /** @format rich-text */
    title?: Title[];
    cards?: Cards[];
    features?: Features[];
}

export default function Tools({
    title = [
        { 
            highlight: "Tenha inúmeras ferramentas em um único CRM,", 
            highlightColor: "#A4A4A4", 
            title: "com o menor preço do mercado"
        }
    ],
    cards = [
        {
            title: "Para Corretores autônomos",
            subtitle: "Grátis",
            backgroundColor: "#EBEFF2",
            list: [
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Gestão de contatos e leads',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Rodízio completo de atendimento',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Imóveis recomendados por perfil do cliente',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Integração com apps',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Gestão de corretores de imóveis',
                },
            ],
            cta: { 
                id: "change-me", 
                href: "/", 
                text: "Começar a usar", 
            },
        },
        {
            title: "Para Corretores autônomos",
            subtitle: "Grátis",
            backgroundColor: "#EBEFF2",
            list: [
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Gestão de contatos e leads',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Rodízio completo de atendimento',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Imóveis recomendados por perfil do cliente',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Integração com apps',
                },
                {
                    icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/02c7f582-af49-4a54-9088-e900d4ef551d/computer.png',
                    text: 'Gestão de corretores de imóveis',
                },
            ],
            cta: { 
                id: "change-me", 
                href: "/", 
                text: "Começar a usar", 
            },
        },
    ],
    features = [
        {
            title: "Titulo",
            features: [
                {
                    title: "Feature1",
                    iconOne: "Descrição da feature 1",
                    iconTwo: "#EBEFF2",
                },
                {
                    title: "Feature2",
                    iconOne: "Descrição da feature 1",
                    iconTwo: "#EBEFF2",
                },
            ],
        },
    ],
}: Props) {
  return (
    <div class="container mx-auto px-4 pt-14 md:py-24 md:px-0">
        {title?.map((item, idx) => (
            <h1 key={idx}
                class="text-3xl md:text-5xl font-semibold text-primary pb-7">
                <span style={{color: item?.highlightColor}}>{item?.highlight}</span>
                {item?.title}
            </h1>
        ))}
        <div class="crads grid grid-cols-1 md:grid-cols-2 gap-6 py-14">
            {cards.map((card, index) => (
                <div key={index} class="card-item flex flex-col justify-between bg-white py-10 px-6 md:px-12 rounded-xl w-full" style={{backgroundColor: card.backgroundColor}}>
                    <div class="card-item-content">
                        <div dangerouslySetInnerHTML={{ __html: card.title }} />
                        <h1 class="text-black text-3xl md:text-6xl pt-2.5 md:pt-5 pb-7">{card.subtitle}</h1>
                        <div class="card-item-list flex flex-col gap-6 mb-6">
                        {card.list.map((item, index) => (
                            <div key={index} class="card-item-list-item gap-4 flex items-center">
                                <img src={item.icon} alt={item.text} width={24} height={24}/>
                                <p class="text-base text-black">{item.text}</p>
                            </div>
                        
                        ))}
                        </div>
                        <ModalButton 
                            text={card.cta.text} 
                            icon={false} key={index} 
                            class="py-3 px-4 rounded-lg w-44 bg-primary 
                            text-white text-sm text-center text-base
                            font-semibold shadow-custom flex items-center 
                            justify-center"
                        />
                    </div>
                </div>
            ))}
        </div>
        <div class="py-14">
            <div class="grid grid-cols-3">
                <div/>
                <div class="p-8 pl-2.5 text-lg bg-[#EBEFF2] text-[#6797CC] font-bold text-center">Corretores autônomos</div>
                <div class="p-8 pl-2.5 text-lg bg-[#E5DECF] text-[#99907B] font-bold text-center">Para Imobiliárias</div>
            </div>
            {
                features.map((feature, index) => (
                    <>
                        <div key={index} class="grid grid-cols-3">
                            <div class="p-2 pl-2.5 text-base md:text-xl text-left text-black font-semibold">{feature.title}</div>
                            <div/>
                            <div/>
                        </div>
                        <>
                            {feature?.features?.map((item, index) => (
                                <div key={index} class="grid grid-cols-3">
                                    <div class="border-b border-slate-300 p-8 pl-2.5 text-base text-left text-black">{item.title}</div>
                                    <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#EBEFF2] text-center flex items-center justify-center">
                                        <img src={item.iconOne} alt={item.title} width={24} height={24}/>
                                    </div>
                                    <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#E5DECF] text-center flex items-center justify-center">
                                        <img src={item.iconTwo} alt={item.title} width={24} height={24}/>
                                    </div>
                                </div>
                            ))}
                        </>
                    </>
                ))
            }
        </div>
    </div>
  );
}
