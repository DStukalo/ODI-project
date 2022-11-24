import { decodeToken } from 'react-jwt';

interface Token {
  id: string;
  login: string;
  iat: string;
  exp: string;
}

export function isValidToken() {
	const token = localStorage.getItem('token') as string;
	if (token) {
		const decodetToken = decodeToken<Token>(token) as Token;
		const exp = Number(decodetToken.exp) * 1000;
		const expDate = new Date(exp);
		if (expDate > new Date()) {
			return {
				isValid: true,
				id: decodetToken.id,
				login: decodetToken.id,
				expirationDate: expDate,
			};
		}
	}
	return {
		isValid: false,
	};
}
