const initState = {
  channels: [],
  cart: [],
  cartCost: [
    {
      desc: "No. of Free Channels (Incl 25 M*)",
      qty: 25,
      price: "Free"
    },
    {
      desc: "No. of Pay Channels",
      qty: 0,
      price: 0
    },
    {
      desc: "No. of Bouquet",
      qty: 0,
      price: 0
    },
    {
      desc: "Total No. of unique Channels",
      qty: 0,
      price: 0
    },
    {
      desc: "Price(Channel+Bouquet)",
      qty: 0,
      price: 0
    },
    {
      desc: "Network Capacity Fees*",
      qty: null,
      price: "₹ 130"
    },
    {
      desc: "GST(18%)",
      qty: null,
      price: 0
    },
    {
      desc: "Total Price(Monthly)",
      qty: null,
      price: 0
    }
  ]
};

export default initState;
