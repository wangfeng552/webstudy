type Direction = 'up' | 'down'

function show(direction: Direction) {
    console.log(direction);
}

show('up')

interface Config {
    size: 'small' | 'big';
    isEanable: true | false;
    margin: 0 | 2 | 4;
}

function setMain(config: Config): void {
    console.log(config);

}

setMain({ size: 'small', isEanable: true, margin: 2 })


