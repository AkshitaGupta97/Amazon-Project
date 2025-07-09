
export function formatCurrency(priceCents) {
  return (d(priceCents) /100 ).toFixed(2);
}   

export default formatCurrency; // Exporting the function as default so it can be imported without curly braces