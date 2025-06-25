import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FileExplorer from '../FileExplorer.vue'

describe('FileExplorer', () => {
  it('renders properly', () => {
    const wrapper = mount(FileExplorer, { show: false })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
