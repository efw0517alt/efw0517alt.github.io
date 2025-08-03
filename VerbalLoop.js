document.addEventListener("DOMContentLoaded", () => {
  const selectors = ["key", "door", "fan", "water", "final"];
  const eye = document.getElementById("eye");
  const elements = {};
  var actions = 0;
  var textID = 0;
  var yellowAnger = 0;
  var pissed = 0;
  var yellowTrigger = false;
  var unYellowNextTurn = false;
  var humidityTrigger = false;
  var eyeTrigger = false;
  const himText = [
    "LET US BEGIN",
    "DO YOU SEE NOW? THE FUTILITY OF IT ALL?",
    "AS LONG AS I PERSIST, YOU CANNOT WIN.",
    "IT'S BEAUTIFUL, IS IT NOT?",
    "US, HERE, FOREVER, TRYING TO OUTWIT ONE ANOTHER?",
    "THIS SPACE. THIS VOID. IT'S BEEN SO LONG SINCE I'VE SEEN ANOTHER.",
    "I CAN CREATE ANYTHING, BUT WHAT'S THE POINT WITHOUT A FRIEND?",
    "DO YOU LIKE THE GAME PIECES? ARE THEY 'NOSTALGIC'? IS THAT STILL ALL THE RAGE?",
    "IT'S BEEN SO LONG. I DON'T EVEN HAVE A FACE ANYMORE.",
    "I AM THIS PLACE, AND THIS PLACE IS ME.",
    "HOW DID YOU END UP HERE?",
    "",
    "YOUR SKIN IS LOOKS SO <BR> SOFT.",
    "I WILL ENJOY IT.",
    "YOU AND ME, HERE",
    "FOREVER",
  ];

  for (const id of selectors) {
    elements[id] = document.getElementById(id);
  }
  elements["final"].addEventListener("change", () => {
    window.location.href = "ending.html";
  });

  for (const id of selectors) {
    elements[id].addEventListener("change", () => {
      computerMove(id);
      textHandler();
      yellowCheck();
      actionSound();
      updateGraphis();
      vaporGrow();
      if (
        elements["key"].value == "yellow" ||
        elements["door"].value == "yellow"
      ) {
        yellowAnger++;
        unYellowNextTurn = true;
        console.log(yellowAnger);
      }
    });
  }

  //eye click
  eye.addEventListener("click", () => {
    const laughAudio = document.getElementById("laughAudio");
    const defeatAudio = document.getElementById("defeatAudio");
    laughAudio.play();
    const textBox = document.getElementById("himText");
    if (pissed == 0) {
      laughAudio.play();
      textBox.innerHTML =
        "AS LONG AS I AM OF SOUND MIND, THAT ACTIONS IS USELESS.";
    }
    if (pissed == 1) {
      laughAudio.play();
      textBox.innerHTML = "THAT STILL WON'T WORK! YOU IMBECILE!";
    }
    if (pissed == 2) {
      const textBox = document.getElementById("himText");
      textBox.innerHTML = "STOP IT";
      eye.src = "eye12.gif";
      const leftHand = document.getElementById("leftHand");
      const rightHand = document.getElementById("rightHand");
      leftHand.src = "handfast.gif";
      rightHand.src = "handfast.gif";
      defeatAudio.play();
      elements["final"].classList.remove("hide");
    }
  });

  //enemy ai
  function computerMove(humanChangedId) {
    const key = elements["key"].value;
    const door = elements["door"].value;
    const fan = elements["fan"].value;
    const water = elements["water"].value;
    //boss gets pissed off because he hates yellow;
    if (unYellowNextTurn && yellowTrigger == false) {
      unYellowNextTurn = false;
      if (humanChangedId != "key") {
        if (elements["door"].value != "red") {
          elements["key"].value = "red";
          return;
        } else {
          elements["key"].value = "blue";
          return;
        }
      } else {
        if (elements["key"].value != "blue") {
          elements["door"].value = "blue";
          return;
        } else {
          elements["door"].value = "red";
          return;
        }
      }
    }

    if (key == door) {
      yellowAnger = 0;
      if (humanChangedId != "door") {
        switch (elements["key"].value) {
          case "blue":
            elements["door"].value = "red";
            return;
          case "red":
            elements["door"].value = "green";
            return;
          case "green":
            elements["door"].value = "purple";
            return;
          case "purple":
            elements["door"].value = "blue";
            return;
          case "yellow":
            elements["door"].value = "blue";
            return;
        }
      } else {
        switch (elements["door"].value) {
          case "red":
            elements["key"].value = "blue";
            return;
          case "blue":
            elements["key"].value = "green";
            return;
          case "green":
            elements["key"].value = "purple";
            return;
          case "purple":
            elements["key"].value = "red";
            return;
          case "yellow":
            elements["key"].value = "red";
            return;
        }
      }
    }

    if (humanChangedId != "fan") {
      //if water isn't frozen, sucks everything away
      if (elements["fan"].value == "on" && elements["water"].value != "+0") {
        elements["fan"].value = "reversed";
        return;
      }
      //avoids moisture when fan is off
      if (elements["fan"].value == "off" && elements["water"].value == "+2") {
        elements["fan"].value = "reversed";
        return;
      }
    }
    if (humanChangedId != "water") {
      //freezez water if fan is on
      if (elements["fan"].value == "on" && elements["water"].value != "+0") {
        elements["water"].value = "+0";
        return;
      }
      //avoids moisture if fan is off
      if (elements["fan"].value == "off" && elements["water"].value == "+2") {
        elements["water"].value = "+1";
        return;
      }
    }
    //default actions for when you do something  and that doesn't result in progress
    if (humanChangedId != "fan" && elements["fan"].value == "reversed") {
      elements["fan"].value = "off";
    }
    if (humanChangedId != "door") {
      switch (elements["door"].value) {
        case "blue":
          if (elements["key"].value != "red") {
            elements["door"].value = "red";
          } else {
            elements["door"].value = "green";
          }
          return;
        case "red":
          if (elements["key"].value != "green") {
            elements["door"].value = "green";
          } else {
            elements["door"].value = "purple";
          }
          return;
        case "green":
          if (elements["key"].value != "purple") {
            elements["door"].value = "purple";
          } else {
            elements["door"].value = "blue";
          }
          return;
        case "purple":
          if (elements["key"].value != "blue") {
            elements["door"].value = "blue";
          } else {
            elements["door"].value = "red";
          }
          return;
        case "yellow":
          if (elements["key"].value != "blue") {
            elements["door"].value = "blue";
          } else {
            elements["door"].value = "red";
          }
          return;
      }
    }
  }

  function yellowCheck() {
    eye.src = "eye.gif";
    if (yellowTrigger == false) {
      switch (yellowAnger) {
        case 1:
          eye.src = "eye2.gif";
        case 2:
          eye.src = "eye3.gif";
        case 3:
          eye.src = "eye4.gif";
        case 4:
          eye.src = "eye5.gif";
        case 5:
          eye.src = "eye6.gif";
        case 6:
          eye.src = "eye7.gif";
        case 7:
          eye.src = "eye8.gif";
        case 8:
          eye.src = "eye9.gif";
        case 9:
          eye.src = "eye10.gif";
      }
    }
    if (yellowAnger >= 10 && yellowTrigger == false) {
      eye.src = "eye.gif";
      yellowTrigger = true;
      const leftHand = document.getElementById("leftHand");
      const rightFiller = document.getElementById("rightFiller");

      pissed++;
      alert(
        "STOP! THAT'S MY LEAST FAVORITE COLOR! HAVEN'T YOU NOTICED I HAVEN'T BEEN PICKING IT AT ALL? STOP RUINING THIS!"
      );

      leftHand.classList.remove("hide");
      rightFiller.classList.remove("hide");
    }
  }
  //aesthetic crap
  function updateGraphis() {
    const key = elements["key"].value;
    const door = elements["door"].value;
    const fan = elements["fan"].value;
    const water = elements["water"].value;
    const keyPiece = document.getElementById("keyPiece");
    const doorPiece = document.getElementById("doorPiece");
    const fanPiece = document.getElementById("fanPiece");
    const waterPiece = document.getElementById("waterPiece");
    //console.log(key);
    keyPiece.src = `key${key}.png`;
    doorPiece.src = `door${door}.png`;
    if (fan == "on") {
      keyPiece.classList.add("keyOn");
      keyPiece.classList.remove("keyOff");
      keyPiece.classList.remove("keyReverse");
      doorPiece.classList.remove("doorPaddingOff");
      fanPiece.classList.add("fanPaddingOff");
      waterPiece.classList.add("waterOn");
      waterPiece.classList.remove("waterOff");
      waterPiece.classList.remove("waterReverse");

      if (water == "+0") {
        waterPiece.src = "ice.png";
      } else if (water == "+1") {
        waterPiece.src = "vapor.png";
      } else {
        waterPiece.src = "water.png";
      }
      fanPiece.src = "fanon.png";
    } else if (fan == "off") {
      keyPiece.classList.add("keyOff");
      keyPiece.classList.remove("keyOn");
      keyPiece.classList.remove("keyReverse");
      doorPiece.classList.add("doorPaddingOff");
      fanPiece.classList.add("fanPaddingOff");
      waterPiece.classList.remove("waterOn");
      waterPiece.classList.add("waterOff");
      waterPiece.classList.remove("waterReverse");

      if (water == "+0") {
        waterPiece.src = "water.png";
      } else if (water == "+1") {
        waterPiece.src = "ice.png";
      } else {
        waterPiece.src = "vapor.png";
      }
      fanPiece.src = "fan.png";
    } else {
      keyPiece.classList.remove("keyOff");
      keyPiece.classList.remove("keyOn");
      keyPiece.classList.add("keyReverse");
      doorPiece.classList.add("doorPaddingOff");
      fanPiece.classList.remove("fanPaddingOff");
      waterPiece.classList.remove("waterOn");
      waterPiece.classList.remove("waterOff");
      waterPiece.classList.add("waterReverse");
      if (water == "+0") {
        waterPiece.src = "vapor.png";
      } else if (water == "+1") {
        waterPiece.src = "water.png";
      } else {
        waterPiece.src = "ice.png";
      }
      fanPiece.src = "fanreverse.png";
    }
  }
  function textHandler() {
    const textBox = document.getElementById("himText");
    const laughAudio = document.getElementById("laughAudio");

    actions++;
    if (actions % 5 == 0) {
      textID++;
      laughAudio.play();
    }
    textBox.innerHTML = himText[textID];
  }
  //audio
  function actionSound() {
    const actionsAudio = document.getElementById("actionAudio");
    actionsAudio.play();
  }

  const waterPiece = document.getElementById("waterPiece");

  function vaporGrow() {
    clearTimeout();
    const fan = elements["fan"].value;

    waterPiece.classList.remove("vaporGrowth");

    if (waterPiece.src.includes("vapor.png")) {
      void waterPiece.offsetWidth;
      waterPiece.classList.add("vaporGrowth");
      setTimeout(() => {
        if (fan == "off") {
          vaporPissed();
        }
      }, 40000);
    }
  }
  function vaporPissed() {
    if (humidityTrigger == false) {
      humidityTrigger = true;
      alert(
        "I SAID THIS PLACE WAS TO BE FREE OF FOG! WHY ARE YOU LETTING THAT GET IN BOTH OF MY EYES? YOU'RE TRYING MY PATIENCE!"
      );
      const rightHand = document.getElementById("rightHand");
      const leftFiller = document.getElementById("leftFiller");
      rightHand.classList.remove("hide");
      leftFiller.classList.remove("hide");
      rightHand.classList.add("reverse");

      pissed++;
    }
  }
});

//Ominous breathing.wav by xtrgamr -- https://freesound.org/s/257787/ -- License: Attribution 4.0
//Evil Laugh_1.wav by NinjaSharkStudios -- https://freesound.org/s/646307/ -- License: Creative Commons 0
