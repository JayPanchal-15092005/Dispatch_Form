// "use client";

// import React, { useState, useEffect } from "react";

// export default function DispatchPage() {
//   const [formData, setFormData] = useState({
//     ticketId: "",
//     bcCode: "",
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     mobile: "",
//     altMobile: "",
//     village: "",
//     taluka: "",
//     district: "",
//     pincode: "",
//     dispatchBy: "",
//     dispatchWith: "",
//     dispatchNumber: "",
//     dispatchLink: "",
//     estimateDelivery: "",
//     itemNames: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // BC Code lookup
//   useEffect(() => {
//     if (formData.bcCode.length >= 7) {
//       const timer = setTimeout(() => {
//         lookupBCCode(formData.bcCode);
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [formData.bcCode]);

//   const lookupBCCode = async (bcCode: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/bc-lookup?bcCode=${bcCode}`);

//       if (response.ok) {
//         const data = await response.json();
//         setFormData((prev) => ({
//           ...prev,
//           name: data.name || "",
//           address: data.address || "",
//           city: data.city || "",
//           state: data.state || "",
//           mobile: data.mobile || "",
//           altMobile: data.altMobile || "",
//           village: data.village || "",
//           taluka: data.taluka || "",
//           district: data.district || "",
//           pincode: data.pincode || "",
//         }));
//         setMessage("✓ Customer details loaded successfully!");
//       } else {
//         setMessage("⚠ BC Code not found. Please enter details manually.");
//       }
//     } catch (error) {
//       setMessage("❌ Error loading BC Code");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     if (!formData.bcCode || !formData.name) {
//       setMessage("❌ Please fill BC Code and Name");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("/api/dispatch", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setMessage("✓ Dispatch entry saved successfully!");
//         setTimeout(() => {
//           setFormData({
//             ticketId: "",
//             bcCode: "",
//             name: "",
//             address: "",
//             city: "",
//             state: "",
//             mobile: "",
//             altMobile: "",
//             village: "",
//             taluka: "",
//             district: "",
//             pincode: "",
//             dispatchBy: "",
//             dispatchWith: "",
//             dispatchNumber: "",
//             dispatchLink: "",
//             estimateDelivery: "",
//             itemNames: "",
//           });
//           setMessage("");
//         }, 2000);
//       } else {
//         setMessage("❌ Failed to save dispatch entry");
//       }
//     } catch (error) {
//       setMessage("❌ Error saving dispatch");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGeneratePDF = async () => {
//     if (!formData.name) {
//       setMessage("❌ Please fill the form first");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("/api/generate-pdf", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setMessage("✓ PDF generated successfully!");
//       }
//     } catch (error) {
//       setMessage("❌ Error generating PDF");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
//           <h1 className="text-4xl font-bold text-white mb-8 text-center">
//             Dispatch Entry Form
//           </h1>

//           {message && (
//             <div
//               className={`mb-6 p-4 rounded-lg text-center font-semibold ${
//                 message.includes("✓")
//                   ? "bg-green-900 text-green-200"
//                   : message.includes("⚠")
//                   ? "bg-yellow-900 text-yellow-200"
//                   : "bg-red-900 text-red-200"
//               }`}
//             >
//               {message}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Ticket ID
//               </label>
//               <input
//                 type="text"
//                 name="ticketId"
//                 value={formData.ticketId}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter Ticket ID"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 BC Code *
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="bcCode"
//                   value={formData.bcCode}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter BC Code"
//                 />
//                 {loading && formData.bcCode && (
//                   <div className="absolute right-3 top-3">
//                     <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Full Name"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Full Address"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 City
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="City"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 State
//               </label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="State"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Mobile
//               </label>
//               <input
//                 type="text"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Mobile Number"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Alt Mobile
//               </label>
//               <input
//                 type="text"
//                 name="altMobile"
//                 value={formData.altMobile}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Alternate Mobile"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Village
//               </label>
//               <input
//                 type="text"
//                 name="village"
//                 value={formData.village}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Village"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Taluka
//               </label>
//               <input
//                 type="text"
//                 name="taluka"
//                 value={formData.taluka}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Taluka"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 District
//               </label>
//               <input
//                 type="text"
//                 name="district"
//                 value={formData.district}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="District"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Pincode
//               </label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Pincode"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Dispatch By
//               </label>
//               <input
//                 type="text"
//                 name="dispatchBy"
//                 value={formData.dispatchBy}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Dispatcher Name"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Dispatch With
//               </label>
//               <input
//                 type="text"
//                 name="dispatchWith"
//                 value={formData.dispatchWith}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Courier/Transport Name"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Dispatch Number
//               </label>
//               <input
//                 type="text"
//                 name="dispatchNumber"
//                 value={formData.dispatchNumber}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Tracking Number"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Dispatch Link
//               </label>
//               <input
//                 type="text"
//                 name="dispatchLink"
//                 value={formData.dispatchLink}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Tracking URL"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Estimate Delivery Date
//               </label>
//               <input
//                 type="date"
//                 name="estimateDelivery"
//                 value={formData.estimateDelivery}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-gray-300 font-semibold mb-2">
//                 Item Names
//               </label>
//               <textarea
//                 name="itemNames"
//                 value={formData.itemNames}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter item names/descriptions"
//               />
//             </div>
//           </div>

