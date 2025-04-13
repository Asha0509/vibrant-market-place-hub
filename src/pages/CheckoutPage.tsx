
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronsRight,
} from 'lucide-react';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form states
  const [formStep, setFormStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Shipping information
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  // Payment information
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const validateShippingInfo = () => {
    const { fullName, email, address, city, state, zipCode } = shippingInfo;
    if (!fullName || !email || !address || !city || !state || !zipCode) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };
  
  const validatePaymentInfo = () => {
    if (paymentMethod === 'credit_card') {
      const { cardNumber, cardHolder, expiryDate, cvv } = paymentInfo;
      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        toast.error('Please fill in all payment details');
        return false;
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid 16-digit card number');
        return false;
      }
      if (cvv.length !== 3) {
        toast.error('Please enter a valid 3-digit CVV');
        return false;
      }
    }
    return true;
  };
  
  const handleContinueToPayment = () => {
    if (validateShippingInfo()) {
      setFormStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = () => {
    if (!validatePaymentInfo()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing payment
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/thank-you');
    }, 2000);
  };
  
  const shippingCost = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  return (
    <Layout>
      <div className="marketplace-container py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              formStep >= 1 ? 'bg-marketplace-purple text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div
                className="h-full bg-marketplace-purple transition-all duration-300"
                style={{ width: formStep >= 2 ? '100%' : '0%' }}
              ></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              formStep >= 2 ? 'bg-marketplace-purple text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">Shipping</span>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {formStep === 1 ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Full Name*</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingInfoChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleShippingInfoChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address*</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        placeholder="123 Main St"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City*</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        placeholder="New York"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State/Province*</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingInfoChange}
                        placeholder="NY"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code*</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingInfoChange}
                        placeholder="10001"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country*</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingInfoChange}
                        placeholder="United States"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      onClick={handleContinueToPayment}
                      className="w-full bg-marketplace-purple hover:bg-marketplace-purple/90"
                    >
                      Continue to Payment
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mb-6"
                  >
                    <div className="flex items-center space-x-2 border rounded p-3 mb-2">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-blue-500" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit_card' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number*</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardHolder">Cardholder Name*</Label>
                        <Input
                          id="cardHolder"
                          name="cardHolder"
                          value={paymentInfo.cardHolder}
                          onChange={handlePaymentInfoChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date (MM/YY)*</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentInfoChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV*</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentInfoChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => setFormStep(1)}
                      className="text-marketplace-purple hover:underline"
                    >
                      Back to Shipping
                    </button>
                    
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="bg-marketplace-orange hover:bg-marketplace-orange/90"
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                    Your payment information is secured with SSL encryption.
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="max-h-60 overflow-auto mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-2 mb-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Info Cards */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start border-l-4 border-green-500 bg-green-50 p-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <p>Free shipping on orders over $50</p>
                </div>
                
                <div className="flex items-start border-l-4 border-blue-500 bg-blue-50 p-3">
                  <ShieldCheck className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                  <p>Secure checkout and 30-day easy returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
