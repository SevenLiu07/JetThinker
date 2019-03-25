$(document).ready(function(){
    /**
     * 获取浏览器首屏可视区域高度
     */
    var getHeight = $(window).height();
    var p=0,t=0;  
    console.log(getHeight);
    // banner
    var mySwiper = new Swiper('.swc-banner', {
        autoplay: true,//可选选项，自动滑动
        loop : true,
        //分页器
        pagination: {
            el: '.swp-banner',
            clickable: true,
            bulletClass: 'my-bullet',
            bulletActiveClass: 'my-bullet-active',
        },
        on:{
            init:function(swiper){
                slide=this.slides.eq(0);
                slide.addClass('ani-slide');
            },
            transitionStart: function(){
                for(i=0;i < this.slides.length;i++){
                    slide=this.slides.eq(i);
                    slide.removeClass('ani-slide');
                }
            },
            transitionEnd: function(){
                slide=this.slides.eq(this.activeIndex);
                slide.addClass('ani-slide');
                
            },
        }
    })
    // successfull case
    var swiper = new Swiper('.swc-case', {
        slidesPerView: 4,
        slidesPerColumn: 2,
        spaceBetween: 30,
        pagination: {
            el: '.swp-case',
            clickable: true,
        },
    })
    // product center
    var swiper = new Swiper('.swc-product', {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    })
    /**
     * nav and top scroll
     */
    $(window).scroll(function (event) {
        var bannerHeight=680;
        if($(".banner_box").hasClass("big-banner")){
            bannerHeight=680;
        } else{
            bannerHeight=540;
        }
        
        if ($('html').scrollTop() > bannerHeight) {
            $('.header').css({"background": "rgba(0, 0, 0,1)"});
        } else {
            $('.header').css({"background": "rgba(0, 0, 0,0.3)"});
        }
        /**
         * top scroll
         */
        if($('html').scrollTop() > getHeight){
            //$(".top").css({"display":"block"})
            $(".top").fadeIn(600);
        } else{
            $(".top").fadeOut(600);
        }
        /**
         * 背景图片随滚动条移动
         */
        p = $(this).scrollTop();
        if (t <= p) {
          console.log('down');
          $(".application").css({"animation":"bg-move 2s linear forwards"})
        } else {
          //向上滚
          console.log('up');
          $(".application").css({"animation":"bg-moves 2s linear forwards"})
        }
        setTimeout(function() {
          t = p;
        }, 0);

    })
})
