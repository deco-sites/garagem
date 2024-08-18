import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  mode: "jit",
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
        progress: 'progress infinite 4s linear',
      },
      boxShadow: {
        custom: "0 6px 12px 0px rgba(0,0,0,0.3)",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        progress: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%) scaleX(1)' },
        },
      },
      transformOrigin: {
        'left-right': '0% 100%',
      }
    },
  },
};
