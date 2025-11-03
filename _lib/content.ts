import { gql } from "graphql-request";
import { client } from "./graphqlClient";

export async function getContentByTag(
  tagSlug: string,
  page: number = 1,
  pageSize: number = 10
) {
  const query = gql`
    query GetContentByTag(
      $tagSlug: String!
      $eventPagination: PaginationArg
      $insightPagination: PaginationArg
    ) {
      # First get the tag to verify it exists and get its ID
      tags(filters: { slug: { eq: $tagSlug } }) {
        name
        slug
      }

      # Get events that have this tag related
      events(
        filters: { tags: { slug: { eq: $tagSlug } } }
        pagination: $eventPagination
      ) {
        title
        description
        slug
        datePublished
        author
        category
        image {
          url
          alternativeText
        }
        tags {
          name
          slug
        }
      }

      insights(
        filters: { tag: { slug: { eq: $tagSlug } } }
        pagination: $insightPagination
      ) {
        title
        content
        slug
        datePublished
        category
        image {
          url
          alternativeText
        }
        tag {
          name
          slug
        }
      }
    }
  `;

  const eventPagination = { page, pageSize };
  const insightPagination = { page, pageSize };

  try {
    const data = await client.request(query, { 
      tagSlug, 
      eventPagination, 
      insightPagination 
    });
    return data; 
  } catch (err) {
    throw err;
  }
}


export async function searchContent(searchTerm: string, page: number = 1, pageSize: number = 6) {
  const query = `
    query SearchContent($eventFilters: EventFiltersInput, $insightFilters: InsightFiltersInput, $eventPagination: PaginationArg, $insightPagination: PaginationArg) {
      events(filters: $eventFilters, pagination: $eventPagination) {
        title
        description
        slug
        datePublished
        author
        category
        image {
          url
          alternativeText
        }
        tags {
          name
          slug
        }
      }
      insights(filters: $insightFilters, pagination: $insightPagination) {
        title
        content
        slug
        datePublished
        category
        image {
          url
          alternativeText
        }
        tag {
          name
          slug
        }
      }
    }
  `;

  const eventFilters = {
    or: [
      { title: { containsi: searchTerm } },
      { description: { containsi: searchTerm } },
      { author: { containsi: searchTerm } }
    ]
  };

  const insightFilters = {
    or: [
      { title: { containsi: searchTerm } },
      { content: { containsi: searchTerm } }
    ]
  };

  const eventPagination = { page, pageSize };
  const insightPagination = { page, pageSize };

  try {
    const data = await client.request(query, { eventFilters, insightFilters, eventPagination, insightPagination });
    return data;
  } catch (err) {
    console.error("Error fetching content by search:", err);
    throw err;
  }
}