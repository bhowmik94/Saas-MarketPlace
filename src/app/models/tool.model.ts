export interface PricingPlan {
  plan: string;
  price: number;
}

export interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  pricing: PricingPlan[];
  image: string;
  tags: string[];
}