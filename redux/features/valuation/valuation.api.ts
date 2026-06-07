import { baseApi } from "@/redux/base/baseAPI";

// Types for valuation data
interface ValuationItem {
  id: string;
  city: string;
  address?: string;
  // add other fields as needed
}

interface ValuationResponse {
  data: ValuationItem[];
}

export const valuationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listValuations: builder.query<ValuationResponse, void>({
      query: () => ({
        url: "/valuation/reports",
        method: "GET",
      }),
      providesTags: ["Valuation"],
    }),
    valuationById: builder.query<any, number>({
      query: (id: number) => ({
        url: `/valuation/report/${id}`,
        method: "GET",
      }),
      providesTags: ["Valuation"],
    }),
    createValuation: builder.mutation<any, any>({
      query: (body) => ({
        url: "/valuation/search",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Valuation"],
    }),
    generatePdf: builder.mutation<any, number>({
      query: (id: number) => ({
        url: `/valuation/report/${id}/pdf`,
        method: "GET",
        responseHandler: async (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useListValuationsQuery,
  useCreateValuationMutation,
  useValuationByIdQuery,
  useGeneratePdfMutation,
} = valuationApi;
