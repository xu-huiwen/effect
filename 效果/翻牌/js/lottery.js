	var random_old=[];   //������ɲ��ظ�1-15���� ͼƬ��
	var random_now=0;
	var restSum=1;  //ͼƬ�ļ�����
	var $ul=$('#list');
	var $card=$ul.children('li');
	var $start=$('#start');
	var $rest=$('#rest');
	var one=true; //�ڶ������Զ��齱�󲻿�������齱
	var usual_search=function (key){
		for(var i=0,j=random_old.length;i<j;i++){   //��������
			if(random_old[i]==key){      //�Ա�ԭ������µ������
				break;
			}else{
				if(i==(j-1)){
					return true;
				}else{
					continue;
				};
			};
		};
	};
	var getNums=function (){
		random_now=Math.floor(Math.random()*15+1);   //�õ������
		if(random_old.length==0){
			random_old.push(random_now);   //�ж����
		}else{
			if(usual_search(random_now)){
				random_old.push(random_now);
			};
		};
	};
	/*�����ѭ����*/
	var loopGetArry=function(){
		random_old=[];
		for(var l=0;l<100;l++){
			if(random_old.length==15){
				break;
			}
			getNums();
		};
	};
	loopGetArry();
	/*��ʼ������*/
	$card.each(function(i){
		$(this).css({
			'left':($(this).width()+13)*(i%5), 
			'top':($(this).height()+13)*(i-(i%5))/5 
		}); //��ʼλ��
		$(this).on('click',function(){
			if(one!==false){          //�ж��Ƿ���Ե������
				$(this).addClass('flip');
				$(this).find('a').css({
					'-webkit-transition':'all 1s',
					'transition':'all 1s'
				})
				SetImg($(this),i);
				one=false;   //ֻ�ܵ��һ��
			};
			return false;
		});
	});
	$start.on('click',function(){
		animatefun(true);
		return false;
	});
	$rest.on('click',function(){
		  //ͼƬ�ļ���ѭ��
		animatefun(false);
		return false;
	});
	var SetImg=function(obj,i){

		obj.find('.back img').attr('src','ossweb-img/1/'+random_old[i]+'.png');  //����ͼƬ
	};
	var animatefun=function(b){
		one=false;   //������ʼ���û������Լ�ѡ
		loopGetArry();
		$card.removeClass('flip cardjap');
		$card.stop().animate({     //����λ��
			'top':'50%',
			'left':'50%',
			'margin-left':-$card.width()/2+'px',
			'margin-top':-($card.height()+13)/2+'px'
		},800,function(){
			$(this).addClass('cardjap');
		});
		setTimeout(function(){
			$card.removeClass('cardjap');
			var r=Math.floor(Math.random()*15);
			$card.each(function(i){
				$(this).stop().animate({
					'left':($(this).width()+13)*(i%5), 
					'top':($(this).height()+13)*(i-(i%5))/5 , 
					'margin-left':'0',
					'margin-top':'0'
				},500,function(){
					SetImg($(this),i);
					if(b!==false){
						$card.removeClass('flip');
						 //�Զ��齱�õ����������
						$card.find('a').css({
							'-webkit-transition':'all 1s',
							'transition':'all 1s'
						})
						$card.eq(r).addClass('flip');//չʾ�õ��ĵ���
					}else{
						one=true; //�����������û������Լ�ѡ��������
					}
				});
			});
		},3000)
	};

	
		






















