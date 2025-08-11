import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Phone,
  Mail,
  Star,
  Calendar,
  MapPin,
  User
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/AppContext';

const GuestsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuests, setSelectedGuests] = useState([]);

  const [guests,setGuests] = useState([]);  
  const {axios}=useAppContext();

  useEffect(()=>{
    fetchAllGuests();
  },[]);

  const fetchAllGuests=async()=>{
    try{
       const {data}=await axios.get("/api/guest/allguests");
       if(data.success){
         setGuests(data.guests);
       }else{
        toast.error(da.message);
       }
    }catch(error){
      toast.error(error.message);
    }
  }

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.phone.includes(searchQuery) ||
    guest.bookingNumbers.some(booking => booking.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectGuest = (guestId) => {
    setSelectedGuests(prev => 
      prev.includes(guestId) 
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };

  const handleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gray-700 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Find a guest</h1>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Search by name, email, phone or booking number"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export all guests</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-orange-600">
            {filteredGuests.length} GUESTS FOUND
          </h2>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Guest</span>
            </button>
            {selectedGuests.length > 0 && (
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Selected ({selectedGuests.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Guests Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-700">Name</div>
              <div className="col-span-2 text-sm font-medium text-gray-700">Email</div>
              <div className="col-span-2 text-sm font-medium text-gray-700">Phone</div>
              <div className="col-span-3 text-sm font-medium text-gray-700">Booking Numbers</div>
              <div className="col-span-1 text-sm font-medium text-gray-700">Status</div>
              <div className="col-span-1 text-sm font-medium text-gray-700">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredGuests.map((guest) => (
              <div key={guest.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedGuests.includes(guest.id)}
                      onChange={() => handleSelectGuest(guest.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Name */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                          {guest.name}
                        </button>
                        <div className="flex items-center space-x-2 mt-1">
                          {/* {guest.vipStatus && (
                            <span className="flex items-center space-x-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3" />
                              <span>VIP</span>
                            </span>
                          )} */}
                          <span className="text-xs text-gray-500 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{guest.nationality}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{guest.email}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Member since {formatDate(guest.joinDate)}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-span-2">
                    {guest.phone !== '-' ? (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{guest.phone}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Last stay: {formatDate(guest.lastStay)}
                    </div>
                  </div>

                  {/* Booking Numbers */}
                  <div className="col-span-3">
                    <div className="space-y-1">
                      {/* {guest.bookingNumbers.slice(0, 1).map((booking, index) => (
                        <div key={index} className="text-blue-600 font-mono text-xs break-all">
                          {booking}
                        </div>
                      ))} */}
                      {guest.totalBookings > 1 && (
                        <button className="text-blue-600 hover:text-blue-700 text-xs transition-colors">
                          (+{guest.totalBookings - 1} more)
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                      <span>{guest.totalBookings} bookings</span>
                      <span>•</span>
                      <span>${guest.totalSpent} total</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <div className="space-y-1">
                      {/* <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        guest.vipStatus 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {guest.vipStatus ? 'VIP Guest' : 'Regular'}
                      </div> */}
                      <div className="text-xs text-gray-500">
                        {guest.roomPreferences.bedType}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex items-center justify-end">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors flex items-center space-x-1">
                        <span>View/Edit Profile</span>
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable Details (Optional) */}
                <div className="mt-3 pt-3 border-t border-gray-100 hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Preferences:</span>
                      <div className="text-gray-600 mt-1">
                        {/* <div>Room: {guest.preferences.roomType}</div> */}
                        <div>Bed: {guest. roomPreferences.bedType}</div>
                        <div>Floor: {guest. roomPreferences.floor}</div>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Stay History:</span>
                      <div className="text-gray-600 mt-1">
                        <div>{guest.totalBookings} total stays</div>
                        <div>Last visit: {formatDate(guest.lastStay)}</div>
                        <div>Total spent: ${guest.totalSpent}</div>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Contact Info:</span>
                      <div className="text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{guest.email}</span>
                        </div>
                        {guest.phone !== '-' && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Phone className="w-3 h-3" />
                            <span>{guest.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredGuests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No guests found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? `No guests match your search for "${searchQuery}"`
                : "No guests in the system yet"
              }
            </p>
            <div className="space-y-3">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Clear search
                </button>
              )}
              <div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add New Guest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {filteredGuests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {filteredGuests.length}
              </div>
              <div className="text-gray-600 text-sm">Total Guests</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredGuests.filter(g => g.vipStatus).length}
              </div>
              <div className="text-gray-600 text-sm">VIP Members</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(filteredGuests.reduce((sum, g) => sum + g.totalBookings, 0) / filteredGuests.length)}
              </div>
              <div className="text-gray-600 text-sm">Avg. Bookings</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                ${Math.round(filteredGuests.reduce((sum, g) => sum + g.totalSpent, 0) / filteredGuests.length)}
              </div>
              <div className="text-gray-600 text-sm">Avg. Spend</div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredGuests.length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-500">
              Showing 1-{filteredGuests.length} of {guests.length} guests
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestsPage;