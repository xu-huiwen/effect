//Ͷ��ɸ��
var tqBtn = true, moveBtn = true;
function shake(){
	if(moveBtn){
		moveBtn = false;
		motion();
	}else{return;}
}
function updateStep(index) {
	$(piece.id).animate({"left":positionarr[piece.userSelect][index][0] +"rem","top":positionarr[piece.userSelect][index][1]+"rem"},100);
}
   function motion(){
   	moveBtn = true;
		var n=1; //ǰ������ֱ��piece.num
		var j=0;
		var deastime=setInterval(function(){
			if (n<piece.num) {
				if(piece.index+n>=piece.maxIndex){
					updateStep(piece.index+n-piece.maxIndex);
				}else{
					updateStep(piece.index+n);
				}
				n++;
			} else {
				clearInterval(deastime);
				if(piece.index + piece.num >= piece.maxIndex){
					piece.index = piece.index + piece.num - piece.maxIndex;
				}else{
					piece.index = piece.index + piece.num;
				}
				
				for(var j=0;j<piece.special.length;j++){
					if(piece.index==piece.special[j]){     //ǰ�������ƶ�����
//						if(parseInt(piece.go[j])!=0){
//							piece.index=parseInt(piece.index+piece.go[j]);
//						}else{
//							shake();
//						}
						piece.index=parseInt(piece.index+piece.go[j]);
						var num = piece.special[j];
						updateStep(num);
						if(piece.index >= piece.maxIndex){           //���һ��ǰ������ʼλ��
							piece.index=0;
							updateStep(num);
							if(piece.maxIndex-num>0){
								num++
							}else{
								num=0
							}
							var timer1 = setInterval(function(){
								if(piece.maxIndex-num>0){
									updateStep(num);
									num++;
								}else{
									piece.index=0;
									updateStep(piece.index);
									clearInterval(timer1)
									return false
								}
							},300)		
							return false
						}
						if(num<=piece.index){                          //ǰ���Ĺ���
							var timer = setInterval(function(){
								if(num<=piece.index){
									updateStep(num);
								}
								num++;
							},300)	
						}else{                                        //���˵Ĺ���
							 setInterval(function(){
								if(num>=piece.index){
									updateStep(num);
								}
								num--;
							},300)	
					}
					return false
				}
			}
				updateStep(piece.index);
				moveBtn = true;
			clearInterval(timer)
			}
		},500);
		
	}
  
   