// Importing types
import type { ErrorType } from '../enums';

// @interface Error
// - Contains basic information
// about occured error
export interface IError {
	type: ErrorType;
	message?: string;

	// Settings
	isAuthorizationRequired?: boolean;
	doFireToast?: boolean;
}
