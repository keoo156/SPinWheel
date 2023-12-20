$(document).ready(function () {
  let element = $(".cube");
  let strBtn = $(".start");
  let newClass = "newCube";
  let loopTime = 0;
  let round;
  let end;

  function addClass(LT, targetIndex) {
    let promiseChain = Promise.resolve();
    loopTime++;

    for (let i = 0; i < element.length; i++) {
      promiseChain = promiseChain.then(() => {
        return new Promise((resolve) => {
          //判斷是否是終點
          if (loopTime === LT && i === targetIndex) {
            alert("end");
            loopTime = 0;
            $(strBtn).prop("disabled", false);
            return;
          }
          setTimeout(function () {
            console.log(i);

            //清除class
            $(element).removeClass(newClass);

            $(element[i]).addClass(newClass);

            resolve();
          }, random($(element[i]).text()));
        });
      });
    }

    if (loopTime <= LT) {
      promiseChain = promiseChain.then(() => addClass(round, end));
    }
  }

  function random(i) {
    return 500 * i;
  }

  $(strBtn).click(function () {
    $(strBtn).prop("disabled", true);
    round = Math.floor(Math.random() * 2) + 1;
    end = Math.floor(Math.random() * element.length - 1) + 1;
    addClass(round, end);
    console.log(round, end);
  });
});

// element.each(function (index, ele) {
//   promiseChain = promiseChain.then(() => {
//     return new Promise((resolve) => {
//       setTimeout(function () {
//         //清除前一個的class
//         $(element).removeClass(newClass);

//         $(ele).addClass(newClass);

//         resolve();
//       }, random($(ele).text()));
//     });
//   });

//   if (index === element.length - 1) {
//     promiseChain = promiseChain.then(() => addClass());
//   }
// });
