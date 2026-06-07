import { baseApi } from "@/redux/base/baseAPI";

export const dynamicApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPage: build.query({
      query: (id: number) => `page/${id}`,
    }),
  }),
});

export const { useGetPageQuery } = dynamicApi;
