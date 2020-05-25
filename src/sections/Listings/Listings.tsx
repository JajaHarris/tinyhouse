import React from 'react';
import { useQuery, useMutation } from '../../lib/api';
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';

const LISTINGS_QUERY = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING_QUERY = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(
    LISTINGS_QUERY
  );
  
  const [
    deleteListing,
    { loading: loadingForDelete, error: errorForDelete },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(
    DELETE_LISTING_QUERY
  );

  const onDeleteListing = async (id: string) => {
    await deleteListing({id});
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingSection = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => onDeleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Oops...something went wrong - try again later</h2>;
  }

  const deleteProcessingElement = loadingForDelete
    ? <h4>Deletion in progress</h4> : null;

  const deleteErrorElement = errorForDelete
    ? <h4>Uh oh! Something went wrong with deleting - try again later</h4>
    : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingSection}
      {deleteProcessingElement}
      {deleteErrorElement}
    </div>
  );
};
