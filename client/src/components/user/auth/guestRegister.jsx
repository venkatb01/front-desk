import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, CreditCard, Bed, Users, Hotel } from 'lucide-react';

const GuestRegisterPage = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    DOB: '',
    nationality: '',
    
    // Address
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    
    // Information/ID
    information: {
      aadharNumber: '',
      idType: '',
      idNumber: ''
    },
    
    // Room Preferences
    roomPreferences: {
      bedType: '',
      smoking: false,
      floorPreference: '',
      view: ''
    },
    
    // References
    references: [{
      name: '',
      contact: '',
      relation: ''
    }],
    
    vipStatus: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = type === 'checkbox' ? checked : value;
        return newData;
      });
    } else if (name.includes('[')) {
      // Handle array notation like references[0].name
      const match = name.match(/(\w+)\[(\d+)\]\.(\w+)/);
      if (match) {
        const [, arrayName, index, prop] = match;
        setFormData(prev => {
          const newData = { ...prev };
          newData[arrayName][index][prop] = value;
          return newData;
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Guest Registration Data:', formData);
    alert('Guest registered successfully! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Hotel className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guest Registration</h1>
          <p className="text-gray-600">Register new guest for hotel management system</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="DOB" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="DOB"
                      name="DOB"
                      type="date"
                      value={formData.DOB}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Nationality */}
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                  </label>
                  <input
                    id="nationality"
                    name="nationality"
                    type="text"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter nationality"
                  />
                </div>

                {/* VIP Status */}
                <div className="flex items-center mt-8">
                  <input
                    id="vipStatus"
                    name="vipStatus"
                    type="checkbox"
                    checked={formData.vipStatus}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="vipStatus" className="ml-2 text-sm font-medium text-gray-700">
                    VIP Status
                  </label>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Address Information
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Street */}
                <div>
                  <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    id="address.street"
                    name="address.street"
                    type="text"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      id="address.city"
                      name="address.city"
                      type="text"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter city"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      id="address.state"
                      name="address.state"
                      type="text"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter state"
                    />
                  </div>

                  {/* ZIP */}
                  <div>
                    <label htmlFor="address.zip" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      id="address.zip"
                      name="address.zip"
                      type="text"
                      value={formData.address.zip}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter ZIP code"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      id="address.country"
                      name="address.country"
                      type="text"
                      value={formData.address.country}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter country"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Identification Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Identification Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Aadhar Number */}
                <div>
                  <label htmlFor="information.aadharNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number
                  </label>
                  <input
                    id="information.aadharNumber"
                    name="information.aadharNumber"
                    type="text"
                    value={formData.information.aadharNumber}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter 12-digit Aadhar number"
                    pattern="[0-9]{12}"
                  />
                </div>

                {/* ID Type */}
                <div>
                  <label htmlFor="information.idType" className="block text-sm font-medium text-gray-700 mb-2">
                    ID Type
                  </label>
                  <select
                    id="information.idType"
                    name="information.idType"
                    value={formData.information.idType}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="driving-license">Driving License</option>
                    <option value="voter-id">Voter ID</option>
                    <option value="pan-card">PAN Card</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* ID Number */}
                <div className="md:col-span-2">
                  <label htmlFor="information.idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    ID Number
                  </label>
                  <input
                    id="information.idNumber"
                    name="information.idNumber"
                    type="text"
                    value={formData.information.idNumber}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter ID number"
                  />
                </div>
              </div>
            </div>

            {/* Room Preferences Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Bed className="w-5 h-5 mr-2 text-blue-600" />
                Room Preferences
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bed Type */}
                <div>
                  <label htmlFor="roomPreferences.bedType" className="block text-sm font-medium text-gray-700 mb-2">
                    Bed Type
                  </label>
                  <select
                    id="roomPreferences.bedType"
                    name="roomPreferences.bedType"
                    value={formData.roomPreferences.bedType}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Bed Type</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="queen">Queen</option>
                    <option value="king">King</option>
                    <option value="twin">Twin</option>
                  </select>
                </div>

                {/* Floor Preference */}
                <div>
                  <label htmlFor="roomPreferences.floorPreference" className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Preference
                  </label>
                  <select
                    id="roomPreferences.floorPreference"
                    name="roomPreferences.floorPreference"
                    value={formData.roomPreferences.floorPreference}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">No Preference</option>
                    <option value="ground">Ground Floor</option>
                    <option value="low">Low Floor (1-3)</option>
                    <option value="mid">Mid Floor (4-7)</option>
                    <option value="high">High Floor (8+)</option>
                  </select>
                </div>

                {/* View Preference */}
                <div>
                  <label htmlFor="roomPreferences.view" className="block text-sm font-medium text-gray-700 mb-2">
                    View Preference
                  </label>
                  <select
                    id="roomPreferences.view"
                    name="roomPreferences.view"
                    value={formData.roomPreferences.view}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">No Preference</option>
                    <option value="city">City View</option>
                    <option value="sea">Sea View</option>
                    <option value="garden">Garden View</option>
                    <option value="mountain">Mountain View</option>
                  </select>
                </div>

                {/* Smoking */}
                <div className="flex items-center mt-8">
                  <input
                    id="roomPreferences.smoking"
                    name="roomPreferences.smoking"
                    type="checkbox"
                    checked={formData.roomPreferences.smoking}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="roomPreferences.smoking" className="ml-2 text-sm font-medium text-gray-700">
                    Smoking Room Preferred
                  </label>
                </div>
              </div>
            </div>

            {/* Emergency Reference Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Emergency Reference
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reference Name */}
                <div>
                  <label htmlFor="references[0].name" className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="references[0].name"
                      name="references[0].name"
                      type="text"
                      value={formData.references[0].name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter reference name"
                    />
                  </div>
                </div>

                {/* Reference Contact */}
                <div>
                  <label htmlFor="references[0].contact" className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Contact
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="references[0].contact"
                      name="references[0].contact"
                      type="tel"
                      value={formData.references[0].contact}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter contact number"
                    />
                  </div>
                </div>

                {/* Relation */}
                <div className="md:col-span-2">
                  <label htmlFor="references[0].relation" className="block text-sm font-medium text-gray-700 mb-2">
                    Relation
                  </label>
                  <input
                    id="references[0].relation"
                    name="references[0].relation"
                    type="text"
                    value={formData.references[0].relation}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Family, Friend, Colleague"
                  />
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Register Guest
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; 2024 Hotel Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default GuestRegisterPage;