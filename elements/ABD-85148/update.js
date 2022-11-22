function(instance, properties, context) {

    const divid = "#"+instance.data.divName;
    const data_rows = 5;
    const categories_len = properties.categories.length();
	const categories = properties.categories.get(0, categories_len);
	const data = [];
    for (let i = 1; i <= data_rows; i++) {
        if (properties[`series_data_${i}`]) {
           	if (properties[`series_data_${i}`].length() !== properties.categories.length()) {
                throw new Error(`Data categories length mismatch.
								 Length of ${properties[`series_name_${i}`]}: ${properties[`series_data_${i}`].length()},
								 Length of Categories: ${categories_len}`)
            }
            data.push({
                name: properties[`series_name_${i}`],
                data: properties[`series_data_${i}`].get(0, categories_len),
                color: properties[`series_color_${i}`],
            })
        }
    }

    
    

    var options = {
        series: data,
        chart: { 
            sparkline: {
        		enabled: true,
    		},
            height: '100%',
            width: '100%',
            type: properties.chart_type,
            zoom: {
                enabled: properties.enable_zoom,
            },
            background: properties.chart_color,
            toolbar: {
                show: properties.enable_toolbar,
            },
            animations: {
                enabled: properties.enable_animation,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            events: {
                click: function(event, chartContext, config) {
                    instance.triggerEvent('chart_clicked');
                },
            }
        },
        colors: data.map(o => o.color),
        dataLabels: {
            enabled: properties.enable_dataLabels,
            background: {
                enabled: true,
                foreColor: 'rgba(0, 0, 0, .5)',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#fff',
                    opacity: 0.45
                }
            },
        },
        stroke: {
            curve: properties.curve,
            lineCap: properties.lineCap,
            width: properties.width,
        },
        title: {
            text: properties.title,
            align: properties.align,
        },
        grid: {
            show: properties.enable_grid,
            row: {
                colors: properties.grid_row_color ? [properties.chart_color, properties.grid_row_color] : undefined,
                opacity: properties.grid_row_opacity,
            },  
            column: {
                colors: properties.grid_column_color ? [properties.chart_color, properties.grid_column_color] : undefined,
                opacity: properties.grid_column_opacity,
            },
        },
        xaxis: {
            categories: categories,
            labels: categories,
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: true,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
            },
            tooltip: {
              enabled: properties.show_xaxis_tooltip,
              offsetX: 0,
          	},
            title: {
                text: properties.categories_title ? properties.categories_title : undefined,
            },
            min: properties.xMin ? properties.xMin : undefined,
            max: properties.xMax ? properties.xMax : undefined
        },
        yaxis: {
            title: {
                text: properties.series_title ? properties.series_title : undefined,
            },
            min: properties.yMin ? properties.yMin : undefined,
            max: properties.yMax ? properties.yMax : undefined
        },
        tooltip: {
          enabled: properties.show_tooltip,
      	},
        legend: {
          show: properties.enable_legend,
          position: properties.legend_position,
          horizontalAlign: properties.legend_alignment,
          floating: properties.legend_position === 'top' ? true : false,
          offsetY: properties.legend_position === 'top' ? -25 : 0,
          offsetX: properties.legend_position === 'top' ? -5 : 0
        }
    };

    setTimeout(function() {
  
        document.getElementById(instance.data.divName).innerHTML = ''; 

        var chart = new ApexCharts(document.querySelector(divid), options);
        chart.render();   
    }, 1)
}