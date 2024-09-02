export interface CTA {
  id?: string;
  href: string;
  text: string;
}

export interface CardList {
  icon?: string
  text?: string
}

export interface Cards {
  title: string;
  /** @format rich-text */
  subtitle?: string;
  list?: CardList[];
  backgroundColor: string;
  cta?: CTA;
}

export interface Props {
  title?: string;
  description?: string;
  cards?: Cards[];
}

export default function Tools({
  title = "Tenha inúmeras ferramentas em um único CRM, com o menor preço do mercado",
  description = "",
  cards = [
        {
        title: "Para Corretores autônomos",
        subtitle: "Grátis",
        backgroundColor: "#EBEFF2",
        list: [
            {
                icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/849aa949-2912-45a6-9252-05417dd7a24f/computer.svg',
                text: 'Gestão de contatos e leads',
            },
            {
                icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/849aa949-2912-45a6-9252-05417dd7a24f/computer.svg',
                text: 'Rodízio completo de atendimento',
            },
            {
                icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/849aa949-2912-45a6-9252-05417dd7a24f/computer.svg',
                text: 'Imóveis recomendados por perfil do cliente',
            },
            {
                icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/849aa949-2912-45a6-9252-05417dd7a24f/computer.svg',
                text: 'Integração com apps',
            },
            {
                icon: 'https://deco-sites-assets.s3.sa-east-1.amazonaws.com/garagem/849aa949-2912-45a6-9252-05417dd7a24f/computer.svg',
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
    <div class="container mx-auto px-4 md:px-0">
        <h2 class="text-center text-4xl font-bold text-black mb-10">{title}</h2>
        <div class="crads grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card">

            </div>
        </div>
    </div>
  );
}
