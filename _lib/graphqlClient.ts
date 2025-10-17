import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_URL + "/graphql";

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
  },
});
