import moment from "moment";
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import "bootstrap";
require("@babel/polyfill");
let settings = {
  async: true,
  crossDomain: true,
  url: "https://frontendspring20-e4cd.restdb.io/rest/trelloclone",
  method: "GET",
  headers: {
    "content-type": "application/json",
    "x-apikey": "5e956ffd436377171a0c230f",
    "cache-control": "no-cache",
  },
};
// let jsondata = settings;
// let posting = {
//   async: true,
//   crossDomain: true,
//   url: "https://frontendspring20-e4cd.restdb.io/rest/trelloclone",
//   method: "POST",
//   headers: {
//     "content-type": "application/json",
//     "x-apikey": "5e956ffd436377171a0c230f",
//     "cache-control": "no-cache",
//   },
//   processData: false,
//   data: JSON.stringify(jsondata),
// };

let i = 0;
$(document).ready(function () {
  $("#addNew").click(function () {
    $("#addNewTask").modal("toggle");
  });

  $.get(settings).done(function (response) {
    showTasks(response);
  });
  //   $.ajax(posting).done(function (data) {
  //     console.log(data);

  //     showTasks(data);
  //   });
  function showTasks(tasks) {
    let pattern = $("template");
    $.each(tasks, function () {
      let node = pattern.prop("content");
      let cardID = $(node).find("#cardcontainer");
      let name = $(node).find(".card-title");
      let priority = $(node).find(".priority");
      let date_added = $(node).find(".card-text > .date_added");
      let estimate = $(node).find(".card-text > .estimate");
      let deadline = $(node).find(".card-text > .deadline");
      let moveRight = $(node).find(".btns_container > .movebtns > .mvright");
      //console.log(this.date_added);
      cardID.data(this._id);
      name.text(this.task_name);
      priority.text(this.priority);
      date_added.text(moment(this.date_added).fromNow());
      estimate.text("ETC: " + this.estimate);
      deadline.text("Due: " + moment(this.deadline).format("DD/MM/YYYY"));
      moveRight.click(previous(this._id));
      $("#todoList > .list").append(pattern.html());
    });
  }
  function previous(id) {
    let card = $(`#cardcontainer[data-id='${id}']`);
    let lists = $(".list");
    i++;
    if (i === lists.length) {
      i = 0;
    }
    lists[i].append(card.html());
  }
});
