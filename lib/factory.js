(function(barritas, $, undefined) {
  barritas.factory = function() {
    var articles = [];

    this.loadArticles = function(file) {
      Papa.parse(file, {
        complete: csv => {
          articles =  csv.data.slice(1).map(row => barritas.article(
            /* design= */ row[0],
            /* title= */ row[2],
            /* product= */ row[3],
            /* price= */ row[4],
            /* sku= */ row[5]
          ));
        },
      });
    };

    this.getArticles = function() { return articles; };
  };
}(window.barritas = window.barritas || {}, jQuery));
