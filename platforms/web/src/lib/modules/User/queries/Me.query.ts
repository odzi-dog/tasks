// Importing modules
import gql from 'graphql-tag';
import type { IUserObject } from '$shared/types';

// Exporting query return information
export interface MeQueryResult {
	Me: IUserObject;
}

// Exporting query itself
export const MeQuery = gql`
	{
		Me {
			_id
			email
			username
		}
	}
`;
