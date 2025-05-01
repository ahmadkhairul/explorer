/// <reference types="bun-types" />
import { expect, test, describe } from 'bun:test'
import FileExplorer from '@/components/file-explorer.vue'

describe('FileExplorer Component', () => {
  test('dom test', () => {
    document.body.innerHTML = `${FileExplorer}`
    expect(document.body.innerHTML).toBeTruthy()
  })
})
