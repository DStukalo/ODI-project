export function isValidName(value: string): boolean {
	return (
		value.length > 2 && value.length < 10
	);
}

export function isValidPassword(value: string): boolean {
	return value.length > 5;
}
