$(document).ready(function () {
  // Handle keyup event for live search
  $("#subdivision").on("keyup", function () {
    const query = $(this).val().trim().toLowerCase();

    // Only make the AJAX call if there is a query
    if (query.length > 0) {
      $.ajax({
        url: "/model/search-regions",
        type: "POST",
        data: JSON.stringify({ query: query }),
        contentType: "application/json",
        success: function (data) {
          const searchResults = $("#searchResults");
          searchResults.empty();

          // Populate the dropdown with matching results (limit to 10)
          const limitedResults = data.slice(0, 10);

          limitedResults.forEach((region) => {
            searchResults.append(
              `<li class="list-group-item list-group-item-action text-zinc-400" style="background-color: #ffff; padding: 8px; cursor: pointer; width: 402px; max-width: 405px;">${region}</li>`
            );
          });

          // Show dropdown if there are results
          searchResults.show();

          // Hide dropdown if no results found
          if (data.length === 0) {
            searchResults.hide();
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching regions:", error);
          $("#searchResults").hide();
        },
      });
    } else {
      $("#searchResults").hide();
    }
  });

  // Handle dropdown item selection
  $(document).on("click", "#searchResults li", function () {
    $("#subdivision").val($(this).text());
    $("#searchResults").hide();
  });

  // Hide dropdown if clicking outside
  $(document).click(function (event) {
    if (!$(event.target).closest("#subdivision, #searchResults").length) {
      $("#searchResults").hide();
    }
  });
});
