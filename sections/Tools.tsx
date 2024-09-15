import type { ImageWidget, Color } from "apps/admin/widgets.ts";
import Button from "site/components/ui/Button.tsx";
import Modal from "site/components/ui/Modal.tsx";
import Signup from "site/components/ui/Signup.tsx";
export interface CTA {
  id?: string;
  href: string;
  text: string;
}

export interface CardList {
    icon?: ImageWidget
    text?: string
}

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
    title?: string;
    cards?: Cards[];
}

export default function Tools({
    title = "Tenha inúmeras ferramentas em um único CRM, com o menor preço do mercado",
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
}: Props) {
  return (
    <div class="container mx-auto px-4 pt-14 md:py-24 md:px-0">
        <div class="leading-tight font-semibold text-3xl " dangerouslySetInnerHTML={{ __html: title }} />
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
                        <button class="py-2.5 px-4 rounded-lg text-primary w-full md:w-44 bg-primary text-white text-sm text-center font-semibold shadow-custom ">
                            {card.cta.text}
                        </button>
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
            <div class="grid grid-cols-3">
                <div class="p-2 pl-2.5 text-base md:text-xl text-left text-black font-semibold">Titulo</div>
                <div/>
                <div/>
            </div>
            <div class="grid grid-cols-3">
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base text-left text-black">Feature1</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#EBEFF2] text-center">Corretores autônomos</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#E5DECF] text-center">Para Imobiliárias</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base text-left text-black">Feature1</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#EBEFF2] text-center">Corretores autônomos</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#E5DECF] text-center">Para Imobiliárias</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base text-left text-black">Feature1</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#EBEFF2] text-center">Corretores autônomos</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#E5DECF] text-center">Para Imobiliárias</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base text-left text-black">Feature1</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#EBEFF2] text-center">Corretores autônomos</div>
                <div class="border-b border-slate-300 p-8 pl-2.5 text-base bg-[#E5DECF] text-center">Para Imobiliárias</div>
            </div>
        </div>
        <Signup />
    </div>
  );
}
