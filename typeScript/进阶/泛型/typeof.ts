interface Fuits {
    name: string,
    color: string
}

const orange: Fuits = {
    name: 'oriange',
    color: 'red'
}

type Sem = typeof orange;

const soso: Sem = { name: 'apple', color: 'yellow' }