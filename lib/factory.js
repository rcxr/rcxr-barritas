(function(barritas, $, undefined) {
  barritas.factory = function() {
    var articles = [];

    this.loadArticles = function(file) {
      Papa.parse(file, {
        complete: csv => {
          articles =  csv.data.slice(1).map(row => barritas.article(
            row[0], "img/rcxr/" + row[1] + ".png", row[2], row[3], row[4]
          ));
        },
      });
    };

    this.getArticles = function() { return articles; };
  };
}(window.barritas = window.barritas || {}, jQuery));
