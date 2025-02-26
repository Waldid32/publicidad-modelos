import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: { tailwindcss },
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      quotes: ['error', 'single'], // Comillas simples
      semi: ['error', 'always'], // Punto y coma obligatorio
      'react/react-in-jsx-scope': 'off', // No requerido en Next.js
      '@typescript-eslint/no-unused-vars': ['warn'], // Variables no usadas como advertencia
      'object-curly-spacing': ['error', 'always'], // Espacios dentro de objetos
    },
  },
];

export default eslintConfig;
