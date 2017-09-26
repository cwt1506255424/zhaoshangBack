var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
function pullDownAction () {
    $("#header").css({"display":"none"});
    $("#scrollerTop").css({"zIndex":1});

    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 2000);	// <-- Simulate network congestion, remove setTimeout from production!
}
function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');
		var str="";
		str+='<h3 class="title">任务达人</h3> <img class="banner" src="images/task.png"/> <div class="task"> <a href="#" class="over"><h3>邀请好友</h3><span>免费得爱奇艺会员卡</span><img src="images/task1.png"/> </a> <a href="#" class="over"><h3>ELLE井柏然卡</h3><span>0元领990元大牌钱包</span><img src="images/task2.png"/> </a> <a href="#" class="over"><h3>白金分期卡</h3><span>大波礼品"求抱走"</span><img src="images/task3.png"/></a> </div>';
		for (i=0; i<3; i++) {
			li = document.createElement('section');
			li.className="task_box";
			li.innerHTML = str;
			el.appendChild(li, el.childNodes[0]);
		}
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 800);	// <-- Simulate network congestion, remove setTimeout from production!
}
function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		//useTransition: true,//iScroll使用CSS transition来实现动画效果（动量和弹力）
		topOffset: pullDownOffset,
		checkDOMChanges: true,
		edgeRestorePrevent: true,
        mouseWheel:true,//允许滚轮事件
        /*scrollbars: true,			//显示滚动条
		fadeScrollbars:false,		//滚动条淡入淡出
		interactiveScrollbars:true,		//用户是否可以拖动滚动条
		probetype:2,*/
		//更新iscroll
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '轻轻下拉，刷新精彩…';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '轻轻上拉，刷新精彩…';
			}
            $("#header").css({"display":"block"});
            $("#scrollerTop").css({"zIndex":0});
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '轻轻上拉，刷新精彩…';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '轻轻下拉，刷新精彩…';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '该放手了，我要刷新啦…';
				//this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '该放手了，我要刷新啦…';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '努力刷新中…';
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '努力刷新中…';
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

function handler () {
	//顶部固定导航栏背景色透明度变化
	var top = $("#headline").offset().top; //获取指定位置
	var scrollTop = $(window).scrollTop();  //获取当前滑动位置
	//console.log("top"+top);
	//console.log("scrollTop"+scrollTop);
	if(scrollTop > top){                 //滑动到该位置时执行代码
		$("header").addClass("active");
	}else{
		$("header").removeClass("active");
	}
}
document.addEventListener('mousewheel', handler, {passive: false});
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);