Showcase=Class.create(Abstract,{initialize:function(d,e,f){this.allSections=this.sections=d;this.controls=e;this.options=Object.extend({ratio:0.5,initialDelay:1,duration:0.5,size:this.sections.size()},f||{});this.running=false;this.queue=new Array;if(typeof f.divId!='undefined')$(f.divId).show();this.computeMetrics();this.sections=this.allSections.slice(this.currentIndex-this.half,this.currentIndex+this.half+1);this.allSections.each((function(b,c){b.setStyle({position:'absolute',zIndex:Math.abs(c-this.sections.size()),left:'50%',top:'50%',marginLeft:-Math.round(b.getWidth()/2)+'px',marginTop:-Math.round(b.getHeight()/2)+'px'}).initialIndex=c;b.observe('click',this.jump.bind(this)).observe('mouseover',function(a){}).observe('mouseout',function(){}).opacity=1;if(!this.sections.member(b)){this.queue.push(b.hide())}}).bind(this));for(i=0;i<=this.half;i++){this.sections.push(this.sections.shift())}this.controls.invoke('observe','click',this.click.bind(this));(this.animate.bind(this)).delay(this.options.initialDelay)},toggleLastElement:function(a,b){if(b){if(typeof a.lastChild.style==='object'){a.lastChild.style.display='block'}else{a.lastElementChild.show()}}else{if(typeof a.lastChild.style==='object'){a.lastChild.style.display='none'}else{a.lastElementChild.hide()}}},computeMetrics:function(){this.half=this.currentIndex=Math.ceil((this.options.size-1)/2);this.ratioStep=Math.round(((1-this.options.ratio)/this.currentIndex)*100)/100;this.positionStep=Math.round(50/this.half*100)/100;this.maxDimensions=this.sections.first().getDimensions()},click:function(a){a.stop();var b=a.findElement('a');if(!this.running){eval("this."+b.rel+"()")}for(var c=0,_l=this.sections.length;c<_l;c++){var d=this.sections[c];if(c==this.sections.indexOf(a.findElement('li')))this.toggleLastElement(d,1);else this.toggleLastElement(d,0)}this.animate(b.rel)},previous:function(){if(this.options.size<this.allSections.size()){var a=this.queue.shift();var b=this.sections.pop();this.sections.unshift(a);this.queue.push(b.fade({duration:this.options.duration}))}else{this.sections.unshift(this.sections.pop())}},next:function(){if(this.options.size<this.allSections.size()){var a=this.queue.shift();var b=this.sections.shift();this.sections.push(a);this.queue.push(b.fade({duration:this.options.duration}))}else{this.sections.push(this.sections.shift())}},jump:function(a){var b=a.srcElement||a.target;if(b.className=='link'){}else{a.stop()}if(!this.running){var c=this.sections[this.sections.indexOf(a.findElement('li'))];for(var d=0,_l=this.sections.length;d<_l;d++){var e=this.sections[d];if(d==this.sections.indexOf(a.findElement('li')))this.toggleLastElement(e,1);else this.toggleLastElement(e,0)}var f='';if(c.index<this.half){(this.half-c.index).times((function(){this.previous()}).bind(this));f='previous'}else if(c.index==this.half){}else{(c.index-this.half).times((function(){this.next()}).bind(this));f='next'}}this.animate(f)},runEffects:function(){this.stackSections.bind(this).delay(this.options.duration/2);this.running=new Effect.Parallel(this.effects.map(function(a){return new Effect.Parallel([new Effect.Morph(a.section,{style:a.style,sync:true,delay:1,transition:Effect.Transitions.linear}),new Effect.Appear(a.section,{to:Math.min(a.section.ratio,1),sync:true})],{sync:true,beforeStart:function(){}})}),{duration:this.options.duration,afterFinish:(function(){this.running=false;this.toggleLastElement(this.effects[this.half].section,1)}).bind(this)})},stackSections:function(){this.sections.each(function(a){a.setStyle({zIndex:a.stackIndex})})},indexSections:function(){this.sections.each((function(a,b){var c=this.sections.size();if((this.sections.size()%2)===1)c=this.sections.size()-1;a.index=b;a.modifier=Math.abs(Math.abs((a.index-c/2))-this.half);a.ratio=Math.round(((a.modifier*this.ratioStep)+this.options.ratio)*100)/100;a.width=Math.min(Math.round(this.maxDimensions.width*a.ratio),this.maxDimensions.width);a.height=Math.min(Math.round(this.maxDimensions.height*a.ratio),this.maxDimensions.height);a.positionIndex=(a.index-c/2);a.stackIndex=Math.abs(Math.abs((a.index-c/2))-this.half)+1;a.left=a.top=Math.round((this.half+a.positionIndex)*this.positionStep);a.opacity=Math.min(a.ratio,1)}).bind(this))}});Showcase.Horizontal=Class.create(Showcase,{animate:function(c){this.indexSections();this.effects=new Array();this.sections.each((function(a){var b={left:a.left+'%',top:'50%',marginTop:-Math.abs(a.height/2)+'px',width:a.width+'px',height:a.height+'px'};if(a.left==0){b.marginLeft='0px'}else if(a.left==50){b.marginLeft=-Math.round(a.width/2)+'px'}else if(a.left==100){b.marginLeft=-a.width+'px'}else{b.marginLeft=-Math.round(a.width/2)+'px'}this.effects.push({section:a,style:b})}).bind(this));this.currentIndex=this.sections[this.half].initialIndex;this.runEffects()}});Showcase.Vertical=Class.create(Showcase,{animate:function(c){this.indexSections();this.effects=new Array();this.sections.each((function(a){var b={top:a.top+'%',left:'50%',marginLeft:-Math.abs(a.width/2)+'px',width:a.width+'px',height:a.height+'px'};if(a.top==0){b.marginTop='0px'}else if(a.top==50){b.marginTop=-Math.round(a.height/2)+'px'}else if(a.top==100){b.marginTop=-a.height+'px'}else{b.marginTop=-Math.round(a.height/2)+'px'}this.effects.push({section:a,style:b})}).bind(this));this.currentIndex=this.sections[this.half].initialIndex;this.runEffects()}});Showcase.Diagonal=Class.create(Showcase,{animate:function(c){this.indexSections();this.effects=new Array();this.sections.each((function(a){var b={left:a.left+'%',top:a.top+'%',width:a.width+'px',height:a.height+'px'};if(a.left==0){b.marginLeft='0px'}else if(a.left==50){b.marginLeft=-Math.round(a.width/2)+'px'}else if(a.left==100){b.marginLeft=-a.width+'px'}else{b.marginLeft=-Math.round(a.width/2)+'px'}if(a.top==0){b.marginTop='0px'}else if(a.top==50){b.marginTop=-Math.round(a.height/2)+'px'}else if(a.top==100){b.marginTop=-a.height+'px'}else{b.marginTop=-Math.round(a.height/2)+'px'}this.effects.push({section:a,style:b})}).bind(this));this.currentIndex=this.sections[this.half].initialIndex;this.runEffects()}});