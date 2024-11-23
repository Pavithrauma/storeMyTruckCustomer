import React, { useState, useEffect } from "react";
import { useAxios } from '../../components/http/useAxios'; // Adjust the import path as needed

const useMenuItemsData = () => {
  const { axios } = useAxios();
  const [menuItems, setMenuItems] = useState([]);

  // useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       const res = await axios.get(process.env.REACT_APP_BASE_PARKING_TYPE);
  //       if (res?.data?.success) {
  //         const parkingOptions = res.data.data.map(option => ({
  //           title: option.parkingType,
  //           url: `/Parking/${option.parkingType.replace(/\s+/g, '')}`,
           
  //         }));
  //         setMenuItems(parkingOptions);
  //       } else {
  //         console.error("Failed to fetch parking options", res.data.message);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching parking options", err);
  //     }
  //   };

  //   fetchMenuItems();
  // }, []);

  return [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About Us",
      url: "/",
      submenu: [
        {
          title: "Locations",
          url: "/truck",
        },
        {
          title: "Location Videos",
          url: "/locationvideos",
        }
      ],
    },
    {
      title: "Reserve Parking",
      url: "/",
      submenu: [
        
        {
          title: "Daily Parking",
          url: "/dailyParking",
        },   
        {
          title: "Weekend Parking",
          url: "/WeekendParking",
        }, 
        {
          title: "Weekly Parking",
          url: "/WeeklyParking",
        }, 
        {
          title: "Monthly Parking",
          url: "/MonthlyParking",
        }, 
        {
          title: "Multi Location Parking",
          url: "/MultiLocation",
        },
        {
          title:"MY Parking id",
          url: "/Parkingid",
        },
        {
          title: "Monthly Private Vehicle stall",
          url: "/MonthlyPrivateVehicle",
        },
        
      ],
    },
    {
      title: "Cancel / Change Parking",
      url: "/",
      submenu: [
        {
          title: "Cancel Parking",
          url: "/cancel",
        },
        {
          title: "Account Change Form",
          url: "/AccountChangeForm",
        },
        {
          title: 'Make & Update Payment',
          url: '/MakeandupdatePayment',
        }
      ],
    },
    {
      title: "Specials & Offers",
      url: "/special-offers",
    },
    {
      title: "Recommended Businesses",
      url: "/recommended-business",
    },
    {
      title: "Universal Boot System",
      url: "/universalbootsystem",
    },
    {
      title: "Contact Us",
      url: "/contact",
      submenu: [
        {
          title: 'Customer Support Ticket',
          url: "/CustomerSupportTicket",
        },
      ]
    },
  ];
};

export default useMenuItemsData;
