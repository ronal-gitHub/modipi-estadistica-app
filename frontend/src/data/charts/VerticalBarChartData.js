export const getVerticalBarChartData = (themes) => ({
  labels: ['Total','Vivienda Particular',	'Vivienda Colectiva',	'Transeuntes'],
  datasets: [
      {
          label: 'Chuquisaca',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data: [179578,	176450,	2277,	851  ],
      },
  {
          label: 'La Paz',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data:  [940948,	930457,	7197,	3294  ]
      },   
    {
          label: 'Cochabamba',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data: [179578,	176450,	2277,	2317  ],
      },
  {
          label: 'Oruro',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data:  [940948,	930457,	7197,	756  ]
      },  
   {
          label: 'Potosí',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data: [179578,	176450,	2277,	1225  ],
      },
  {
          label: 'Tarija',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data:  [940948,	930457,	7197,	801  ]
      },  
   {
          label: 'Santa Cruz',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data: [179578,	176450,	2277,	2898  ],
      },
  {
          label: 'Beni',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data:  [940948,	930457,	7197,	631  ]
      },  
    {
          label: 'Pando',
    backgroundColor: themes.primary,
          borderColor: 'transparent',
          data:  [28296,	27415,	683,	198  ]
      },
  ],
})
