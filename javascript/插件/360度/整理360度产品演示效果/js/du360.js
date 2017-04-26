// JavaScript Document
function $(id)
{
	return document.getElementById(id);
}

window.onload=function ()
{
	var oPhoto=$('photo');
	var oSmallPhoto=$('smallphoto');
	var oProg=$('prog');
	var oImg=$('img');
	var oBg=$('bg');
	var iImgCount=36;
	var oTxt=oProg.getElementsByTagName('span')[0];
	var iLoaded=1;
	var iNow=0;
	var scale=10;
	var oBox360=$('box360');
	var oBox360a=oBox360.getElementsByTagName('a')[0];
	var aImg=[];
	var num=0;
	var oImgBig=$('imgBig');
	var oLoading=$('loading');
	for(var i=1; i<=iImgCount+1; i++)
	{
		var oNewImg=new Image();
		oNewImg.onload=function ()
		{
			sacle=Math.ceil(100*iLoaded/iImgCount);
			oTxt.innerHTML=sacle+'%';
			oNewImg.onload=null;			
			if(++iLoaded==iImgCount)onLoad();
		};
		oNewImg.src='images/z3d/small/image '+i+'.jpg';
	}
	function onLoad()
	{
		oProg.style.display=oBg.style.display='none';
		
		oSmallPhoto.onmouseover=function(ev)
		{
			var oEvent=ev||event;
			var disX=oEvent.clientX;
			oSmallPhoto.onmousemove=function(ev)
			{
				var oEvent=ev||event;
				var l=oEvent.clientX-disX;
				var iCur=parseInt(l/20)%iImgCount;
				iNow=iCur>0?iCur:(iImgCount-Math.abs(iCur));
				oImg.src='images/z3d/small/image '+iNow+'.jpg';
				var newNow=0;
				
				if(iNow<10)
				{
					newNow='0'+iNow;
				}
				else
				{
					newNow=iNow;
				}
				
				oImg.setAttribute('index',newNow);				
				oImg.setAttribute('_src','http://video10.360buyimg.com/0/13/341/134178/27693/img/z3d0'+newNow+'.jpg');
			}
			oSmallPhoto.onmouseout=function(ev)
			{
				iNow=num;
			}
		}
		
		/*oImg.onclick=function()
		{
			var _this=this;
			oSmallPhoto.style.display='none';
			oBigPhoto.style.display='block';
			oBox360a.className='active';
			oLoading.style.display = "block";
			
			var bigSrc=_this.getAttribute('_src');
			document.title=bigSrc;
			
			var img = new Image();			
			img.src=decodeURI(bigSrc);
			oImgBig.src=decodeURI(img.src);
			if(img.complete)
			{
				 oLoading.style.display = "none";
				 bigPhoto();
			}
			else
			{
				img.onload=function()
				{
					oImgBig.src=decodeURI(img.src);
					oLoading.style.display = "none";
					bigPhoto();
				}
			}
			oImgBig.style.margin='0px';
			oImgBig.style.left='-150px';
			oImgBig.style.top='-150px';
		}*/
		
		
		function bigPhoto()
		{
			oBigPhoto.onmouseover=function(ev)
			{
				oBigPhoto.onmousemove=function(ev)
				{
					var oEvent=ev||event;
					var l=oEvent.clientX-oPhoto.offsetLeft;
					var t=oEvent.clientY-oPhoto.offsetTop;
					var sacleX=(l/oBigPhoto.offsetWidth).toFixed(2);
					var sacleY=(t/oBigPhoto.offsetWidth).toFixed(2);
					oImgBig.style.margin='0px';
					oImgBig.style.left=-sacleX*(oImgBig.offsetWidth-oBigPhoto.offsetWidth)+'px';
					oImgBig.style.top=-sacleY*(oImgBig.offsetWidth-oBigPhoto.offsetWidth)+'px';
				}
			}
			
			
			oBox360a.onclick=function()
			{
				this.className='';
				oBigPhoto.style.display='block';
				oSmallPhoto.style.display='block';
				oImgBig.src='images/t.gif';
			}
		}
	}
};