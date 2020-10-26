$(function () {
    // update vg function
    $(".updatevg").on("click", function (event) {
      event.preventDefault();
      var id = $(this).data("vgid");
      // eat ajax call
      $.ajax("/api/update/" + id, {
        type: "PUT"
      }).then(
        function () {
          // console.log("Moved ", id);
          location.reload();
        }
      );
    });
    // delete vg function
    $(".delete").on("click", function (event) {
      event.preventDefault();
      // console.log("WORKING");
      var id = $(this).data("deleteid");
      // trash ajax call
      $.ajax("/api/delete/" + id, {
        type: "DELETE"
      }).then(
        function () {
          // console.log("Deleted ", id);
          location.reload();
        }
      );
    });
    // add vg function
    $("#addvg").on("submit", function (event) {
      event.preventDefault();
      var vg = {
        name: $("#add-vg").val().trim()
      };
  
      if (/^[A-Za-z ]+$/.test(vg.name)) {
        // add ajax call
        $.ajax("/api/add/", {
          type: "POST",
          data: vg
        }).then(
          function () {
            // console.log("Added vg ", vg.name);
            location.reload();
          }
        );
      }
      else{
        alert("No numbers or special characters please!");
        $("#add-vg").val(" ");
      }
    });
  });