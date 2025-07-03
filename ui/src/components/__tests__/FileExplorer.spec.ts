import { describe, it, expect, vi } from 'vitest'
import FileExplorer from '../FileExplorer.vue'
import { mountWithPinia } from '@/utils/test-utils'

describe('FileExplorer', () => {
  it('renders correctly', async () => {
    const wrapper = mountWithPinia(FileExplorer, {
      props: {
        sidebar: false,
        'onUpdate:sidebar': vi.fn(),
      },
    })

    const sidebar = wrapper.get('[data-testid="sidebar-btn"]')
    await sidebar.trigger('click')

    const newFolder = wrapper.get('[data-testid="new-folder-btn"]')
    await newFolder.trigger('click')

    const actions = wrapper.get('[data-testid="action-btn"]')
    await actions.trigger('click')

    const searchInput = wrapper.get('[data-testid="search-input"]')
    await searchInput.setValue('test')
    expect(wrapper.exists()).toBe(true)
  })
})
