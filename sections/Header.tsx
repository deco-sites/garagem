import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "site/components/ui/Button.tsx";

export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Nav {
  logo?: {
    src?: ImageWidget;
    alt?: string;
  };
  navigation?: {
    buttons: CTA[];
  };
}

export default function Header({
  logo = {
    src:
      "",
    alt: "Logo",
  },
  navigation = {
    buttons: [
      { id: "change-me-1", href: "/", text: "Change me", outline: false },
    ],
  },
}: Nav) {
  return ( 
    <div className="w-full p-4 absolute top-0 z-50">
      <div className="container flex justify-between items-center">
        <Image src={logo.src ?? ""} alt={logo.alt} width={61} height={61}/>
        <div className="flex space-x-4">
          {navigation.buttons.map((button) => (
            <Button key={button.id} href={button.href} text={button.text} />
          ))}
        </div>
      </div>
    </div>
  );
}
