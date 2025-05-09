export function TypographyH1({ text }: { text: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  );
}

export function TypographyH2({ text }: { text: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  );
}

export function TypographyH3({ text }: { text: string }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text}
    </h3>
  );
}

export function TypographyH4({ text }: { text: string }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h4>
  );
}

export function TypographyP({ text }: { text: string }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>;
}

export function TypographySmall({ text }: { text: string }) {
  return <small className="text-sm font-medium leading-none">{text}</small>;
}

export function TypographyMuted({ text }: { text: string }) {
  return <p className="text-sm text-muted-foreground">{text}</p>;
}

export function TypographyBlockquote({ text }: { text: string }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">"{text}"</blockquote>
  );
}
