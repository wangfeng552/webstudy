function settab(name,cursel,n)
{
	for(i=1;i<=n;i++)
	{
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
	for(i=1;i<=n;i++)
	{
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i+1);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
	for(i=1;i<=n;i++)
	{
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i+2);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
}