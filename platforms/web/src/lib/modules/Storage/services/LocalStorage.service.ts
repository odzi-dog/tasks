// @service LocalStorage
class Service {
	// @method get
	get(id: string): Object {
		return JSON.parse(localStorage.getItem(id)) ?? {};
	}

	// @method set
	set(id: string, value: Object) {
		localStorage.setItem(id, JSON.stringify(value));
	}
}

export const LocalStorageService = new Service();
