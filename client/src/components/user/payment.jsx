import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  Calendar, 
  User, 
  Shield,
  CheckCircle,
  ArrowLeft,
  Info
} from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    saveCard: false,
    agreeToTerms: false
  });

  const [bookingSummary] = useState({
    room: {
      name: 'Deluxe King Room',
      dates: 'Mar 15 - 17, 2024',
      nights: 2,
      guests: '2 Adults'
    },
    pricing: {
      roomRate: 299,
      nights: 2,
      subtotal: 598,
      taxes: 71.76,
      serviceFee: 25,
      total: 694.76
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').substr(0, 5);
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handleSubmit = () => {
    // Payment processing logic will be implemented later
    console.log('Processing payment:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Room Selection</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Secure payment powered by industry-leading encryption</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {/* Security Badge */}
              <div className="flex items-center space-x-2 mb-6 p-4 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-green-800 text-sm font-medium">
                  Your payment information is secured with 256-bit SSL encryption
                </span>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: CreditCard },
                    { id: 'apple', label: 'Apple Pay', icon: CreditCard }
                  ].map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                        <div className="text-sm font-medium">{method.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  {/* Card Number */}
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="4"
                          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="billingAddress.street"
                        value={formData.billingAddress.street}
                        onChange={handleInputChange}
                        placeholder="Street Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="billingAddress.city"
                          value={formData.billingAddress.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          name="billingAddress.state"
                          value={formData.billingAddress.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="billingAddress.zipCode"
                          value={formData.billingAddress.zipCode}
                          onChange={handleInputChange}
                          placeholder="ZIP Code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <select
                          name="billingAddress.country"
                          value={formData.billingAddress.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Save this card for future bookings (optional)
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{' '}
                        <button className="text-blue-600 hover:underline">Terms and Conditions</button>{' '}
                        and{' '}
                        <button className="text-blue-600 hover:underline">Cancellation Policy</button>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Other Payment Methods */}
              {paymentMethod !== 'card' && (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    {paymentMethod === 'paypal' && 'You will be redirected to PayPal to complete your payment'}
                    {paymentMethod === 'apple' && 'Use Touch ID or Face ID to complete your payment'}
                  </div>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Continue with {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
                  </button>
                </div>
              )}
            </div>

            {/* Complete Payment Button */}
            {paymentMethod === 'card' && (
              <button
                onClick={handleSubmit}
                disabled={!formData.agreeToTerms}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Complete Secure Payment</span>
              </button>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              {/* Room Details */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h4 className="font-medium text-gray-900">{bookingSummary.room.name}</h4>
                <div className="text-sm text-gray-600 mt-1">
                  <div>{bookingSummary.room.dates}</div>
                  <div>{bookingSummary.room.nights} nights • {bookingSummary.room.guests}</div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room rate × {bookingSummary.pricing.nights} nights</span>
                  <span className="text-gray-900">${bookingSummary.pricing.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span className="text-gray-900">${bookingSummary.pricing.taxes.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-gray-900">${bookingSummary.pricing.serviceFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 text-lg">Total</span>
                    <span className="font-semibold text-gray-900 text-xl">${bookingSummary.pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-900">Secure Payment</div>
                    <div className="text-blue-700">Your payment is protected by 256-bit SSL encryption</div>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm">
                  <div className="font-medium text-gray-900 mb-2">Cancellation Policy</div>
                  <div className="text-gray-600">
                    Free cancellation until 24 hours before check-in. After that, the first night is non-refundable.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;