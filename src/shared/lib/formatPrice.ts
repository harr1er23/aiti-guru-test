export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-Ru', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}