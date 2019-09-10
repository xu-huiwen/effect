//投掷筛子
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
		var n=1; //前进步数直到piece.num
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
					if(piece.index==piece.special[j]){     //前进后退移动过程
//						if(parseInt(piece.go[j])!=0){
//							piece.index=parseInt(piece.index+piece.go[j]);
//						}else{
//							shake();
//						}
						piece.index=parseInt(piece.index+piece.go[j]);
						var num = piece.special[j];
						updateStep(num);
						if(piece.index >= piece.maxIndex){           //最后一个前进到初始位置
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
						if(num<=piece.index){                          //前进的过程
							var timer = setInterval(function(){
								if(num<=piece.index){
									updateStep(num);
								}
								num++;
							},300)	
						}else{                                        //后退的过程
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
  
   