import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        phone: '0 28px 80px rgba(15, 23, 42, 0.22)',
      },
      backgroundImage: {
        'hk-radial': 'radial-gradient(circle at top left, rgba(45,212,191,.28), transparent 30%), radial-gradient(circle at bottom right, rgba(59,130,246,.22), transparent 30%)',
      },
    },
  },
  plugins: [],
};
export default config;
