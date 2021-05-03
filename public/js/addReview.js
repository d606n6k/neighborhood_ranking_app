$(document).ready(function () {
  $(".rating input:radio").attr("checked", false);
  $(".rating input").click(function () {
    $(".rating span").removeClass("checked");
    $(this).parent().addClass("checked");
  });
});

const addReviewHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#new-addReview").value.trim();
  const neighborhood_id = document
    .querySelector("#neighborhood_id")
    .value.trim();
  const rating = $('input[name="rating"]:checked').val();

  if (content && neighborhood_id && rating) {
    const response = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ content, neighborhood_id, rating }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".addReview-form")
  .addEventListener("submit", addReviewHandler);
