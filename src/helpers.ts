export function money(val: string | number): string {
    return Number(val).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
