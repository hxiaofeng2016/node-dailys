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
    //º∆À„»’∆⁄
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
});