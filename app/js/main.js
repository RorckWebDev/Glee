$(function (){

    $('.sidebar-title').on('click', function () {
        $(this).siblings('.sidebar-category__dropmenu').slideToggle('slow');
        $(this).siblings('.sidebar-price__form').slideToggle('slow');
        $(this).siblings('.sidebar-brand__inputbox').slideToggle('slow');
      }); 

    $('.menu__btn').on('click', function () {
        $('.header__menu').toggleClass('header__menu--active');
        
    });

    $('.detalis-tabs__top-link').on('click', function(a){
        a.preventDefault();
        $('.detalis-tabs__top-link').removeClass('top-link--active');
        $(this).addClass('top-link--active');

        $('.detalis-tabs__content-box').removeClass('content-box--active');
        $($(this).attr('href')).addClass('content-box--active');
    });
    $('.detalis-slider__inner').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
    });


    $('.detalis-main__images--small').slick({
        vertical: true,
        asNavFor: '.detalis-main__images--big',
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        responsive: [
            {
               breakpoint: 587,
               settings: {
               vertical: false,
            }
            }
         ]
    });
    $('.detalis-main__images--big').slick({
        asNavFor: '.detalis-main__images--small',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        responsive: [
            {
               breakpoint: 767,
               settings: "unslick"
            }
         ]
        
    });
   


    // $('.dropmenu__input').on('click', function () {
    // $('.product_content').toggleClass('block-line');  
    // });

    $('.number-input').styler();



    $(".sidebar-price__form-input").ionRangeSlider({
        type: "double",
        onStart: function (data) 
        {
            $('.sidebar-price__form-from').text(data.from);
            $('.sidebar-price__form-to').text(data.to);
        },
        onChange: function (data)
        {
            $('.sidebar-price__form-from').text(data.from);
            $('.sidebar-price__form-to').text(data.to);
        }
        
    });
    $(".sidebar-recent__info-rating").rateYo({
        readOnly: true,
        starWidth: "11px",
        normalFill: "#d6d6d6",
        ratedFill: "#ffcc00",
      });
    $('.header-slider__item').slick({
        dots:true,
        arrows:false,
        fade: true,
        autoplay: true
    });
    var mixer = mixitup('.catalog__list, .new-design__content-block');
    

});