import IconArrowDown from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/arrow-down.tsx"
interface Props {
    href: string;
    text: string;
    icon: boolean;
    class?: string;
}

function Link(
  { href, text, icon, ...otherProps }: Props,
) {
  return (
    <a
        {...otherProps}
        href={href}
        class={`py-2.5 px-4 rounded-lg text-primary 
            bg-white text-primary text-sm
            font-semibold shadow-custom flex items-center justify-between`}
    >
      {icon && <IconArrowDown />} {text}
    </a>
  );
}

export default Link;
