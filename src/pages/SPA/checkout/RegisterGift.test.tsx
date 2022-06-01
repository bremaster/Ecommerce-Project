import { calcSceneForNoshi } from './RegisterGift'

it('tests scenes are all ALL flag', () => {
  const input = ['すべてのギフト', 'すべてのギフト', 'すべてのギフト']
  const want = {
    value: '',
    options: ['出産祝い', '出産内祝い', '結婚祝い', '結婚内祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests scenes are 出産祝い * 3', () => {
  const input = ['出産祝い', '出産祝い', '出産祝い']
  const want = {
    value: '出産祝い',
    options: ['出産祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests scenes are 出産祝い * 2', () => {
  const input = ['出産祝い', '出産祝い']
  const want = {
    value: '出産祝い',
    options: ['出産祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests scenes are 出産祝い * 1', () => {
  const input = ['出産祝い']
  const want = {
    value: '出産祝い',
    options: ['出産祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests scenes including ALL flag - 1', () => {
  const input = ['出産祝い', 'すべてのギフト']
  const want = {
    value: '出産祝い',
    options: ['出産祝い', '出産内祝い', '結婚祝い', '結婚内祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests scenes including ALL flag - 2', () => {
  const input = ['出産祝い', 'すべてのギフト', '出産祝い']
  const want = {
    value: '出産祝い',
    options: ['出産祝い', '出産内祝い', '結婚祝い', '結婚内祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests scenes including ALL flag - 2', () => {
  const input = ['出産祝い', 'すべてのギフト', 'すべてのギフト']
  const want = {
    value: '出産祝い',
    options: ['出産祝い', '出産内祝い', '結婚祝い', '結婚内祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests multi scenes - 1', () => {
  const input = ['出産祝い', '結婚祝い']
  const want = {
    value: '',
    options: ['出産祝い', '結婚祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests multi scenes - 2', () => {
  const input = ['出産祝い', '結婚祝い', 'すべてのギフト']
  const want = {
    value: '',
    options: ['出産祝い', '出産内祝い', '結婚祝い', '結婚内祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests multi scenes - 3', () => {
  const input = ['出産祝い', '結婚祝い', '出産内祝い']
  const want = {
    value: '',
    options: ['出産祝い', '結婚祝い', '出産内祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})

it('tests multi scenes - 4', () => {
  const input = ['出産内祝い', '結婚祝い', '出産内祝い']
  const want = {
    value: '',
    options: ['出産内祝い', '結婚祝い'],
  }
  const get = calcSceneForNoshi(input)
  expect(get).toEqual(want)
})
