module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "basetokensgreen-50": "var(--basetokensgreen-50)",
        "basetokenswhite-100": "var(--basetokenswhite-100)",
        extensionsbackgroundsurface: "var(--extensionsbackgroundsurface)",
        extensionsbackgroundwarning: "var(--extensionsbackgroundwarning)",
        "extensionstext-and-icononbrand":
          "var(--extensionstext-and-icononbrand)",
        informationmediumbrandmedium: "var(--informationmediumbrandmedium)",
        informationmediumwhalemedium: "var(--informationmediumwhalemedium)",
        lightbackgroundsurface: "var(--lightbackgroundsurface)",
        lighticonprimary: "var(--lighticonprimary)",
        "text-and-iconaccent": "var(--text-and-iconaccent)",
        "text-and-icononcolor": "var(--text-and-icononcolor)",
        "text-and-iconprimary": "var(--text-and-iconprimary)",
        "text-and-iconsecondary": "var(--text-and-iconsecondary)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "header-24-bold": "var(--header-24-bold-font-family)",
        "ios-typography-caption-14-regular":
          "var(--ios-typography-caption-14-regular-font-family)",
        "text-10-medium": "var(--text-10-medium-font-family)",
        "text-12-medium": "var(--text-12-medium-font-family)",
        "text-14-bold": "var(--text-14-bold-font-family)",
        "text-14-medium": "var(--text-14-medium-font-family)",
        "text-16-bold": "var(--text-16-bold-font-family)",
        "text-16-medium": "var(--text-16-medium-font-family)",
        "text-16-regular": "var(--text-16-regular-font-family)",
        "text-18-medium": "var(--text-18-medium-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: { s: "var(--s)" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
