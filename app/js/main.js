$(function (){
    $('.dropmenu__input').on('click', function () {
       
        $('.product_content').toggleClass('block-line');
        
    });





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
    var mixer = mixitup('.catalog__list');
    

});