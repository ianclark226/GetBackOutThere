export const arrPriceRanges = [
    "0-5",
    "1-10",
    "10-20",
    "20-30",
    "30-50"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}