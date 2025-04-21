/// <reference types="bun-types" />
import { expect, test, describe } from 'bun:test'
import App from '@/App.vue'

describe('App Component', () => {
  test('dom test', () => {
    document.body.innerHTML = `${App}`
    expect(document.body.innerHTML).toBeTruthy()
  })
})
