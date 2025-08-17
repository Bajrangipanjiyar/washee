import type { Plan } from '@/types';

type PlansData = {
  monthly: Plan[];
  monthly4: Plan[];
  onetime: Plan[];
};

export const plansData: PlansData = {
  monthly: [
    { carType: "Hatchback", price: 1499, originalPrice: 1999, split: { exterior: 2, full: 4 } },
    { carType: "Luxury Cars", price: 2099, originalPrice: 2599, split: { exterior: 2, full: 4 } },
    { carType: "SUV", price: 2599, originalPrice: 3099, split: { exterior: 2, full: 4 } }
  ],
  monthly4: [
    { carType: "Hatchback", price: 1099, originalPrice: 1599, split: { exterior: 2, full: 2 } },
    { carType: "Luxury Cars", price: 1299, originalPrice: 1799, split: { exterior: 2, full: 2 } },
    { carType: "SUV", price: 1499, originalPrice: 1999, split: { exterior: 2, full: 2 } }
  ],
  onetime: [
    { carType: "Hatchback", basic: 199, premium: 399, originalBasic: 299, originalPremium: 499 },
    { carType: "Luxury Cars", basic: 299, premium: 499, originalBasic: 499, originalPremium: 699 },
    { carType: "SUV", basic: 399, premium: 599, originalBasic: 599, originalPremium: 799 }
  ]
};
