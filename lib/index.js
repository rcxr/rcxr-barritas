$(function() {
  var factory = new barritas.factory();
  $("#file").change(function(event) {
    var file = event.target.files[0];
    if (!file) return;

    factory.loadArticles(event.target.files[0]);
  });
  $("#images").change(function(event) {
    Array.from(event.target.files).forEach(file => {
      factory.getArticles()
        .filter(article => article.filename === file.name.toLowerCase())
        .forEach(article => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 180,
            useWebWorker: true,
          };
          imageCompression(file, options)
            .then(function (miniFile) {
              const url = URL.createObjectURL(miniFile);
              $("#img-".concat(article.id)).attr("src", url);
            })
            .catch(function (error) {
              console.error(error.message);
            });
        });
    });
  });
  $("#run").click(function() {
    $("#labels").empty();
    factory.getArticles().forEach((article, i) => {
      if (i % 10 === 0) {
        $("#labels").append($("<div></div>").addClass("blank"));
      }
      var label = new barritas.label(article);
      $("#labels").append(label.get());
      JsBarcode("#barcode-".concat(i), article.sku, {
        margin: 0,
        height: 64,
        displayValue: false,
      });
    });
  });
});
