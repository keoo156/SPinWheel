$(document).ready(function () {
  let element = $(".cube");
  let strBtn = $(".start");
  let newClass = "newCube";
  let end; //設定要走幾步

  // function spinWheel(LT, targetIndex) {
  //   let promiseChain = Promise.resolve();
  //   loopTime++;

  //   for (let i = 0; i < element.length; i++) {
  //     promiseChain = promiseChain.then(() => {
  //       return new Promise((resolve) => {
  //         //判斷是否是終點
  //         if (loopTime === LT && i === targetIndex) {
  //           alert("end");
  //           loopTime = 0;
  //           //啟動按鈕
  //           $(strBtn).prop("disabled", false);
  //           return;
  //         }

  //         if (loopTime === LT && i >= targetIndex - 3) {
  //           setClass(i, 2000, resolve);
  //         } else {
  //           setClass(i, 1000, resolve);
  //         }
  //       });
  //     });
  //   }
  //   //判斷圈數
  //   if (loopTime <= LT) {
  //     promiseChain = promiseChain.then(() => spinWheel(round, end));
  //   }
  // }

  async function spinWheel(targetIndex) {
    let spinTime = 0;
    let index = 0;

    while (spinTime < targetIndex) {
      await new Promise((resolve) => {
        if (spinTime >= targetIndex - 3) {
          setClass(index, 1000, resolve);
        } else {
          setClass(index, 500, resolve);
        }
        index++;
        spinTime++;

        if (index === element.length) {
          index = 0;
        }
      });
    }
  }

  function setClass(i, time, resolve) {
    setTimeout(function () {
      //清除不要的class
      $(element).removeClass(newClass);
      //
      $(element[i]).addClass(newClass);
      resolve();
    }, time);
  }

  $(strBtn).click(function () {
    //讓按鈕失效
    $(strBtn).prop("disabled", true);

    end = Math.floor(Math.random() * (15 - 8 + 1)) + 5;
    spinWheel(end).then(() => {
      setTimeout(() => {
        alert("結束");
        $(strBtn).prop("disabled", false);
        $(element).removeClass(newClass);
      }, 1000);
    });

    console.log(end);
  });
});
