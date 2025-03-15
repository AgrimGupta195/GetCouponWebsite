import React, { useEffect, useState } from 'react';
import { useCouponStore } from '../stores/couponStore';
import { TagIcon, ScissorsIcon, CheckCircleIcon } from 'lucide-react';

const HomePage = () => {
  const { coupons, loading, getCouponForCustomer, claimCoupon } = useCouponStore();
  const [userId, setUserId] = useState('');
  const [claimingId, setClaimingId] = useState(null);
  const [claimedCode, setClaimedCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getCouponForCustomer();
  }, [getCouponForCustomer]);


  const handleClaimCoupon = async (couponId, code) => {
    setClaimingId(couponId);
    
    try {
      await claimCoupon(couponId);
      setClaimedCode(code);
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error claiming coupon:", error);
      alert("Failed to claim coupon. Please try again.");
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Special Offers</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Claim an exclusive discount coupon below to get amazing deals on our products.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <div 
                  key={coupon._id} 
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden relative"
                >
                  <div className="absolute -right-4 -top-4 bg-emerald-900/70 p-2 rounded-full shadow-lg">
                    <ScissorsIcon size={20} className="text-emerald-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-gray-700 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                        {coupon.discount}% OFF
                      </span>
                    </div>
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-mono font-bold tracking-wider">{coupon.code}</h3>
                    </div>
                    
                    {coupon.isClaimed ? (
                      <button
                        disabled
                        className="w-full py-3 bg-gray-600 rounded-md text-white font-medium flex items-center justify-center"
                      >
                        <CheckCircleIcon size={18} className="mr-2" />
                        Claimed
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClaimCoupon(coupon._id, coupon.code)}
                        disabled={claimingId === coupon._id}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 rounded-md text-white font-medium transition-colors flex items-center justify-center"
                      >
                        {claimingId === coupon._id ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Claiming...
                          </>
                        ) : (
                          'Claim Coupon'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-2">No Coupons Available</h3>
                  <p className="text-gray-400">
                    There are no active coupons available at the moment. 
                    Please check back later for new offers.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;