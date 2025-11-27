import { SAProvince, ShippingRate } from "@/types";

export const shippingRates: Record<SAProvince, ShippingRate> = {
  gauteng: {
    province: "gauteng",
    standardRate: 85,
    expressRate: 150,
    freeShippingThreshold: 1500,
  },
  "western-cape": {
    province: "western-cape",
    standardRate: 120,
    expressRate: 200,
    freeShippingThreshold: 2000,
  },
  "kwazulu-natal": {
    province: "kwazulu-natal",
    standardRate: 120,
    expressRate: 200,
    freeShippingThreshold: 2000,
  },
  "eastern-cape": {
    province: "eastern-cape",
    standardRate: 140,
    expressRate: 220,
    freeShippingThreshold: 2500,
  },
  "free-state": {
    province: "free-state",
    standardRate: 100,
    expressRate: 180,
    freeShippingThreshold: 1800,
  },
  limpopo: {
    province: "limpopo",
    standardRate: 120,
    expressRate: 200,
    freeShippingThreshold: 2000,
  },
  mpumalanga: {
    province: "mpumalanga",
    standardRate: 100,
    expressRate: 180,
    freeShippingThreshold: 1800,
  },
  "north-west": {
    province: "north-west",
    standardRate: 100,
    expressRate: 180,
    freeShippingThreshold: 1800,
  },
  "northern-cape": {
    province: "northern-cape",
    standardRate: 150,
    expressRate: 250,
    freeShippingThreshold: 2500,
  },
};

export const provinceNames: Record<SAProvince, string> = {
  gauteng: "Gauteng",
  "western-cape": "Western Cape",
  "kwazulu-natal": "KwaZulu-Natal",
  "eastern-cape": "Eastern Cape",
  "free-state": "Free State",
  limpopo: "Limpopo",
  mpumalanga: "Mpumalanga",
  "north-west": "North West",
  "northern-cape": "Northern Cape",
};

export function calculateShipping(
  province: SAProvince,
  subtotal: number,
  express: boolean = false
): number {
  const rates = shippingRates[province];

  // Free shipping if over threshold
  if (subtotal >= rates.freeShippingThreshold && !express) {
    return 0;
  }

  return express ? rates.expressRate : rates.standardRate;
}

export function getEstimatedDelivery(
  province: SAProvince,
  express: boolean = false
): string {
  if (express) {
    return province === "gauteng" ? "1-2 business days" : "2-3 business days";
  }

  return province === "gauteng" ? "2-4 business days" : "4-7 business days";
}
