export const formatCurrency = (amount: number | null) => {
    const value = amount || 0;
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export function formatQuantity(quantity: number, noun: string): string {
    return quantity === 1 ? `${quantity} ${noun}` : `${quantity} ${noun}s`;
}

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

export function formatDateFromISOString(date: Date): string {
    const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formattedDate;
}

export function formatDateToDateTime(date: Date): string {
    return date.toISOString();
}