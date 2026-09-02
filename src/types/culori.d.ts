declare module "culori" {
  interface Color {
    mode: string;
    [key: string]: unknown;
  }

  interface OklchColor extends Color {
    mode: "oklch";
    l?: number;
    c?: number;
    h?: number;
    alpha?: number;
  }

  function parse(color: string): Color | undefined;
  function formatHex(color: Color | { mode: string; l?: number; c?: number; h?: number }): string | undefined;
  function converter(mode: string): (color: Color) => OklchColor | undefined;
}
