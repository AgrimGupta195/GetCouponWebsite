import React, { useState, useEffect } from 'react';
import { TrashIcon, PowerIcon, CheckCircleIcon, PencilIcon, XIcon } from 'lucide-react';
import { useCouponStore } from '../stores/couponStore';

const Dashboard = () => {
  const { 
    coupons, 
    loading, 
    getCoupon, 
    addCoupon, 
    deleteCoupon, 
    toggleFeaturedProduct,
    updateCoupon
  } = useCouponStore();
  
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: ''});
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [editFormData, setEditFormData] = useState({ code: '', discount: '' });

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (newCoupon.code && newCoupon.discount) {
      const discount = parseInt(newCoupon.discount);
      if (isNaN(discount) || discount <= 0 || discount > 100) {
        alert('Discount must be a number between 1 and 100');
        return;
      }
      
      addCoupon({
        code: newCoupon.code.toUpperCase(),
        discount: discount
      });
      
      setNewCoupon({ code: '', discount: ''});
    }
  };

  const handleEditClick = (coupon) => {
    setEditingCoupon(coupon._id);
    setEditFormData({
      code: coupon.code,
      discount: coupon.discount
    });
  };

  const handleCancelEdit = () => {
    setEditingCoupon(null);
    setEditFormData({ code: '', discount: '' });
  };

  const handleUpdateCoupon = (e) => {
    e.preventDefault();
    
    if (editFormData.code && editFormData.discount) {
      const discount = parseInt(editFormData.discount);
      if (isNaN(discount) || discount <= 0 || discount > 100) {
        alert('Discount must be a number between 1 and 100');
        return;
      }
      
      updateCoupon(editingCoupon, {
        code: editFormData.code.toUpperCase(),
        discount: discount
      });
      
      setEditingCoupon(null);
      setEditFormData({ code: '', discount: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
          <form onSubmit={handleAddCoupon} className="flex flex-wrap gap-4">
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium mb-1">Coupon Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="SUMMER25"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                required
              />
            </div>
            
            <div className="w-full md:w-32">
              <label className="block text-sm font-medium mb-1">Discount %</label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="25"
                min="1"
                max="100"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                required
              />
            </div>
            
            <div className="w-full md:w-32 flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Coupon'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Manage Coupons</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Code</th>
                    <th className="px-4 py-3 text-left">Discount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Claimed</th>
                    <th className="px-4 py-3 text-left">Claimed By</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id} className="border-b border-gray-700">
                      <td className="px-4 py-3">{coupon._id.substring(0, 8)}...</td>
                      
                      {editingCoupon === coupon._id ? (
                        <>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white font-mono"
                              value={editFormData.code}
                              onChange={(e) => setEditFormData({...editFormData, code: e.target.value})}
                              required
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white"
                              min="1"
                              max="100"
                              value={editFormData.discount}
                              onChange={(e) => setEditFormData({...editFormData, discount: e.target.value})}
                              required
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 font-mono">{coupon.code}</td>
                          <td className="px-4 py-3">{coupon.discount}%</td>
                        </>
                      )}

                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${coupon.isAvailable ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                          {coupon.isAvailable ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${coupon.isClaimed ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'}`}>
                          {coupon.isClaimed ? 'Claimed' : 'Unclaimed'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {coupon.isClaimed && coupon.claimedBy ? (
                          <span className="text-gray-300">{coupon.claimedBy}</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {editingCoupon === coupon._id ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={handleUpdateCoupon}
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                              title="Save"
                              disabled={loading}
                            >
                              <CheckCircleIcon size={16} />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 bg-gray-600 hover:bg-gray-700 rounded-md"
                              title="Cancel"
                              disabled={loading}
                            >
                              <XIcon size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditClick(coupon)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                              title="Edit"
                              disabled={loading || coupon.isClaimed}
                            >
                              <PencilIcon size={16} />
                            </button>
                            <button
                              onClick={() => toggleFeaturedProduct(coupon._id)}
                              className={`p-2 rounded-md ${coupon.isAvailable ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                              title={coupon.isAvailable ? 'Deactivate' : 'Activate'}
                              disabled={loading}
                            >
                              <PowerIcon size={16} />
                            </button>
                            <button
                              onClick={() => deleteCoupon(coupon._id)}
                              className="p-2 bg-red-600 hover:bg-red-700 rounded-md"
                              title="Delete"
                              disabled={loading}
                            >
                              <TrashIcon size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  
                  {coupons.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-400">
                        No coupons found. Create your first coupon above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;