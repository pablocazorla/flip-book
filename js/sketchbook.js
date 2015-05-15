pc = {};
pc.sketchbook = {
	init : function(){
		$('.sketchbook').each(function(){
			var $this = $(this),
				$pages = $this.find('>.sk-page'),
				next = 0,
				last = $pages.length,
				$btnPrev = $('<div class="sk-btn sk-btn-prev disabled"></div>'),
				$btnNext = $('<div class="sk-btn sk-btn-next"></div>'),
				$ring = $('<div class="sk-ring"></div>'),
				transitionEvent = (function(){
					    var t,el = document.createElement('fakeelement');
					    	transitions = {
						      'transition':'transitionend',
						      'OTransition':'oTransitionEnd',
						      'MozTransition':'transitionend',
						      'WebkitTransition':'webkitTransitionEnd'
						    }
					    for(t in transitions){
					        if( el.style[t] !== undefined ){
					            return transitions[t];
					        }
					    }
					})(),
				moving = false,
				setupPages = function(){
					$pages.each(function(index){
						var $fases = $(this).append('<div class="sk-shadow"></div>').find('.sk-face');
						$fases.eq(0).addClass('face-front');
						$fases.eq(1).addClass('face-back');
					}).addClass('sk-right').eq(0).addClass('sk-visible');
					$this.addClass('rendered');
				},
				change = function(direction){
					if(!moving){
						var invalidMove = false;
						if((next == last && direction == 1) || (next == 0 && direction == -1)){invalidMove = true;}
						if(!invalidMove){
							moving = true;
							if(direction == 1){
								var aNext = next - 1,
									bNext = next,
									cNext = next + 1,
									$a = $pages.eq(aNext),
									$b = $pages.eq(bNext),
									$c = $pages.eq(cNext);
								$b.removeClass('sk-right sk-visible').addClass('sk-over sk-pos-right sk-right-to-center');
								if(cNext<=last){$c.addClass('sk-visible');}
								setTimeout(function(){
									$b.removeClass('sk-pos-right').addClass('sk-pos-center sk-animated1');
								},100);
								var ends = [
										function(){
											$b.removeClass('sk-right-to-center sk-pos-center sk-animated1').addClass('sk-left-to-center sk-pos-left sk-animated2');
										},
										function(){
											if(aNext>0){$a.removeClass('sk-visible');}
											$b.removeClass('sk-over sk-left-to-center sk-pos-left sk-animated2').addClass('sk-left sk-visible').unbind(transitionEvent);
											next++;
											$btnPrev.removeClass('disabled');
											if(next>=last){$btnNext.addClass('disabled');}
											moving = false;
										}
									],
									endsInd = 0;
								$b.bind(transitionEvent, function() {								
									ends[endsInd]();
									endsInd++;
								});
							}else{
								var aNext = next - 2,
									bNext = next - 1,
									cNext = next,
									$a = $pages.eq(aNext),
									$b = $pages.eq(bNext),
									$c = $pages.eq(next);
								if(aNext>0){$a.addClass('sk-visible');}
								$b.removeClass('sk-left sk-visible').addClass('sk-over sk-pos-left sk-left-to-center');
								setTimeout(function(){
									$b.removeClass('sk-pos-left').addClass('sk-pos-center sk-animated1');
								},100);
								var ends = [
										function(){
											$b.removeClass('sk-left-to-center sk-pos-center sk-animated1').addClass('sk-right-to-center sk-pos-right sk-animated2');
										},
										function(){
											if(cNext<=last){$c.removeClass('sk-visible');}
											$b.removeClass('sk-over sk-right-to-center sk-pos-right sk-animated2').addClass('sk-right sk-visible').unbind(transitionEvent);
											next--;
											$btnNext.removeClass('disabled');
											if(next<=0){$btnPrev.addClass('disabled');}						
											moving = false;
										}
									],
									endsInd = 0;
								$b.bind(transitionEvent, function() {								
									ends[endsInd]();
									endsInd++;
								});
							}	
							
						}
					}
				};

			$this.append($btnPrev).append($btnNext).append($ring);
			$btnPrev.click(function(){
				change(-1);
			});
			$btnNext.click(function(){
				change(1);
			});
			setupPages();		
		});
	}
};
$('document').ready(pc.sketchbook.init());
