function add({ one, two }: { one: number, two: number }) {
    console.log(one + two);

    return one + two
}

add({ one: 1, two: 2 })