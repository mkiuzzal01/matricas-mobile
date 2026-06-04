import { baseApi } from "@/redux/base/baseAPI";

/** Subscription endpoint response shape */
export interface SubscriptionResponse {
  data: {
    plan?: {
      name?: string;
      type?: string;
      features?: string[];
    };
    end_date?: string;
    status?: string;
  };
}

/** Pricing plans endpoint response shape */
export interface Plan {
  id: number;
  name: string;
  price: number;
  currency: string;
  duration?: number;
  duration_type?: string;
  description?: string;
  features?: string[];
  is_highlighted?: boolean;
}

export interface PricingPlansResponse {
  data: {
    subscription_plans: Plan[];
    one_time_plans: Plan[];
  };
}

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    pricingPlans: builder.query<PricingPlansResponse, void>({
      query: () => ({
        url: "/pricing",
        method: "GET",
        providesTags: ["PricingPlans"],
      }),
    }),

    getSubscriptions: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: "/my-subscription",
        method: "GET",
        providesTags: ["my-subscription"],
      }),
    }),

    purchaseSubscription: builder.mutation<void, { plan_id: number }>({
      query: (data) => ({
        url: "/subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["my-subscription", "PricingPlans"],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  usePurchaseSubscriptionMutation,
  usePricingPlansQuery,
} = subscriptionApi;
