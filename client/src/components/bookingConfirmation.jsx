import React, { useState } from 'react';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Users, 
  Bed, 
  MapPin,
  Phone,
  Mail,
  Download,
  Share2,
  Edit,
  CreditCard,
  Wifi,
  Car,
  Coffee
} from 'lucide-react';

const BookingConfirmationPage = () => {
  const [bookingDetails] = useState({
    confirmationNumber: 'HM-2024-001234',
    status: 'Confirmed',
    bookingDate: '2024-03-10',
    guest: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567'
    },
    stay: {
      checkIn: '2024-03-15',
      checkOut: '2024-03-17',
      nights: 2,
      adults: 2,
      children: 0
    },
    room: {
      name: 'Deluxe King Room',
      number: '1205',
      type: 'King Bed',
      size: '35 sqm',
      image: '/api/placeholder/300/200',
      amenities: ['Free WiFi', 'Air Conditioning', 'Smart TV', 'Coffee Maker', 'Private Bath', 'Parking']
    },
    pricing: {
      roomRate: 299,
      nights: 2,
      subtotal: 598,
      taxes: 71.76,
      fees: 25,
      total: 694.76
    },
    payment: {
      method: 'Credit Card',
      cardLast4: '4567',
      paidAmount: 694.76,
      status: 'Paid'
    },
    hotel: {
      name: 'Grand Plaza Hotel',
      address: '123 Main Street, Downtown, NY 10001',
      phone: '+1 (555) 987-6543',
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM'
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your reservation has been successfully confirmed. A confirmation email has been sent to{' '}
            <span className="font-medium">{bookingDetails.guest.email}</span>
          </p>
        </div>

        {/* Confirmation Number */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">Confirmation Number</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">{bookingDetails.confirmationNumber}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share Booking</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stay Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Stay Details</h3>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Modify</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Check-in</div>
                      <div className="text-gray-600">{formatDate(bookingDetails.stay.checkIn)}</div>
                      <div className="text-sm text-gray-500">After {bookingDetails.hotel.checkInTime}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Guests</div>
                      <div className="text-gray-600">
                        {bookingDetails.stay.adults} Adults
                        {bookingDetails.stay.children > 0 && `, ${bookingDetails.stay.children} Children`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Check-out</div>
                      <div className="text-gray-600">{formatDate(bookingDetails.stay.checkOut)}</div>
                      <div className="text-sm text-gray-500">Before {bookingDetails.hotel.checkOutTime}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Duration</div>
                      <div className="text-gray-600">{bookingDetails.stay.nights} nights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Room Details</h3>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="sm:w-48 h-32 rounded-lg overflow-hidden">
                  <img 
                    src={bookingDetails.room.image} 
                    alt={bookingDetails.room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{bookingDetails.room.name}</h4>
                      <p className="text-gray-600">Room {bookingDetails.room.number}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">${bookingDetails.pricing.roomRate}</div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4" />
                      <span>{bookingDetails.room.type}</span>
                    </div>
                    <span>•</span>
                    <span>{bookingDetails.room.size}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {bookingDetails.room.amenities.slice(0, 3).map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {amenity === 'Free WiFi' && <Wifi className="w-3 h-3" />}
                        {amenity === 'Parking' && <Car className="w-3 h-3" />}
                        {amenity === 'Coffee Maker' && <Coffee className="w-3 h-3" />}
                        <span>{amenity}</span>
                      </div>
                    ))}
                    {bookingDetails.room.amenities.length > 3 && (
                      <span className="text-sm text-blue-600 cursor-pointer">+{bookingDetails.room.amenities.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Guest Information</h3>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="font-medium text-gray-900 mb-1">Primary Guest</div>
                  <div className="text-gray-600">{bookingDetails.guest.firstName} {bookingDetails.guest.lastName}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">Email</div>
                  <div className="text-gray-600 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{bookingDetails.guest.email}</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">Phone</div>
                  <div className="text-gray-600 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{bookingDetails.guest.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Information</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-gray-900">{bookingDetails.hotel.name}</div>
                  <div className="text-gray-600 flex items-start space-x-2 mt-1">
                    <MapPin className="w-4 h-4 mt-1" />
                    <span>{bookingDetails.hotel.address}</span>
                  </div>
                </div>
                <div className="text-gray-600 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{bookingDetails.hotel.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Payment Summary */}
          <div className="space-y-6">
            {/* Pricing Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room rate × {bookingDetails.pricing.nights} nights</span>
                  <span className="text-gray-900">${bookingDetails.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span className="text-gray-900">${bookingDetails.pricing.taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-gray-900">${bookingDetails.pricing.fees.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900 text-lg">${bookingDetails.pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Credit Card</div>
                  <div className="text-gray-600 text-sm">**** **** **** {bookingDetails.payment.cardLast4}</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="text-green-800 text-sm font-medium">Payment Successful</div>
                <div className="text-green-600 text-sm">Amount: ${bookingDetails.payment.paidAmount}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Cancel Booking</div>
                  <div className="text-sm text-gray-600">Free cancellation until 24h before</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Modify Booking</div>
                  <div className="text-sm text-gray-600">Change dates or guest count</div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Contact Hotel</div>
                  <div className="text-sm text-gray-600">Get in touch directly</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;