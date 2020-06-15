const useState = React.useState;
const useEffect = React.useEffect;
const useSelector = ReactRedux.useSelector;
const useDispatch = ReactRedux.useDispatch;
const createStore = Redux.createStore;


/* --- store.js ------------------------ */
// Store default
const STATE_DEFAULT = {
  game: null,
  score: {
    player: 0,
    cpu: 0,
  }
}

/* --- actions.js ------------------------ */
const ACTION_NEW_GAME = {
  type: 'ACTION_NEW_GAME'
}
const ACTION_SELECT_DOOR = {
  type: 'ACTION_SELECT_DOOR'
}
const ACTION_SECOND_CHANCE = {
  type: 'ACTION_SECOND_CHANCE'
}
const ACTION_FINAL_SHOT = {
  type: 'ACTION_FINAL_SHOT'
}

/* --- reducers.js ------------------------ */
function mainReducer(state = STATE_DEFAULT, action) {
  switch(action.type) {
    case ACTION_NEW_GAME.type : {
      const game = new MontyHall(level);
      return {...state, game: game};
    }
    case ACTION_SELECT_DOOR.type : {
      const newState = {...state}
      newState.game.selectDoor(action.doorIndex);
      return newState;
    }
    case ACTION_SECOND_CHANCE.type : {
      const newState = {...state}
      newState.game.playersSecondChance();
      return newState;
    }
    case ACTION_FINAL_SHOT.type : {
      const newState = {...state}
      const playerWon = newState.game.playersFinalShot();
      if (playerWon) newState.score.player++;
      else newState.score.cpu++;
      return newState;
    }

    default : return state;
  }
}

const store = createStore(mainReducer, STATE_DEFAULT);

const Door = ({door}) => {
  const dispatch = useDispatch();

  const selectDoor = (index) => {
    dispatch({...ACTION_SELECT_DOOR, doorIndex: index});
  }

  return (
    <div className={
          "door" +
          (" door-" + door.status) +
          (door.prize ? " door-prize" : '')
        } onClick={() => selectDoor(door.id)} data-doorid={door.id}>
      <span className="door-title">{door.title}</span>
    </div>);
}

const MontyHallGame = () => {
  const {game, score} = useSelector(state => state);
  const dispatch = useDispatch();

  const gameNextPhase = () => {
    if (!game.hadSecondChance) {
      dispatch(ACTION_SECOND_CHANCE);
    }
    else {
      dispatch(ACTION_FINAL_SHOT);
    }
  }

  const gameStartNew = () => {
    dispatch(ACTION_NEW_GAME);
  }

  useEffect(() => {
    if (!game) {
      gameStartNew()
    }
  }, [game]);

  return (
    <main>
      <div className="score-container">
        <span className="score score-player">{score.player}</span>
        <span className="score score-cpu">{score.cpu}</span>
      </div>
      {game && (
      <div className={"doors-container " + (
        game.doors.length % 10 === 0 ? 'grid-10'
        : (game.doors.length % 5 === 0 ? 'grid-5'
          : (game.doors.length % 4 === 0 ? 'grid-4' : '')
        ))}>
        {game.doors.map((door, index) => (
          <Door door={
          {
            ...door,
            prize: ((game.gameover || door.status === MontyHall.DOOR_STATUS_OPENED)
                ? door.prize
                : ''
            )
          }} key={index} />))}
      </div>)
      }
      <div className="actions-container">
        <button id="btn_continue" onClick={gameNextPhase}>CONTINUE</button>
        <button id="btn_newgame" onClick={gameStartNew}>NEW GAME</button>
        <button id="btn_autoplay" onClick={() => autoPlay(1000, false)}>AUTOPLAY (keep)</button>
        <button id="btn_autoplay" onClick={() => autoPlay(1000, true)}>AUTOPLAY (switch)</button>
      </div>
    </main>
  );
}

const App = () => {
  return (<MontyHallGame />);
}

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>,
  document.getElementById('root')
);

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