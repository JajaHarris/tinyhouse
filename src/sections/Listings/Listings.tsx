import React from 'react';
import { server, Body } from '../../lib/api';
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
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: LISTINGS_QUERY,
    });
    console.log(data.listings);
  };

  const deleteListing = async () => {
    const deleteBody: Body<DeleteListingVariables> = {
      query: DELETE_LISTING_QUERY,
      variables: {
        id: '5ec81b982bca25a266a96a8a',
      },      
    };

    const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>(deleteBody);
    console.log(data);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <button onClick={fetchListings}>Query Listings!</button>
      </div>

      <div>
        <button onClick={deleteListing}>Delete Listings!</button>
      </div>
    </div>
  );
};
