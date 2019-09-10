var myChart = echarts.init(document.getElementById('main'));
var option = {
	radar: {
	    name: {
	        textStyle: {
	            color: '#000',
	            fontSize:16
	       }
	    },
	    axisLine: {            // ��������
	        show: true,        // Ĭ����ʾ������show������ʾ���
	        lineStyle:{
	        	color: ["#00ff00"]  // ͼ�����������ɫ
	        }
	    },
	    splitArea : {
	        show : true,   
	        areaStyle : {
	            color: ["#edac2b"]  // ͼ�����������ɫ
	        }
	    },
	    splitLine : {
	        show : true,
	        lineStyle : {
	            width : 1,
	            color : '#0012ff' // ͼ���������ߵ���ɫ
	        }
	    },
	    indicator: [
	       { name: '����', max: 100},
	       { name: '����', max: 100},
	       { name: '��Ϣ����', max: 100},
	       { name: '�ͷ�', max: 100},
	       { name: '�з�', max: 100}
        ]
    },
    series: [{
    	symbol: "none",     // ȥ�����������СԲ��
   		type: 'radar',
        data : [{
        	value: []     //�ⲿ���أ�Ҳ����ͨ��ajaxȥ�����ⲿ���ݡ�
        }]
    }]
}
 // ʹ�ø�ָ�����������������ʾͼ��
option.series[0].data[0].value=[12,32,34,53,53];  // �������ݵ�data��
myChart.setOption(option);
var img_src=myChart.getDataURL();
document.getElementById('img').src=img_src;