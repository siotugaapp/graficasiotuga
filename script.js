


let url = 'tabla_procesado_data.json';
//const jsonCorregido = url.replace(/([{,]/s*)([A-Za-z0-9_/-]+?)/s*:/g, '$1"$2":');
//console.log(jsonCorregido);
//const datos = JSON.parse(jsonCorregido);

let estados = {
  'Sen comenzar': 0,
  'En proceso': 0,
  'Rematado': 0
};

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      if (item.estado in estados) {
        estados[item.estado]++;
      }
    });
    
    const chartData = Object.keys(estados).map(estado => ({
      estado: estado,
      count: estados[estado]
    }));

    config = {
      labelColor: '#0b62a4',
      element: 'mychart',
      data: chartData,
      xkey: 'estado',
      ykeys: ['count'],
      //yLabelFormat: function(y) {return y = Math.round(y);},
      labels: [''],
      barColors: ['#0b62a4'],
      hoverCallback: function(index, options, content, row) {
        return `<div class="custom-tooltip">
          <div class="tooltip-header">
            <span class="tooltip-title">${row.estado}</span>
          </div>
          <div class="tooltip-body">           
            <span class="tooltip-value">${row.count}</span>
          </div>
          
        </div>`;
      }
    }
 Morris.Bar(config);


        
          
                 
  })
  .catch(error => console.error('Error fetching data:', error));