//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//             >
//               {loading ? "⏳ Saving..." : "💾 Save"}
//             </button>
//             <button
//               onClick={handleGeneratePDF}
//               disabled={loading}
//               className="px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//             >
//               {loading ? "⏳ Generating..." : "📄 Generate PDF"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client'

import React, { useState, useEffect } from 'react';

export default function DispatchForm() {
  const [formData, setFormData] = useState({
    ticketId: '',
    bcCode: '',
    name: '',
    address: '',
    city: '',
    state: '',
    mobile: '',
    altMobile: '',
    village: '',
    taluka: '',
    district: '',
    pincode: '',
    dispatchBy: '',
    dispatchWith: '',
    dispatchNumber: '',
    dispatchLink: '',
    estimateDelivery: '',
    itemNames: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [lookingUp, setLookingUp] = useState(false);

  // BC Code lookup with debounce
  useEffect(() => {
    if (formData.bcCode.length >= 7) {
      const timer = setTimeout(() => {
        lookupBCCode(formData.bcCode);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.bcCode]);

  const lookupBCCode = async (bcCode: any) => {
    setLookingUp(true);
    
    try {
      const response = await fetch(`/api/bc-lookup?bcCode=${bcCode}`);
      
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          mobile: data.mobile || '',
          altMobile: data.altMobile || '',
          village: data.village || '',
          taluka: data.taluka || '',
          district: data.district || '',
          pincode: data.pincode || ''
        }));
      }
    } catch (error) {
      console.error('BC lookup error:', error);
    } finally {
      setLookingUp(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.bcCode || !formData.name) {
      setMessage('❌ Please fill BC Code and Name');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('✓ Dispatch entry saved successfully!');
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            ticketId: '',
            bcCode: '',
            name: '',
            address: '',
            city: '',
            state: '',
            mobile: '',
            altMobile: '',
            village: '',
            taluka: '',
            district: '',
            pincode: '',
            dispatchBy: '',
            dispatchWith: '',
            dispatchNumber: '',
            dispatchLink: '',
            estimateDelivery: '',
            itemNames: ''
          });
          setMessage('');
        }, 2000);
      } else {
        setMessage('❌ Failed to save dispatch entry');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Error saving dispatch');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!formData.name) {
      setMessage('❌ Please fill the form first');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    setMessage('⏳ Generating PDF...');
    
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Get PDF blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dispatch-${formData.bcCode || 'entry'}-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        setMessage('✓ PDF generated and downloaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Failed to generate PDF');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Error generating PDF');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Dispatch Entry Form
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket ID */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Ticket ID
              </label>
              <input
                type="text"
                name="ticketId"
                value={formData.ticketId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Ticket ID"
              />
            </div>

            {/* BC Code */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                BC Code *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="bcCode"
                  value={formData.bcCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter BC Code"
                />
                {lookingUp && (
                  <div className="absolute right-3 top-3">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Name"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Address"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="State"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mobile Number"
              />
            </div>

            {/* Alt Mobile */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Alt Mobile
              </label>
              <input
                type="text"
                name="altMobile"
                value={formData.altMobile}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Alternate Mobile"
              />
            </div>

            {/* Village */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Village
              </label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Village"
              />
            </div>

            {/* Taluka */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Taluka
              </label>
              <input
                type="text"
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Taluka"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="District"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Pincode"
              />
            </div>

            {/* Dispatch By */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Dispatch By
              </label>
              <input
                type="text"
                name="dispatchBy"
                value={formData.dispatchBy}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Dispatcher Name"
              />
            </div>

            {/* Dispatch With */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Dispatch With
              </label>
              <input
                type="text"
                name="dispatchWith"
                value={formData.dispatchWith}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Courier/Transport Name"
              />
            </div>

            {/* Dispatch Number */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Dispatch Number
              </label>
              <input
                type="text"
                name="dispatchNumber"
                value={formData.dispatchNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tracking Number"
              />
            </div>

            {/* Dispatch Link */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Dispatch Link
              </label>
              <input
                type="text"
                name="dispatchLink"
                value={formData.dispatchLink}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tracking URL"
              />
            </div>

            {/* Estimate Delivery Date */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Estimate Delivery Date
              </label>
              <input
                type="date"
                name="estimateDelivery"
                value={formData.estimateDelivery}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Item Names */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 font-semibold mb-2">
                Item Names
              </label>
              <textarea
                name="itemNames"
                value={formData.itemNames}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter item names/descriptions"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading && !message.includes('PDF') ? '⏳ Saving...' : '💾 Save'}
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={loading}
              className="px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading && message.includes('PDF') ? '⏳ Generating...' : '📄 Generate PDF'}
            </button>
          </div>

          {/* Success Message at Bottom */}
          {message && (
            <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${
              message.includes('✓') ? 'bg-green-900 text-green-200' :
              message.includes('⚠') ? 'bg-yellow-900 text-yellow-200' :
              message.includes('⏳') ? 'bg-blue-900 text-blue-200' :
              'bg-red-900 text-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}