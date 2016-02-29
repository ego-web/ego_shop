$(document).ready(function() {

// module declaring
var myModule = (function() {

  // Module initialization
  var init = function() {
    _setUpListener();
  };

  // Set up listerters
  var _setUpListener = function() {
    $('.slideshow__pic').on('click', _slideShow);
    $('.sidebar__filter__item-trigger').on('click', _accordion);
    $('.clear__button').on('click', _clearCheckboxes);
    $('.catalog__view__icons__link-list').on("click", _catalogListView);
    $('.catalog__view__icons__link-list-2').on("click", _catalogListView2);
    $('.catalog__view__icons__link-grid').on("click", _catalogGridView);
  };

  var _catalogGridView = function(e) {
    e.preventDefault();
    $('.goods__desctription').hide();
    $('.articul').hide();
    $('.goods_price__add_button').hide();
    $('.goods__list__item').addClass('grid__view');
    $('.slideshow').css({
      'width': '100%'
    });
    $('.goods__desctription__table_view').show();
    $('.goods__list__item__short').hide();
    $('.slideshow').show();
    $('.goods__list__item_wrapper').css('padding', '10px 13px');
  };

  var _catalogListView2 = function(e) {
    e.preventDefault();
    $('.goods__desctription').show();
    $('.articul').show();
    $('.goods_price__add_button').show();
    $('.goods__list__item').removeClass('grid__view');
    $('.slideshow').css({
      'width': '24.4952%'
    });
    $('.goods__desctription__table_view').hide();
    $('.goods__list__item__short').hide();
    $('.slideshow').show();
    $('.goods__list__item_wrapper').css('padding', '10px 13px');
  };

  var  _catalogListView = function(e) {
    e.preventDefault();
    $('.goods__list__item__short').show();
    $('.slideshow').hide();
    $('.articul__short').show();
    $('.goods__desctription__table_view').hide();
    $('.goods__desctription').hide();
    $('.goods_price__add_button').hide();
    $('.goods__list__item').removeClass('grid__view');
    $('.goods__list__item_wrapper').css('padding', '5px 5px');
  };

  // clear checkboxes
  var _clearCheckboxes = function(e) {
    e.preventDefault();
    $(this)
      .closest('ul')
      .find('input:checkbox')
      .removeAttr('checked');
  };

  // accordion
  var _accordion = function(e) {
    e.preventDefault();
    var $this = $(this),
      arrow = $(this).children('.arrow'),
      item = $this.closest('.sidebar__filter__item'),
      list = $this.closest('.sidebar__filter__list'),
      items = list.find('.sidebar__filter__item'),
      content = item.find('.sidebar__filter__inner__list'),
      otherContent = list.find('.sidebar__filter__inner__list'),
      duration = 300;
    content.stop(true, true).slideToggle(duration);
    arrow.toggleClass("arrow__block__closed arrow__block__opened");
  };

  // slideshow for catalog section
  var _slideShow = function(e) {
    e.preventDefault();
    var $this = $(this),
      item = $this.closest('.slideshow__item'),
      container = $this.closest('.goods__list__item_wrapper'),
      display = container.find('.slideshow__display'),
      path = item.find('img').attr('src'),
      duration = 300;
    if (!item.hasClass('active')) {
      item.addClass('active').siblings().removeClass('active');
      display.find('img').fadeOut(duration, function() {
        $(this).attr('src', path).fadeIn(duration);
      });
    }
  };

  // Columnizer
  $('.infoblock__paragraph').addClass('dontsplit');
  $('.infoblock__text').columnize({
    columns: 2
  });

  // select menu for catalog header
  $(".select-by__list").select2({
    minimumResultsForSearch: 1 / 0
  });

  // price filter in accordeon
  $("#slider").slider({
    max: 13000,
    min: 0,
    values: [0, 13000],
    range: true,
    orientation: 'horisontal',
    animate: "fast",
    slide: function(event, ui) {
      $("#min").val(ui.values[0]);
      $("#max").val(ui.values[1]);
    }
  });

  $('#min').on('change', function() {
    var minValue = $('#min').val();
    var maxValue = $('#max').val();
    if (parseInt(minValue) > parseInt(maxValue)) {
      $('#min').val(maxValue);
    }
    if (parseInt(minValue) > 13000) {
      $('#min').val(13000);
      $('#max').val(13000);
    }
    if (minValue.length === 0) {
      $('#min').val(0);
    }
    $("#slider").slider("values", 0, minValue);
  });

  // prevent maxValue to be smaller than minValue,  or maxValue input to be empty, or maxValue to be bigger than 13 000
  $('#max').on('change', function() {
    maxDefault = 13000;
    var minValue = $('#min').val();
    var maxValue = $('#max').val();
    if (maxValue > maxDefault) {
      $('#max').val(maxDefault);
    }
    if (maxValue.length === 0) {
      $('#max').val(maxDefault);
    }
    if (parseInt(minValue) > parseInt(maxValue)) {
      maxValue = minValue;
      $("#max").val(maxValue);
    }
    $("#slider").slider("values", 1, maxValue);
  });

  // prevent user putting non integer symbols into inputs
  $('#min').on('keypress', function(ev) {
    var minValue = $('#min').val();
    if (ev.which < 48 || ev.which > 57) {
      return false;
    } else {
      $("#slider").slider("values", 0, minValue);
    }
  });

  $('#max').on('keypress', function(ev) {
    if (ev.which < 48 || ev.which > 57)
      return false;
  });

  return {
    init: init
  };

})();

myModule.init();

});
