

// import React from "react";

// const Premium = () => {
//   return (
//     <div className="min-h-screen bg-base-200 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-12">
//           Choose Your Premium Plan
//         </h1>

//         <div className="flex w-full flex-col lg:flex-row gap-8 lg:gap-4">
//           {/* Silver Membership Card */}
//           <div className="card bg-base-100 shadow-xl rounded-box grow">
//             <div className="card-body">
//               <div className="text-center">
//                 <h2 className="card-title justify-center text-2xl font-bold text-gray-600">
//                   Silver Membership
//                 </h2>
//                 <p className="text-3xl font-bold mt-4">
//                   $29<span className="text-sm font-normal">/month</span>
//                 </p>
//               </div>

//               <div className="divider my-4"></div>

//               <ul className="space-y-3 mb-6">
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Access to basic features</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>5GB cloud storage</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Email support</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Basic analytics</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Up to 3 team members</span>
//                 </li>
//               </ul>

//               <div className="card-actions justify-center mt-auto">
//                 <button className="btn btn-primary w-full">Pay Now</button>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="divider lg:divider-horizontal text-lg font-semibold">
//             OR
//           </div>

//           {/* Gold Membership Card */}
//           <div className="card bg-base-100 shadow-xl rounded-box grow border-2 border-warning">
//             <div className="card-body">
//               <div className="text-center">
//                 <div className="badge badge-warning mb-2">POPULAR</div>
//                 <h2 className="card-title justify-center text-2xl font-bold text-yellow-600">
//                   Gold Membership
//                 </h2>
//                 <p className="text-3xl font-bold mt-4">
//                   $59<span className="text-sm font-normal">/month</span>
//                 </p>
//               </div>

//               <div className="divider my-4"></div>

//               <ul className="space-y-3 mb-6">
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>All Silver features</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Unlimited cloud storage</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Priority 24/7 support</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Advanced analytics & reports</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Up to 10 team members</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Custom integrations</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-success mr-2">✓</span>
//                   <span>Early access to new features</span>
//                 </li>
//               </ul>

//               <div className="card-actions justify-center mt-auto">
//                 <button className="btn btn-warning w-full text-white">
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Premium;






