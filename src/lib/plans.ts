import type { Plan } from '@/types';

type PlansData = {
  monthly: Plan[];
  monthly4: Plan[];
  onetime: Plan[];
};

export const plansData: PlansData = {
  monthly: [
    { carType: "Hatchback", price: 1499, split: { exterior: 2, full: 4 } },
    { carType: "Luxury Cars", price: 2099, split: { exterior: 2, full: 4 } },
    { carType: "SUV", price: 2599, split: { exterior: 2, full: 4 } }
  ],
  monthly4: [
    { carType: "Hatchback", price: 1099, split: { exterior: 2, full: 2 } },
    { carType: "Luxury Cars", price: 1299, split: { exterior: 2, full: 2 } },
    { carType: "SUV", price: 1499, split: { exterior: 2, full: 2 } }
  ],
  onetime: [
    { carType: "Hatchback", basic: 199, premium: 399 },
    { carType: "Luxury Cars", basic: 299, premium: 499 },
    { carType: "SUV", basic: 399, premium: 599 }
  ]
};
