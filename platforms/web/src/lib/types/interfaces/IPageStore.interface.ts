// @interface Page Store
// - Extracted from svelte's typings
export interface IPageStore {
	url: URL;
	params: Record<string, string>;
	stuff: Record<string, any>;
	status: number;
	error: Error | null;
}