import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false)
  const [isMembership, setIsMembership] = useState("");


  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true });

      
      
      setIsUserPremium(res.data.isPremium);
       setIsMembership(res.data.membershipType);

    }
    catch (err) {
      console.log(err)
    }
  }

  const handlePayment = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { data, keyId } = order.data;

       const options = {
         key: keyId,
         amount: data.amount,
         currency: data.currency,
         name: data.notes.firstName,

         order_id: data.orderId,

         prefill: {
           name: data.notes.firstName + " " + data.notes.lastName,
           //  email: "gaurav.kumar@example.com",
           //  contact: "9999999999",
         },
         theme: {
           color: "#F37254",
         },
         handler: verifyPremiumUser,
       };

       const rzp = new window.Razorpay(options);
       rzp.open();
    }
    catch (err) {
      console.log(err)
    }
  }


    useEffect(() => {
      verifyPremiumUser();
    }, []);
  // return (
  //   <div className="min-h-screen bg-base-200 py-12 px-4">
  //     <div className="max-w-6xl mx-auto">
  //       <h1 className="text-4xl font-bold text-center mb-12">
  //         Choose Your Premium Plan
  //       </h1>

  //       <div className="flex w-full flex-col lg:flex-row gap-8 lg:gap-4">
  //         {/* Silver Membership Card */}
  //         <div className="card bg-base-100 shadow-xl rounded-box grow border-2 border-silver">
  //           <div className="card-body">
  //             <div className="text-center">
  //               <h2 className="card-title justify-center text-2xl font-bold text-silver">
  //                 Silver Membership
  //               </h2>
  //               <p className="text-3xl font-bold mt-4">
  //                 ₹300<span className="text-sm font-normal">/month</span>
  //               </p>
  //             </div>

  //             <div className="divider my-4"></div>

  //             <ul className="space-y-3 mb-6">
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Access to basic features</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>5GB cloud storage</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Email support</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Basic analytics</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Up to 3 team members</span>
  //               </li>
  //             </ul>

  //             <div className="card-actions justify-center mt-auto">
  //               <button
  //                 className="btn bg-silver border-silver text-white w-full hover:bg-gray-600"
  //                 onClick={() => handlePayment("silver")}
  //               >
  //                 Pay Now
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Divider */}
  //         <div className="divider lg:divider-horizontal text-lg font-semibold">
  //           OR
  //         </div>

  //         {/* Gold Membership Card */}
  //         <div className="card bg-base-100 shadow-xl rounded-box grow border-2 border-warning">
  //           <div className="card-body">
  //             <div className="text-center">
  //               <div className="badge badge-warning mb-2">POPULAR</div>
  //               <h2 className="card-title justify-center text-2xl font-bold text-yellow-600">
  //                 Gold Membership
  //               </h2>
  //               <p className="text-3xl font-bold mt-4">
  //                 ₹500<span className="text-sm font-normal">/month</span>
  //               </p>
  //             </div>

  //             <div className="divider my-4"></div>

  //             <ul className="space-y-3 mb-6">
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>All Silver features</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Unlimited cloud storage</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Priority 24/7 support</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Advanced analytics & reports</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Up to 10 team members</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Custom integrations</span>
  //               </li>
  //               <li className="flex items-start">
  //                 <span className="text-success mr-2">✓</span>
  //                 <span>Early access to new features</span>
  //               </li>
  //             </ul>

  //             <div className="card-actions justify-center mt-auto">
  //               <button
  //                 className="btn btn-warning w-full text-white"
  //                 onClick={() => handlePayment("gold")}
  //               >
  //                 Pay Now
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );



   return (
     <div className="min-h-screen bg-base-200 py-12 px-4">
       <div className="max-w-4xl mx-auto">
         {isUserPremium ? (
           // 🎉 Show Membership Success Card
           <div className="card bg-success shadow-xl rounded-box p-6 text-center text-white">
             <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
             <p className="text-lg">
               You are now a proud member of{" "}
               <span className="font-bold uppercase">{isMembership}</span> Membership.
             </p>
           </div>
         ) : (
           // 💳 Show Plans
           <>
             <h1 className="text-4xl font-bold text-center mb-12">
               Choose Your Premium Plan
             </h1>

             <div className="flex w-full flex-col lg:flex-row gap-8 lg:gap-4">
               {/* Silver Membership Card */}
               <div className="card bg-base-100 shadow-xl rounded-box grow border-2 border-silver">
                 <div className="card-body">
                   <div className="text-center">
                     <h2 className="card-title justify-center text-2xl font-bold text-silver">
                       Silver Membership
                     </h2>
                     <p className="text-3xl font-bold mt-4">
                       ₹300<span className="text-sm font-normal">/month</span>
                     </p>
                   </div>

                   <div className="divider my-4"></div>

                   <ul className="space-y-3 mb-6">
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Access to basic features</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>5GB cloud storage</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Email support</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Basic analytics</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Up to 3 team members</span>
                     </li>
                   </ul>

                   <div className="card-actions justify-center mt-auto">
                     <button
                       className="btn bg-silver border-silver text-white w-full hover:bg-gray-600"
                       onClick={() => handlePayment("silver")}
                     >
                       Pay Now
                     </button>
                   </div>
                 </div>
               </div>

               {/* Divider */}
               <div className="divider lg:divider-horizontal text-lg font-semibold">
                 OR
               </div>

               {/* Gold Membership Card */}
               <div className="card bg-base-100 shadow-xl rounded-box grow border-2 border-warning">
                 <div className="card-body">
                   <div className="text-center">
                     <div className="badge badge-warning mb-2">POPULAR</div>
                     <h2 className="card-title justify-center text-2xl font-bold text-yellow-600">
                       Gold Membership
                     </h2>
                     <p className="text-3xl font-bold mt-4">
                       ₹500<span className="text-sm font-normal">/month</span>
                     </p>
                   </div>

                   <div className="divider my-4"></div>

                   <ul className="space-y-3 mb-6">
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>All Silver features</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Unlimited cloud storage</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Priority 24/7 support</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Advanced analytics & reports</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Up to 10 team members</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Custom integrations</span>
                     </li>
                     <li className="flex items-start">
                       <span className="text-success mr-2">✓</span>
                       <span>Early access to new features</span>
                     </li>
                   </ul>

                   <div className="card-actions justify-center mt-auto">
                     <button
                       className="btn btn-warning w-full text-white"
                       onClick={() => handlePayment("gold")}
                     >
                       Pay Now
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </>
         )}
       </div>
     </div>
   );
};

export default Premium;