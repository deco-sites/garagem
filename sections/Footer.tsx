import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Social {
  icon: ImageWidget;
  href: string;
  label?: string;
}

export interface Props {
  logo?: {
    src?: ImageWidget;
    alt?: string;
  };
  social?: Social[];
}

export default function Footer({
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/12265/fe9fe465-9134-4022-bd52-0b990cf02eab",
    alt: "Logo",
  },
  social = [
	{
	  icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/12265/3ee8e84c-ec9d-4c71-8239-0591697c4687",
	  href: "https://facebook.com",
	  label: "Facebook",
	},
	{
	  icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/12265/a4c12e94-1ea2-4b2c-9f94-59b30d6c3ed6",
	  href: "https://instagram.com",
	  label: "Instagram",
	},
	{
	  icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/12265/c8c41eaf-62bb-404e-8657-b48a7a8fbe31",
	  href: "https://linkedin.com",
	  label: "Linkedin",
	},
  ],
}: Props) {
  return (
    <div className="bg-primary">
      <div className="container grid gap-6 md:gap-0 md:grid-cols-2 py-10 px-4 md:px-0">
        <div className="flex flex-col">
          <figure>
				<Image
					src={logo.src ?? ""}
					alt={logo.alt}
					width={180}
					height={35}
					class="object-contain"
				/>
            <figcaption className="text-white text-xs pt-1.5">A única ferramenta que o corretor precisa</figcaption>
          </figure>
        </div>
        <div className="flex flex-col gap-3">
          <ul class="flex gap-1.5">
            {social?.map((item, idx) => (
				<li key={idx}>
					<a href={item.href} target="_blank" rel="noreferrer">
						<Image src={item.icon} alt={item.label} width={20} height={20} class="object-contain" />
					</a>
				</li>
			))}
          </ul>
		  <p class="font-medium text-xs text-white">© 2024 Garagem - CNPJ 29.212.794/0001-39</p>
        </div>
      </div>
    </div>
  );
}
