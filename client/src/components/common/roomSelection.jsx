import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Wifi, 
  Car, 
  Coffee, 
  Tv, 
  Bath, 
  Wind,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

const RoomSelectionPage = () => {
  const [checkIn, setCheckIn] = useState('2024-03-15');
  const [checkOut, setCheckOut] = useState('2024-03-17');
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  const roomTypes = [
    {
      id: 1,
      name: 'Deluxe King Room',
      description: 'Spacious room with city view and premium amenities',
      price: 299,
      originalPrice: 349,
      capacity: 2,
      size: '35 sqm',
      bedType: 'King Bed',
      images: ['/api/placeholder/400/250'],
      amenities: ['Free WiFi', 'AC', 'TV', 'Coffee Maker', 'Room Service', 'Safe'],
      features: [
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' },
        { icon: Car, label: 'Parking' }
      ],
      rating: 4.8,
      reviews: 124,
      available: 5
    },
    {
      id: 2,
      name: 'Executive Suite',
      description: 'Luxury suite with separate living area and panoramic views',
      price: 599,
      originalPrice: 699,
      capacity: 4,
      size: '75 sqm',
      bedType: 'King + Sofa Bed',
      images: ['/api/placeholder/400/250'],
      amenities: ['Free WiFi', 'AC', 'TV', 'Minibar', 'Room Service', 'Butler Service'],
      features: [
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Minibar' },
        { icon: Bath, label: 'Jacuzzi' },
        { icon: Car, label: 'Valet Parking' }
      ],
      rating: 4.9,
      reviews: 89,
      available: 2
    },
    {
      id: 3,
      name: 'Standard Double Room',
      description: 'Comfortable room with modern amenities and garden view',
      price: 199,
      originalPrice: 229,
      capacity: 2,
      size: '28 sqm',
      bedType: 'Double Bed',
      images: ['/api/placeholder/400/250'],
      amenities: ['Free WiFi', 'AC', 'TV', 'Coffee Maker', 'Room Service'],
      features: [
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Tv, label: 'TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ],
      rating: 4.6,
      reviews: 203,
      available: 8
    }
  ];

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const filteredRooms = roomTypes.filter(room => {
    if (priceFilter === 'budget') return room.price < 250;
    if (priceFilter === 'mid') return room.price >= 250 && room.price < 500;
    if (priceFilter === 'luxury') return room.price >= 500;
    return true;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'size') return parseInt(b.size) - parseInt(a.size);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex flex-1 gap-4 items-center">
              {/* Check-in */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    value={`₹{guests.adults}-₹{guests.children}`}
                    onChange={(e) => {
                      const [adults, children] = e.target.value.split('-').map(Number);
                      setGuests({ adults, children });
                    }}
                  >
                    <option value="1-0">1 Adult</option>
                    <option value="2-0">2 Adults</option>
                    <option value="2-1">2 Adults, 1 Child</option>
                    <option value="2-2">2 Adults, 2 Children</option>
                    <option value="3-0">3 Adults</option>
                    <option value="4-0">4 Adults</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Update Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'budget', label: 'Under ₹250' },
                    { value: 'mid', label: '₹250 - ₹500' },
                    { value: 'luxury', label: '₹500+' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceFilter"
                        value={option.value}
                        checked={priceFilter === option.value}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Highest Rated</option>
                  <option value="size">Room Size</option>
                </select>
              </div>
            </div>
          </div>

          {/* Room Results */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Rooms</h2>
              <p className="text-gray-600">
                {calculateNights()} nights • {guests.adults + guests.children} guests • {sortedRooms.length} rooms available
              </p>
            </div>

            <div className="space-y-6">
              {sortedRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Room Image */}
                    <div className="lg:w-80 h-64 lg:h-auto relative">
                      <img 
                        src={room.images[0]} 
                        alt={room.name}
                        className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-t-none"
                      />
                      <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-lg text-xs font-semibold text-green-600">
                        {room.available} left
                      </div>
                    </div>

                    {/* Room Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{room.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{room.size}</span>
                            <span>•</span>
                            <span>{room.bedType}</span>
                            <span>•</span>
                            <span>Max {room.capacity} guests</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{room.rating}</span>
                            <span className="text-gray-500 text-sm">({room.reviews})</span>
                          </div>
                          {room.originalPrice > room.price && (
                            <div className="text-gray-500 line-through text-sm">₹{room.originalPrice}</div>
                          )}
                          <div className="text-2xl font-bold text-gray-900">₹{room.price}</div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        {room.features.map((feature, index) => {
                          const IconComponent = feature.icon;
                          return (
                            <div key={index} className="flex items-center space-x-2 text-gray-600">
                              <IconComponent className="w-4 h-4" />
                              <span className="text-sm">{feature.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-between items-center">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                          View Details
                        </button>
                        <button
                          onClick={() => setSelectedRoom(room)}
                          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSelectionPage;