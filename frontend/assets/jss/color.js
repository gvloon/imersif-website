export default {
    black: '#000',
    white: '#fff',
    gray: [
        '#999',
        '#3C4858',
        '#eee',
        '#343434',
        '#585858',
        '#232323',
        '#ddd',
        '#6c757d',
        '#333',
        '#212121',
        '#777',
        '#D2D2D2',
        '#AAA',
        '#495057',
        '#e5e5e5',
        '#555',
        '#f9f9f9',
        '#ccc',
        '#444',
        '#f2f2f2',
        '#89229b',
        '#c0c1c2',
        '#9a9a9a',
        '#f5f5f5',
        '#505050',
        '#1f1f1f'
    ],
    hexToRgb: input => {
        input = input + ''
        input = input.replace('#', '')
        const hexRegex = /[0-9A-Fa-f]/g
        if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
            throw new Error('input is not a valid hex color.')
        }
        if (input.length === 3) {
            const first = input[0]
            const second = input[1]
            const last = input[2]
            input = first + first + second + second + last + last
        }
        input = input.toUpperCase(input)
        const first = input[0] + input[1]
        const second = input[2] + input[3]
        const last = input[4] + input[5]
        return (
            parseInt(first, 16) +
            ', ' +
            parseInt(second, 16) +
            ', ' +
            parseInt(last, 16)
        )
    }
}
