var myChart = echarts.init(document.getElementById('main'));
var option = {
	radar: {
	    name: {
	        textStyle: {
	            color: '#000',
	            fontSize:16
	       }
	    },
	    axisLine: {            // 坐标轴线
	        show: true,        // 默认显示，属性show控制显示与否
	        lineStyle:{
	        	color: ["#00ff00"]  // 图表背景网格的颜色
	        }
	    },
	    splitArea : {
	        show : true,   
	        areaStyle : {
	            color: ["#edac2b"]  // 图表背景网格的颜色
	        }
	    },
	    splitLine : {
	        show : true,
	        lineStyle : {
	            width : 1,
	            color : '#0012ff' // 图表背景网格线的颜色
	        }
	    },
	    indicator: [
	       { name: '销售', max: 100},
	       { name: '管理', max: 100},
	       { name: '信息技术', max: 100},
	       { name: '客服', max: 100},
	       { name: '研发', max: 100}
        ]
    },
    series: [{
    	symbol: "none",     // 去掉折线上面的小圆点
   		type: 'radar',
        data : [{
        	value: []     //外部加载，也可以通过ajax去加载外部数据。
        }]
    }]
}
 // 使用刚指定的配置项和数据显示图表。
option.series[0].data[0].value=[12,32,34,53,53];  // 加载数据到data中
myChart.setOption(option);
var img_src=myChart.getDataURL();
document.getElementById('img').src=img_src;