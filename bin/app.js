$(() => {
  $(".scrape").on("click", () => {
    $.get("/scrape")
    .done(data => {
      alert("Articles scraped!");
      
      $("body").html(data);
    });
  });
});
