(function(barritas, $, undefined) {
  var invertColor = function(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    // https://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? "#000000" : "#FFFFFF";
  };

  // Generates the filename to a random temporary image.
  var getTempImage = function() {
    return "img/sin-foto-0" + (Math.floor(Math.random() * 10)) + ".png";
  };

  barritas.label = function(article) {
    // Product.
    var product = $("<div></div>").addClass("label-product text-center").text(article.product);
    // Product details.
    var details = $("<div></div>").addClass("label-details-container d-flex")
      .append($("<div></div>").addClass("label-details-tab text-center").text(article.size))
      .append($("<div></div>").addClass("label-details-gap-container").append($("<div></div>").addClass("label-details-gap-begin").html("&nbsp;")));
    // Add color details if present.
    if (article.color !== null) {
      var color = $("<div></div>").addClass("label-details-color")
        .html("&nbsp;")
        .css("background-color", article.color)
        .css("color", invertColor(article.color));
      details
        .append($("<div></div>").addClass("label-details-gap-container").append($("<div></div>").addClass("label-details-gap-end").html("&nbsp;")))
        .append($("<div></div>").addClass("label-details-tab text-center").append(color));
    }
    // Image.
    var image = $("<div></div>").addClass("label-image-container")
      .append($("<div id=\"" + "img-".concat(article.id) + "\"></div>").addClass("label-image").css("background-image", "url(\"" + getTempImage() + "\")"));
    // Artwork title and QR code.
    var about = $("<div></div>").addClass("label-about-container d-flex")
      .append($("<div></div>").addClass("label-title").text(article.title))
      .append($("<div id=\"" + "qr-".concat(article.id) + "\"></qr>"));
    // Barcode.
    var barcode = $("<div></div>").addClass("label-barcode-container text-center")
      .append($("<svg id=\"" + "barcode-".concat(article.id) + "\"></svg>"));

    // Label container.
    var root = $("<div></div>").addClass("label-container")
      .append(product)
      .append(details)
      .append(image)
      .append(about)
      .append(barcode);

    this.get = function() { return root; };
  };
}(window.barritas = window.barritas || {}, jQuery));
