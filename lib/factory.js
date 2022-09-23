(function(barritas, $, undefined) {
  barritas.factory = function() {
    var articles = [];

    this.loadArticles = function(file) {
      Papa.parse(file, {
        complete: csv => {
          articles =  csv.data.slice(1).map((row, i) => barritas.article(
            /* id= */ i,
            /* title= */ row[0].toLowerCase(),
            /* filename= */ row[1],
            /* product= */ row[2],
            /* price= */ row[3],
            /* sku= */ row[4],
            /* type= */ row[5].toLowerCase(),
            /* color= */ row[6],
          ));
        },
      });
    };

    this.getArticles = function() { return articles; };
  };
}(window.barritas = window.barritas || {}, jQuery));
