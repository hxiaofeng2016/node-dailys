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

});