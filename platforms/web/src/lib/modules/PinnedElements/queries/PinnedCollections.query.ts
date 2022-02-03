// Importing modules
import { gql } from '@apollo/client/core';
import type { ICollectionObject } from '$shared/types';

// Exporting request response
export interface IPinnedCollectionsResult {
	PinnedCollections: Array<
		Pick<ICollectionObject, '_id' | 'icon' | 'title' | 'subtitle' | 'tasks'>
	>;
}

// Exporting query itself
export const PinnedCollectionsQuery = gql`
	{
		PinnedCollections {
			_id
			icon
			title
			subtitle
			tasks {
				_id
			}
		}
	}
`;
