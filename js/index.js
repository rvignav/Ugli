// render elements to DOM
var renderToDOM = (name, location, ingredients) => {};

// get all restaurant cards and apply column classes
$(".restaurant-card").addClass(
  "col col-sm-6 col-md-4 col-lg-3 shadow card card-body"
);

// quick search regex
var qsRegex;

// init Isotope
var $grid = $(".grid").isotope({
  itemSelector: ".restaurant-card",
  layoutMode: "fitRows",
  filter: function () {
    return qsRegex ? $(this).find(".ingredients").text().match(qsRegex) : true;
  },
});

// use value of ingredient field to filter
var $quicksearch = $("#search-ingredient").keyup(
  debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), "gi");
    $grid.isotope({
      filter: function () {
        if (qsRegex) {
            if (qsRegex2) {
              return (
                $(this).find(".location").text().match(qsRegex2) &&
                $(this).find(".ingredients").text().match(qsRegex)
              );
            } else {
              return $(this).find(".ingredients").text().match(qsRegex);
            }
          } else return true;
      },
    });
  }, 200)
);

var qsRegex2;
// use value of location field to filter
var $quicksearch2 = $("#search-location").keyup(
  debounce(function () {
    qsRegex2 = new RegExp($quicksearch2.val(), "gi");
    $grid.isotope({
      filter: function () {
        if (qsRegex2) {
          if (qsRegex) {
            return (
              $(this).find(".location").text().match(qsRegex2) &&
              $(this).find(".ingredients").text().match(qsRegex)
            );
          } else {
            return $(this).find(".location").text().match(qsRegex2);
          }
        } else return true;
      },
    });
  }, 200)
);

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout(timeout);
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply(_this, args);
    }
    timeout = setTimeout(delayed, threshold);
  };
}
