/**
 * Masks a password, showing only a hint of the original characters.
 * @param password The original password string.
 * @param visibleCount Number of characters to show as a hint (default: 2).
 * @param showAtEnd If true, shows the hint at the end; otherwise, at the start.
 * @returns Masked password string.
 */
export function maskPassword(password: string): string {
	if (!password) return ''
	const visibleCount = 3
	if (password.length <= visibleCount) return '*'.repeat(password.length)
	const masked = '*'.repeat(password.length - visibleCount)
	return password.slice(0, visibleCount) + masked
}
