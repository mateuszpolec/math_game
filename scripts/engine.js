//Game section.

const mathMarks = ["+", "-", "*"];

const game = {
  level: 0,
  score: 0,
  time: 15,
  total_extra_time: 0,
  total_minus_time: 0,
  correct_answer: 0,
  wrong_answer: 0,
  timer: () => {
    setInterval(function() {
      game.time--;
      $("#countdown").html(game.time);
      game.check_timer();
    }, 1000);
  },
  check_timer: () => {
    if (game.time <= 0) {
      $("#game-run").css("display", "none");
      $("#game-summary").css("display", "flex");
      $("#score").html(game.score);
      $("#total_extra_time").html("+" + game.total_extra_time + " seconds");
      $("#total_minus_time").html("-" + game.total_minus_time + " seconds");
      $("#correct_answer").html(game.correct_answer);
      $("#wrong_answer").html(game.wrong_answer);
    }
  },
  restart: () => {
    game.level =  0;
    game.score =  0;
    game.time = 16;
    game.total_extra_time = 0;
    game.total_minus_time = 0;
    game.correct_answer = 0;
    game.wrong_answer = 0;
    $("#countdown").html(game.time);
  }
};

class Equation {
  constructor(a, mark, b) {
    this.a = a;
    this.b = b;
    this.mark = mark;
  }

  get solve() {
    return this.a + this.mark + this.b;
  }
}

var equation = () =>
  new Equation(
    Math.floor(Math.random() * 10, 1),
    mathMarks[Math.floor(Math.random() * mathMarks.length)],
    Math.floor(Math.random() * 10, 1)
  );

let equationInstance = equation().solve;
$("#equation").html(equationInstance);
$("#countdown").html(game.time);

$("#userInput").keypress(function(e) {
  e = window.event;
  if (e.keyCode == "13") {
    if ($("#userInput").val() == eval(equationInstance)) {
      equationInstance = equation().solve;
      $("#equation").html(equationInstance);
      game.time += +2;
      game.correct_answer += 1;
      game.total_extra_time += 2;
      game.score = game.score + 50 + 0.25 * game.time;
      game.check_timer();
      $("#countdown").html(game.time);
      $("#extratime").html("+2");
      $("#extratime").css("color", "#15d13b");
      $("#userInput").val("");
      setTimeout(function() {
        $("#extratime").html("");
      }, 750);
    } else {
      console.log("Wrong ans");
      game.time += -2;
      game.wrong_answer += 1;
      game.total_minus_time += 2;
      game.check_timer();
      $("#extratime").html("-2");
      $("#extratime").css("color", "#8a0707");
      $("#countdown").html(game.time);
      $("#userInput").val("");
      setTimeout(function() {
        $("#extratime").html("");
      }, 750);
    }
  }
});

//Jquery section.

$("#rules").click(function() {
  $("#intro").css("display", "none");
  $("#rules-section").css("display", "flex");
});

$("#rules-back").click(function() {
  $("#rules-section").css("display", "none");
  $("#intro").css("display", "");
});

$("#game-start").click(function() {
  $("#intro").css("display", "none");
  $("#game-run").css("display", "flex");
  game.timer();
});

$("#game-restart").click(function() {
  $("#game-run").css("display", "flex");
  $("#game-summary").css("display", "none");
  game.restart();
});
