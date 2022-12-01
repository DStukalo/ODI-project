class LocalStorageService {
	private value: string;

	constructor() {
		this.value = '';
	}

	getValue(key: string, defaultValue?: string) {
		try {
			this.value = JSON.parse(
				localStorage.getItem(key) || String(defaultValue),
			);
		} catch (error) {
			if (defaultValue) this.value = defaultValue;
		}
		return this.value;
	}

	setValue(key: string, value: string) {
		localStorage.setItem(key, JSON.stringify(value));
		this.value = value;
	}

	deleteValue(key: string) {
		try {
			localStorage.removeItem(key);
			this.value = 'success';
		} catch (error) {
			this.value = 'error';
		}
		return this.value;
	}

}
const localStorageService = new LocalStorageService();

export default localStorageService;
