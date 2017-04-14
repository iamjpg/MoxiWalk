export default {
  updated: new Date(),
  mileWayPoints: [],
  markersArray: [],
  markersStartEndArray: [],
  teams: [
    {
      name: "There’s always another Pokemon",
      selected: true,
      icon: '<i class="material-icons">weekend</i>',
      members: [
        {
          name: "JP Given"
        },
        {
          name: "Joe Hatfield"
        },
        {
          name: "Mark Carlson"
        },
        {
          name: "Cass Herrin"
        }
      ],
      totalSteps: 0,
      backgroundIcon: 'data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%2523000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%3E%3Ccircle%20cx%3D%224.5%22%20cy%3D%229.5%22%20r%3D%222.5%22%2F%3E%3Ccircle%20cx%3D%229%22%20cy%3D%225.5%22%20r%3D%222.5%22%2F%3E%3Ccircle%20cx%3D%2215%22%20cy%3D%225.5%22%20r%3D%222.5%22%2F%3E%3Ccircle%20cx%3D%2219.5%22%20cy%3D%229.5%22%20r%3D%222.5%22%2F%3E%3Cpath%20d%3D%22M17.34%2014.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53%200-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75%201.32-.87%201.02-1.6%201.89-2.48%202.91-1.31%201.31-2.92%202.76-2.62%204.79.29%201.02%201.02%202.03%202.33%202.32.73.15%203.06-.44%205.54-.44h.18c2.48%200%204.81.58%205.54.44%201.31-.29%202.04-1.31%202.33-2.32.31-2.04-1.3-3.49-2.61-4.8z%22%2F%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E'
    },
    {
      name: "Really a Ninja Viking Dahlia",
      selected: true,
      members: [
        {
          name: "Regina Kelly"
        },
        {
          name: "Jillian Igarashi"
        },
        {
          name: "Davina Camardo"
        },
        {
          name: "Kyla Searing"
        }
      ],
      totalSteps: 0,
      backgroundIcon: 'data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%2523000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2218%22%20fill%3D%22none%22%20r%3D%222%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20fill%3D%22none%22%20r%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20fill%3D%22none%22%20r%3D%222%22%2F%3E%3Cpath%20d%3D%22M9.64%207.64c.23-.5.36-1.05.36-1.64%200-2.21-1.79-4-4-4S2%203.79%202%206s1.79%204%204%204c.59%200%201.14-.13%201.64-.36L10%2012l-2.36%202.36C7.14%2014.13%206.59%2014%206%2014c-2.21%200-4%201.79-4%204s1.79%204%204%204%204-1.79%204-4c0-.59-.13-1.14-.36-1.64L12%2014l7%207h3v-1L9.64%207.64zM6%208c-1.1%200-2-.89-2-2s.9-2%202-2%202%20.89%202%202-.9%202-2%202zm0%2012c-1.1%200-2-.89-2-2s.9-2%202-2%202%20.89%202%202-.9%202-2%202zm6-7.5c-.28%200-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19%203l-6%206%202%202%207-7V3z%22%2F%3E%3C%2Fsvg%3E'
    },
    {
      name: "Carolina Contingents",
      selected: true,
      members: [
        {
          name: "Georgia Perez"
        },
        {
          name: "Jim Smoak"
        },
        {
          name: "Debbie Gurley"
        },
        {
          name: "Maria Mull"
        },
        {
          name: "Nick Van Valkenberg"
        }
      ],
      totalSteps: 0,
      backgroundIcon: 'data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%2523000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M10.18%209%22%2F%3E%3Cpath%20d%3D%22M21%2016v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10%202.67%2010%203.5V9l-8%205v2l8-2.5V19l-2%201.5V22l3.5-1%203.5%201v-1.5L13%2019v-5.5l8%202.5z%22%2F%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E'
    },
    {
      name: "Big Boppers",
      selected: true,
      members: [
        {
          name: "Tom Hartnett"
        },
        {
          name: "Dustin Martinka"
        },
        {
          name: "Jeff DeMelle"
        },
        {
          name: "Esther Romanoff"
        }
      ],
      totalSteps: 0,
      backgroundIcon: 'data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%2523000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%20opacity%3D%22.1%22%2F%3E%3Cpath%20d%3D%22M12%201c-4.97%200-9%204.03-9%209v7c0%201.66%201.34%203%203%203h3v-8H5v-2c0-3.87%203.13-7%207-7s7%203.13%207%207v2h-4v8h3c1.66%200%203-1.34%203-3v-7c0-4.97-4.03-9-9-9z%22%2F%3E%3C%2Fsvg%3E'
    },
    {
      name: "The Jetsons",
      selected: true,
      members: [
        {
          name: "Robert Sherrel"
        },
        {
          name: "Tom Shively"
        },
        {
          name: "Melissa Anderson"
        }
      ],
      totalSteps: 0,
      backgroundIcon: 'data:image/svg+xml;utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%2523000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M22.25%2014.29l-.69%201.89L9.2%2011.71l2.08-5.66%208.56%203.09c2.1.76%203.18%203.06%202.41%205.15zM1.5%2012.14L8%2014.48V19h8v-1.63L20.52%2019l.69-1.89-19.02-6.86-.69%201.89zm5.8-1.94c1.49-.72%202.12-2.51%201.41-4C7.99%204.71%206.2%204.08%204.7%204.8c-1.49.71-2.12%202.5-1.4%204%20.71%201.49%202.5%202.12%204%201.4z%22%2F%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E'
    }
  ],
  dbPassword: 'MoxiSteps2017'
}
