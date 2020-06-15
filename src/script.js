let level = 3;
document.addEventListener('keydown', (event) => {
  let newGame = false;
  switch(event.key){
    case 'ArrowUp':
      event.preventDefault();
      if (level < 100) {
        level++;
        newGame = true;
      }
      break;
    case 'ArrowDown':
      event.preventDefault();
      if (level > 3) {
        level--;
        newGame = true;
      }
      break;
  }

  if (newGame) {
    document.getElementById('btn_newgame').click();
  }
});


const randomize = (max) => {
  return Math.floor(Math.random() * max);
}

async function autoPlay(times = 100, switchDoor = false) {
  const btnContinue = document.getElementById('btn_continue');
  const btnNewGame = document.getElementById('btn_newgame');
  btnNewGame.click();

  for(let x = 0; x < times; x++) {
    const doors = document.querySelectorAll('.door');
    let chosen = randomize(doors.length);
    doors[chosen].click();
    btnContinue.click();
    await sleep(10);
    if (switchDoor) {
      chosen = document.querySelector('.door-closed').dataset.doorid;
      doors[chosen].click();
    }
    btnContinue.click();
    await sleep(10);
    btnNewGame.click();
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}