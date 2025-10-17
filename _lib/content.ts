import { gql } from "graphql-request";
import { client } from "./graphqlClient";

export async function getContentByTag(tag: string) {
  const query = gql`
    query GetContentByTag($tag: String!) {
      events(filters: { tags: { name: { contains: $tag } } }) {
        documentId
        title
        description
        slug
        publishedAt
        image {
          url
          alternativeText
        }
        tags {
          documentId
          name
          slug
        }
      }
      insights(filters: { tag: { name: { contains: $tag } } }) {
        documentId
        title
        contents
        slug
        publishedAt
        category
        image {
          url
          alternativeText
        }
        tag {
          documentId
          name
          slug
        }
      }
    }
  `;

  try {
    const data = await client.request(query, { tag });
    return data;
  } catch (err) {
    console.error("Error fetching content by tag:", err);
  }
}


export async function searchContent(searchTerm: string) {
  const query = gql`
    query SearchContent($search: String!) {
      events(
        filters: {
          or: [
            { title: { containsi: $search } }
            { description: { containsi: $search } }
            { author: { containsi: $search } }
          ]
        }
        pagination: { limit: 50 }
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
        filters: {
          or: [
            { title: { containsi: $search } }
            { contents: { containsi: $search } }
          ]
        }
        pagination: { limit: 50 }
      ) {
        title
        contents
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

  try {
    const data = await client.request(query, { search: searchTerm });
    return data;
  } catch (err) {
    console.error("Error fetching content by search:", err);
    throw err;
  }
}
