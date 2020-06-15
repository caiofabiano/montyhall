class MontyHall {

  static DOOR_STATUS_CLOSED = 'closed';
  static DOOR_STATUS_SELECTED = 'selected';
  static DOOR_STATUS_OPENED = 'opened';

  constructor(doorsNumber) {
    if (!doorsNumber) doorsNumber = 3;
    if (doorsNumber < 3) throw "MontyHall expects at least 3 doors";

    const defaultDoor = {
      id: null,
      title: '',
      prize: false,
      status: MontyHall.DOOR_STATUS_CLOSED
    }


    this.doors = new Array(doorsNumber);
    for (let x = 0; x < doorsNumber; x++) {
      this.doors[x] = {...defaultDoor, id: x, title: (x + 1).toString()};
    }
    const chosenDoor = this.randomize(doorsNumber);
    this.doors[chosenDoor].prize = true;
    this.selectedDoor = null;
    this.hadSecondChance = false;
    this.gameover = false;
  }

  randomize(max) {
    return Math.floor(Math.random() * max);
  }

  selectDoor(doorIndex) {
    if (doorIndex < 0 || doorIndex >= this.doors.length) {
      throw "Selected door does not exist.";
    }
    if (this.doors[doorIndex].status !== MontyHall.DOOR_STATUS_OPENED) {
      if (this.hasSelectedDoor()) {
        this.doors[this.selectedDoor].status = MontyHall.DOOR_STATUS_CLOSED;
      }
      this.selectedDoor = doorIndex;
      this.doors[doorIndex].status = MontyHall.DOOR_STATUS_SELECTED;
    }
  }

  openDoor(doorIndex) {
    if (doorIndex < 0 || doorIndex >= this.doors.length) {
      throw "Chosen door does not exist.";
    }
    this.doors[doorIndex].status = MontyHall.DOOR_STATUS_OPENED;
  }

  hasSelectedDoor() {
    return this.selectedDoor !== null;
  }

  playersSecondChance() {
    if (this.hadSecondChance) {
      throw "The second chance has already been granted.";
    }
    if (!this.hasSelectedDoor()) {
      throw "There must be a selected door to proceed.";
    }
    let emptyDoors = this.doors.filter(door => door.prize === false && door.id !== this.selectedDoor);
    if (this.doors.length - emptyDoors.length === 1) {
      const extraDoor = this.randomize(emptyDoors.length);
      emptyDoors = emptyDoors.filter((door, index) => index !== extraDoor);
    }
    const chosenDoor = this.randomize(emptyDoors.length);
    emptyDoors.forEach(door => {
      this.doors[door.id].status = MontyHall.DOOR_STATUS_OPENED;
    });
    this.hadSecondChance = true;
  }

  playersFinalShot() {
    if (this.gameover) {
      throw "Game has ended.";
    }
    if (!this.hadSecondChance) {
      throw "Player has the right of a second chance.";
    }

    this.gameover = true;
    const playerWon = this.doors[this.selectedDoor].prize;
    return playerWon;
  }

}
