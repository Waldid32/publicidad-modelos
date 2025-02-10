import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals', // Reglas de Next.js
    'next/typescript', // Soporte para TypeScript
  ),
  {
    plugins: ['tailwindcss'], // Incluye el plugin de Tailwind CSS
    rules: {
      'tailwindcss/classnames-order': 'warn', // Ordena las clases de Tailwind automáticamente
      'tailwindcss/no-custom-classname': 'off', // Desactiva errores por clases personalizadas
      'indent': ['error', 2], // Indentación de 2 espacios
      'quotes': ['error', 'single'], // Comillas simples
      'semi': ['error', 'always'], // Punto y coma obligatorio
      'react/react-in-jsx-scope': 'off', // No requerido en Next.js
      '@typescript-eslint/no-unused-vars': ['warn'], // Variables no usadas como advertencia
      'max-len': ['error', { 'code': 80 }], // Máximo 80 caracteres por línea
      'object-curly-spacing': ['error', 'always'], // Espacios dentro de objetos
      'comma-dangle': ['error', 'always-multiline'], // Comas en objetos multilínea
    },
  },
];

export default eslintConfig;
