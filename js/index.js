  $(function(){
    $(window).on('mousedown',false);
  function makePoker(){
  	var colors=['h','s','c','d'];
  	var poker=[];  //[{color:h,number:3},{},{}..]
  	var biao={};
  	while(poker.length!=52){
  		
  		var n=Math.ceil(Math.random()*13);
  		var c=colors[Math.floor(Math.random()*4)];
  		var v={
  			color:c,
  			number:n
  		}
  		if(!biao[c+n]){
  			poker.push(v);
  			biao[c+n]=true;
  		}
  	}
  	return poker;
  }
  function setPoker(poker){
      var dict={
  		1:'A',
  		2:2,
  		3:3,
  		4:4,
  		5:5,
  		6:6,
  		7:7,
  		8:8,
  		9:9,
  		10:'T',
  		11:'J',
  		12:'Q',
  		13:'K'
  	  }	
  	var index=0
  	for (var i = 0,poke; i < 7; i++) {
  		for (var j = 0; j <i+1 ; j++) {
  			poke=poker[index];
  			index++;
              $('<div>')
              .attr({'data-number':poke.number,id:i+"_"+j})
              .addClass('pai')
              .appendTo($('.scene'))
              .css('background-image','url(image/'+dict[poke.number]+poke.color+'.png)')
              .delay(i*30).animate({top:i*40,left:(6-i)*65+j*130+50,opacity:1},500)
  		};
  	};
    var index2=1;
  	//.attr('data-number',poker[index].number)
  	for (;index<poker.length; index++){
      index2++;
  		$('<div>').attr({'data-number':poker[index].number,id:index2})
                .addClass('pai left').appendTo($('.scene'))
                .css('background-image','url(image/'+dict[poker[index].number]+poker[index].color+'.png)')
                .delay(index*30).animate({top:420,left:245,opacity:1},500)
  	}
  }
   //点击开始
   var flag=true;
   $('.btn').click(function(){
    if(flag){
      setPoker(makePoker());
      $('.move-left').delay(500).fadeIn();
      $('.move-right').delay(500).fadeIn();
      flag=!flag;
    }
   })
    //右移
      var zIndex=1;
    var moveright=$('.scene .move-right');
  moveright.on('click',(function(){
    	return function(){
    	if($('.left').length){
        $('.left').last().css('z-index',zIndex++)
        .animate({left:635}).queue(function(){
        	$(this).removeClass('left').addClass('right').dequeue()
        })
      }
      }
    }) () 
  )
    //左移
    var number1=0;
    var moveleft=$('.scene .move-left');
  moveleft.on('click',(function(){
    	return function(){
    		
    	if($('.left').length){
    		return;
    	}
      number1++;
      if(number1>=3){
        alert('游戏结束')
      	return;
      }
    	$('.right').each(function(i){
         $(this).delay(i*130).css('z-index',0)
         .animate({left:245}).queue(function(){
         	$(this).removeClass('right').addClass('left').dequeue()
         })
    	})
    }
    }) ()
  )
    //点击
   
  function getNumber(el){
  	return parseInt($(el).attr('data-number'));
  }  
  function isCanClick(el){
  	var x=parseInt($(el).attr('id').split('_')[0]);
  	var y=parseInt($(el).attr('id').split('_')[1]);//x_y
      if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
      	return false;
      }else{
      	return true;
      }
  }
     var prev;
    $('.scene').on('click','.pai',function(){
    	if($(this).attr('id')&&!isCanClick(this)){
    		return;
    	}
      

    	var number=getNumber(this);
    	//点到13直接消失
    	if(number==13){
            $(this)
            .animate({
              top:0,
              left:700
            })
            .queue(function(){
              $(this).detach().dequeue();
            });
            return;
          }

          if(prev){
            //第二个数非13的情况
            if (getNumber(prev)+getNumber(this)==13) {
              prev.add(this)
              .animate({
                top:0,
                left:700
              })
              .queue(function(){
                $(this).detach().dequeue();
              })
            }else{
                if($(this).attr('id')==prev.attr('id')){$(this).animate({top:'+=20'})}else{
              $(this).animate({top:'-=20'}).animate({top:'+=20'}) 
              prev.delay(400).animate({top:'+=20'})
             }
            }
            prev=null;
          }else{
            //第一个数非13
            prev=$(this);
            $(this).animate({top:'-=20'});
            
          }
      })
  	 

  })