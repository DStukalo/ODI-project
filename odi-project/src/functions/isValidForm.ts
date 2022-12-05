export function isValidName(value: string): boolean {
	return (
		value.length > 2 && value.length < 40 && /^[a-zA-Zа-яА-Я]+$/.test(value)
	);
}

export function isValidPassword(value: string): boolean {
	return value.length > 5 && /(?=.*[0-9]){6,20}/.test(value);
}
