module.exports = {
  printWidth: 120,
  trailingComma: 'es5',
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  importOrder: [
    '^(next/(.*)$)|^(next$)', // Imports by "next"
    '<THIRD_PARTY_MODULES>',
    '^@/components/(.*)$',
    '^@/services/(.*)$',
    '^@/utils/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
