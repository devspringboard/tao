/** @type {import('tailwindcss').Config} */

const { heroui } = require("@heroui/react");

export default {
  content: [
    "./src/**/*.{js,jsx,jsx,ts,tsx,css}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-xs': { max: '400px' },
      },
    },
    colors: {
      "tao-primary-blue": "#072948",
      "tao-primary-red": "#A71010",
      "tao-charcoal-000": "#E2E2E2",
      "tao-charcoal-300": "#848484",
      "tao-charcoal-500": "#5A5A5A",
      "tao-charcoal-900": "#050505",
      "tao-white-100": "#FFEFEF",
      "tao-white": "#FFFFFF",
      "tao-charcoal-100": "#CDCDCD",
      "tao-brand-light": "#F9F9F9",
      "tao-alert-600": "#AF2A2A",
      "tao-alert-300": "##FF6161",
      "tao-alert-200": "#FFCDCD",
      "tao-alert-100": "#FF8A8A",
      "tao-alert": "#FFB8B8",
      "tao-alert-900": "#5A0303",
      "tao-warning-900": "#C38107",
      "tao-warning-500": "#F8DDAC",
      "tao-warning-400": "#F9F2E5",
      "tao-warning-300": "#FEDC7D",
      "tao-warning": "#FFEEC0",
      "tao-success-900": "#034D11",
      "tao-success-300": "#8BDF9B",
      "tao-success": "#D4FFDC",
      "tao-info-900": "#03395A",
      "tao-info-500": "#9FDAE8",
      "tao-info-400": "#E1F1F5",
      "tao-info-300": "#4AC7E3",
      "tao-info": "#BAE7F1",
    },
  },
  plugins: [heroui()],
};
