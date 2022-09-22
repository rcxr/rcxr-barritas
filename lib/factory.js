(function(barritas, $, undefined) {
  barritas.factory = function() {
    var articles = [];

    this.loadArticles = function(file) {
      Papa.parse(file, {
        complete: csv => {
          articles =  csv.data.slice(1).map((row, i) => barritas.article(
            /* id= */ i,
            /* filename= */ row[0].toLowerCase() + ".png",
            /* title= */ row[3],
            /* product= */ row[4],
            /* price= */ row[5],
            /* sku= */ row[6],
            /* icon= */ row[7],
            /* color= */ row[8],
          ));
        },
      });
    };

    this.getArticles = function() { return articles; };
  };
}(window.barritas = window.barritas || {}, jQuery));
