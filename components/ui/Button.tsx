interface Props {
    href: string;
    text: string;
}

function Button(
  { href, text, ...otherProps }: Props,
) {
  return (
    <a
        {...otherProps}
        href={href}
        className={`py-2.5 px-4 rounded-lg text-primary 
            bg-base text-primary text-sm
            font-semibold shadow-custom`}
    >
      {text}
    </a>
  );
}

export default Button;
