const aList = [1,2,3,4,5]
const anObject = { name: 'theName', addr: 'theAddr' }

test('array destructure - head and tail', () => {
    const [head, ...tail] = aList
    expect(head).toBe(1)
    expect(tail).toEqual([2,3,4,5])
})

test('array destructure - skip elements', () => {
    const [first, ,third, ...tail] = aList
    expect(first).toBe(1)
    expect(third).toBe(3)
    expect(tail).toEqual([4,5])
})

test('array destructure - fail soft', () => {
    const [hmmm] = []
    expect(hmmm).toBe(undefined)
})

test('array destructure - fail soft with default', () => {
    const [hmmm = 99] = []
    expect(hmmm).toBe(99)
})

test('array destructure - fail soft default overwritten', () => {
    const [hmmm = 99] = [88]
    expect(hmmm).toBe(88)
})

test('array spread - array creation', () => {
    expect([0, ...aList, 6]).toEqual([0,1,2,3,4,5,6])
})

test('array spread - collect arguments', () => {
    const foo = (...args) => args
    expect(foo(1,2,3,4,5)).toEqual(aList)
})

test('array spread - expand to arguments', () => {
    const foo = (a1, a2, a3, a4, a5) => [a1, a2, a3, a4, a5]
    expect(foo(...aList)).toEqual(aList)
})

test('object destructure', () => {
    const { name, addr } = anObject
    expect(name).toEqual('theName')
    expect(addr).toEqual('theAddr')
})

test('object destructure - with defaults', () => {
    const { name, addr, tel = 12345 } = anObject
    expect(name).toEqual('theName')
    expect(addr).toEqual('theAddr')
    expect(tel).toEqual(12345)
})

test('object destructure - aliasing', () => {
    const { name: alias, addr } = anObject
    expect(alias).toEqual('theName')
    expect(addr).toEqual('theAddr')
})

test('object destructure - replace', () => {
    const newObject = { ...anObject, name: 'anOther'}
    expect(newObject).toEqual({ name: 'anOther', addr: 'theAddr' })
})

test('object destructure - merge', () => {
    const anOtherObject = { tel: '12345' }
    const newObject = { ...anObject, ...anOtherObject }
    expect(newObject).toEqual({ name: 'theName', addr: 'theAddr', tel: '12345' })
})

test('object - expand to arguments', () => {
    const foo = ({ target }) => target.value
    const event = { target: { value: 99 } }
    expect(foo(event)).toBe(99)
})

test('object - expand nested value to arguments', () => {
    const foo = ({ target: { value } }) => value
    const event = { target: { value: 99 } }
    expect(foo(event)).toBe(99)
})
