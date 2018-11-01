export const setStore = (key, value) => {
	if (!key) return;
	window.localStorage.setItem(key, value)
}

export const getStore = key => {
	return window.localStorage.getItem(key)
}