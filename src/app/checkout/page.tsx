"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MStripe } from "@/components/ui/m-stripe";
import { formatPrice } from "@/lib/utils";
import {
  shippingRates,
  provinceNames,
  calculateShipping,
  getEstimatedDelivery,
} from "@/data/shipping";
import { SAProvince, PaymentMethod } from "@/types";
import {
  ChevronRight,
  ShoppingBag,
  Truck,
  CreditCard,
  Shield,
  ArrowLeft,
  Check,
} from "lucide-react";

type CheckoutStep = "information" | "shipping" | "payment";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState<SAProvince | "">("");
  const [postalCode, setPostalCode] = useState("");
  const [expressShipping, setExpressShipping] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("payfast");

  const subtotal = getSubtotal();
  const shippingCost =
    province !== ""
      ? calculateShipping(province, subtotal, expressShipping)
      : 0;
  const total = subtotal + shippingCost;

  const provinceOptions = Object.entries(provinceNames).map(([value, label]) => ({
    value,
    label,
  }));

  const steps = [
    { id: "information", label: "Information" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const validateStep = (step: CheckoutStep): boolean => {
    switch (step) {
      case "information":
        return !!(
          email &&
          phone &&
          firstName &&
          lastName &&
          address1 &&
          city &&
          province &&
          postalCode
        );
      case "shipping":
        return true;
      case "payment":
        return !!paymentMethod;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (currentStep === "information" && validateStep("information")) {
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      setCurrentStep("payment");
    }
  };

  const handlePayment = async () => {
    if (!validateStep("payment")) return;

    setIsProcessing(true);

    // Simulate payment processing
    // In production, this would redirect to PayFast or Yoco
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo, just show success
    alert(
      `Payment would be processed via ${paymentMethod === "payfast" ? "PayFast" : "Yoco"}\nTotal: ${formatPrice(total)}`
    );

    clearCart();
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some products before checking out
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <MStripe size="sm" />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold">My</span>
            <span className="text-2xl font-bold text-m-blue">BM</span>
            <span className="text-2xl font-bold">ZA</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => {
                  const stepIndex = steps.findIndex((s) => s.id === currentStep);
                  if (index < stepIndex) {
                    setCurrentStep(step.id as CheckoutStep);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  step.id === currentStep
                    ? "bg-m-blue text-white"
                    : steps.findIndex((s) => s.id === currentStep) >
                      steps.findIndex((s) => s.id === step.id)
                    ? "bg-emerald-500 text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {steps.findIndex((s) => s.id === currentStep) >
                steps.findIndex((s) => s.id === step.id) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              {/* Information Step */}
              {currentStep === "information" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Contact Information</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="072 123 4567"
                    />
                  </div>

                  <h2 className="text-xl font-bold pt-4">Shipping Address</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <Input
                    label="Address Line 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="Street address"
                  />

                  <Input
                    label="Address Line 2 (Optional)"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Apartment, suite, etc."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Select
                      label="Province"
                      placeholder="Select province"
                      options={provinceOptions}
                      value={province}
                      onChange={(e) =>
                        setProvince(e.target.value as SAProvince)
                      }
                    />
                    <Input
                      label="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Link href="/cart">
                      <Button variant="ghost">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Return to Cart
                      </Button>
                    </Link>
                    <Button
                      onClick={handleContinue}
                      disabled={!validateStep("information")}
                    >
                      Continue to Shipping
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Shipping Method</h2>

                  <div className="space-y-3">
                    {/* Standard Shipping */}
                    <label
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        !expressShipping
                          ? "border-m-blue bg-m-blue/5"
                          : "border-border hover:border-m-blue/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={!expressShipping}
                          onChange={() => setExpressShipping(false)}
                          className="w-4 h-4 text-m-blue"
                        />
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">
                            {province &&
                              getEstimatedDelivery(province as SAProvince, false)}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        {province &&
                        subtotal >=
                          shippingRates[province as SAProvince]
                            .freeShippingThreshold
                          ? "FREE"
                          : province
                          ? formatPrice(
                              shippingRates[province as SAProvince].standardRate
                            )
                          : "---"}
                      </span>
                    </label>

                    {/* Express Shipping */}
                    <label
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        expressShipping
                          ? "border-m-blue bg-m-blue/5"
                          : "border-border hover:border-m-blue/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={expressShipping}
                          onChange={() => setExpressShipping(true)}
                          className="w-4 h-4 text-m-blue"
                        />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">
                            {province &&
                              getEstimatedDelivery(province as SAProvince, true)}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        {province
                          ? formatPrice(
                              shippingRates[province as SAProvince].expressRate
                            )
                          : "---"}
                      </span>
                    </label>
                  </div>

                  {province &&
                    subtotal <
                      shippingRates[province as SAProvince]
                        .freeShippingThreshold && (
                      <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-lg">
                        <Truck className="h-4 w-4 inline mr-2" />
                        Spend{" "}
                        {formatPrice(
                          shippingRates[province as SAProvince]
                            .freeShippingThreshold - subtotal
                        )}{" "}
                        more for FREE standard shipping to{" "}
                        {provinceNames[province as SAProvince]}
                      </p>
                    )}

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep("information")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Return to Information
                    </Button>
                    <Button onClick={handleContinue}>
                      Continue to Payment
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Payment Method</h2>

                  <div className="space-y-3">
                    {/* PayFast */}
                    <label
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "payfast"
                          ? "border-m-blue bg-m-blue/5"
                          : "border-border hover:border-m-blue/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "payfast"}
                          onChange={() => setPaymentMethod("payfast")}
                          className="w-4 h-4 text-m-blue"
                        />
                        <div>
                          <p className="font-medium">PayFast</p>
                          <p className="text-sm text-muted-foreground">
                            Credit/Debit Card, EFT, Instant EFT
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                        PayFast
                      </div>
                    </label>

                    {/* Yoco */}
                    <label
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "yoco"
                          ? "border-m-blue bg-m-blue/5"
                          : "border-border hover:border-m-blue/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "yoco"}
                          onChange={() => setPaymentMethod("yoco")}
                          className="w-4 h-4 text-m-blue"
                        />
                        <div>
                          <p className="font-medium">Yoco</p>
                          <p className="text-sm text-muted-foreground">
                            Credit/Debit Card
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                        Yoco
                      </div>
                    </label>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-m-blue" />
                      <span>Your payment information is secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-m-blue" />
                      <span>
                        You will be redirected to{" "}
                        {paymentMethod === "payfast" ? "PayFast" : "Yoco"} to
                        complete your payment
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep("shipping")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Return to Shipping
                    </Button>
                    <Button
                      onClick={handlePayment}
                      isLoading={isProcessing}
                      className="min-w-[200px]"
                    >
                      Pay {formatPrice(total)}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0 relative">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-m-blue text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.product.sku}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shippingCost === 0 && province
                      ? "FREE"
                      : province
                      ? formatPrice(shippingCost)
                      : "Calculated at next step"}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-m-blue">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
