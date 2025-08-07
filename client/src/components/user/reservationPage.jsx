import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Calendar, 
  Users, 
  Bed,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const ReservationsPage = () => {
  const [filters, setFilters] = useState({
    guestLastName: '',
    bookingReference: '',
    invoiceNumber: '',
    dateType: 'CheckIn',
    status: 'All',
    dateFrom: '2024-03-01',
    dateTo: '2024-03-31'
  });

  const [reservations] = useState([
    {
      id: 1,
      status: 'Confirmed',
      name: 'Clark, Oliver',
      reference: 'FC2-b7739071-ca25-4476-aa8d-6dfa1b4c2342-1',
      source: 'Direct booking engine',
      occupants: { adults: 1, children: 0 },
      checkIn: '2024-03-15',
      checkOut: '2024-03-17',
      booked: '2024-03-10',
      eta: '-',
      room: 'Room 1',
      total: 214,
      outstanding: 214,
      invoice: '-'
    },
    {
      id: 2,
      status: 'Confirmed',
      name: 'Smith, Isla',
      reference: 'BDC-0d8e31db-b91f-42b3-8166-150640487b71-1',
      source: 'Expedia',
      occupants: { adults: 1, children: 0 },
      checkIn: '2024-03-16',
      checkOut: '2024-03-18',
      booked: '2024-03-08',
      eta: '-',
      room: 'Room 4',
      total: 264,
      outstanding: 264,
      invoice: '-'
    },
    {
      id: 3,
      status: 'Confirmed',
      name: 'Brown, Olivia',
      reference: 'BDC-e116f807-4055-4e03-a9c8-4903e88ca134',
      source: 'Booking.com',
      occupants: { adults: 1, children: 0 },
      checkIn: '2024-03-20',
      checkOut: '2024-03-22',
      booked: '2024-03-12',
      eta: '-',
      room: '-',
      total: 885,
      outstanding: 885,
      invoice: '-'
    },
    {
      id: 4,
      status: 'Confirmed',
      name: 'Clark, Charlotte',
      reference: 'BDC-5d017fef-80b6-46a2-b540-0319821a5ee0-2',
      source: 'Booking.com',
      occupants: { adults: 1, children: 0 },
      checkIn: '2024-03-25',
      checkOut: '2024-03-27',
      booked: '2024-03-15',
      eta: '-',
      room: 'Room 3',
      total: 144,
      outstanding: 144,
      invoice: '-'
    },
    {
      id: 5,
      status: 'Confirmed',
      name: 'Smithe, Jack',
      reference: 'BDC-8c0eacd5-2185-4b96-8898-e4acaf5616e6-1',
      source: 'Booking.com',
      occupants: { adults: 1, children: 0 },
      checkIn: '2024-04-01',
      checkOut: '2024-04-03',
      booked: '2024-03-18',
      eta: '-',
      room: 'Room 2',
      total: 177,
      outstanding: 177,
      invoice: '-'
    }
  ]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const groupedReservations = reservations.reduce((acc, reservation) => {
    const date = new Date(reservation.checkIn).toLocaleDateString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(reservation);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-700 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Reservations Management</h1>
          
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Guest last name</label>
              <input
                type="text"
                value={filters.guestLastName}
                onChange={(e) => handleFilterChange('guestLastName', e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter guest name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Booking reference</label>
              <input
                type="text"
                value={filters.bookingReference}
                onChange={(e) => handleFilterChange('bookingReference', e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter reference"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Invoice Number</label>
              <input
                type="text"
                value={filters.invoiceNumber}
                onChange={(e) => handleFilterChange('invoiceNumber', e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Invoice number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date type</label>
              <select
                value={filters.dateType}
                onChange={(e) => handleFilterChange('dateType', e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="CheckIn">Check In</option>
                <option value="CheckOut">Check Out</option>
                <option value="Booked">Booked</option>
              </select>
            </div>

            <button className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mt-6">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Second Row Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date from</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date to</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-orange-600">
              {reservations.length} RESERVATIONS FOUND
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Reservation</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Reference</div>
              <div className="col-span-1">Source</div>
              <div className="col-span-1">Occupants</div>
              <div className="col-span-1">Check In</div>
              <div className="col-span-1">Check Out</div>
              <div className="col-span-1">Room</div>
              <div className="col-span-1">Total</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {Object.entries(groupedReservations).map(([date, dateReservations]) => (
              <div key={date}>
                {/* Date Header */}
                <div className="bg-blue-50 px-6 py-3">
                  <h3 className="text-sm font-medium text-blue-900">{date}</h3>
                </div>

                {/* Reservations for this date */}
                {dateReservations.map((reservation) => (
                  <div key={reservation.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center text-sm">
                      {/* Status */}
                      <div className="col-span-1">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                          {getStatusIcon(reservation.status)}
                          <span>{reservation.status}</span>
                        </span>
                      </div>

                      {/* Name */}
                      <div className="col-span-2">
                        <div className="font-medium text-gray-900">{reservation.name}</div>
                      </div>

                      {/* Reference */}
                      <div className="col-span-2">
                        <div className="text-blue-600 font-mono text-xs break-all">
                          {reservation.reference}
                        </div>
                      </div>

                      {/* Source */}
                      <div className="col-span-1">
                        <span className="text-gray-600">{reservation.source}</span>
                      </div>

                      {/* Occupants */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Users className="w-3 h-3" />
                          <span>{reservation.occupants.adults}</span>
                          <span className="text-gray-400">♦</span>
                          <span>{reservation.occupants.children}</span>
                        </div>
                      </div>

                      {/* Check In */}
                      <div className="col-span-1">
                        <span className="text-gray-900">{formatDate(reservation.checkIn)}</span>
                      </div>

                      {/* Check Out */}
                      <div className="col-span-1">
                        <span className="text-gray-900">{formatDate(reservation.checkOut)}</span>
                      </div>

                      {/* Room */}
                      <div className="col-span-1">
                        {reservation.room !== '-' ? (
                          <div className="flex items-center space-x-1">
                            <Bed className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-900">{reservation.room}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>

                      {/* Total */}
                      <div className="col-span-1">
                        <div className="text-gray-900 font-medium">${reservation.total}</div>
                        {reservation.outstanding > 0 && (
                          <div className="text-red-600 text-xs">${reservation.outstanding}</div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing 1-{reservations.length} of {reservations.length} reservations
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
      </div>
    </div>
  );
};

export default ReservationsPage;