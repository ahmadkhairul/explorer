import { render, type RenderOptions } from '@testing-library/vue'
import { mount, type MountingOptions } from '@vue/test-utils'
import { createPinia } from 'pinia'

/**
 * Shared Pinia-enhanced global config
 */
function getGlobalConfig(globalOverrides = {}) {
  return {
    plugins: [createPinia()],
    ...globalOverrides,
  }
}

/**
 * For user-centric testing (Testing Library)
 */
export function renderWithPinia(component: any, options: RenderOptions<any> = {}) {
  return render(component, {
    global: getGlobalConfig(options.global),
    ...options,
  })
}

/**
 * For internal/component-centric testing (Vue Test Utils)
 */
export function mountWithPinia(component: any, options: MountingOptions<any> = {}) {
  return mount(component, {
    global: getGlobalConfig(options.global),
    ...options,
  })
}
