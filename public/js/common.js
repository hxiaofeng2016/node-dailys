$(function(){
    var leftnav = $(".sidebar_inner ul li");
    var loca = window.location.href;
    var index = loca.lastIndexOf("\/");
    loca = loca.substring(index + 1, loca .length);

    if(loca == "write"){
        leftnav.eq(1).addClass('active');
    } else if(loca == "dailys"){
        leftnav.eq(2).addClass('active');
    } else if(loca == "edit"){
        leftnav.eq(3).addClass('active');
    } else if(loca == "alldailys"){
        leftnav.eq(4).addClass('active');
    } else{
        leftnav.eq(0).addClass('active');
    }
    //计算日期
    getDate = window.getDate = function(){
        var date = new Date();
        this.Y = date.getFullYear();
        this.M = date.getMonth()+1 ;
        this.D = date.getDate();
        if(this.M < 10){
            this.M =  0 +"" + this.M;
        }
        if(this.D < 10){
            this.D =  0 +"" + this.D;
        }
        return this.Y + "-" + this.M + "-" + this.D;
    }
    //设置 Cookie
    setCookie = window.setCookie = function(cname,cvalue,exdays){
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname+"="+cvalue+"; "+expires;
    }
    //获取 Cookie
    getCookie = window.getCookie = function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }
});