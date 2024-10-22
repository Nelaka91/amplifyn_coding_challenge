import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PathCalculatorComponent from '../PathCalculatorComponent.vue'
import ButtonComponent from '../common/ButtonComponent.vue'
import ResultComponent from '../ResultComponent.vue'

describe('PathCalculatorComponent', () => {
  const setupComponent = async () => {
    const wrapper = mount(PathCalculatorComponent)
    const fromNodeSelect = wrapper.findComponent({ ref: 'fromNodeSelect' })
    const toNodeSelect = wrapper.findComponent({ ref: 'toNodeSelect' })
    const buttons = wrapper.findAllComponents(ButtonComponent)
    const findButton = (label: string) =>
      buttons.find(button => button.props('label') === label)
    return { wrapper, fromNodeSelect, toNodeSelect, findButton }
  }

  it('renders the component correctly', () => {
    const wrapper = mount(PathCalculatorComponent)
    expect(wrapper.find('h1').text()).toBe("Dijkstra's Algorithm Calculator")
    expect(wrapper.find('h5').text()).toBe(
      "Discovering Optimal Routes Through Nodes Using Dijkstra's Method",
    )
  })

  it('initially does not show the result component', () => {
    const wrapper = mount(PathCalculatorComponent)
    expect(wrapper.findComponent(ResultComponent).exists()).toBe(false)
  })

  it('passes correct props to ResultComponent when result is shown', async () => {
    const { wrapper, fromNodeSelect, toNodeSelect, findButton } =
      await setupComponent()

    await fromNodeSelect.setValue('A')
    await toNodeSelect.setValue('D')

    await findButton('Calculate')!.trigger('click')
    await wrapper.vm.$nextTick()

    const resultComponent = wrapper.findComponent(ResultComponent)
    expect(resultComponent.exists()).toBe(true)
    expect(resultComponent.props()).toMatchObject({
      fromNode: 'A',
      toNode: 'D',
      distance: 10,
    })
  })

  it('shows the result component after clicking "Calculate"', async () => {
    const { fromNodeSelect, toNodeSelect, findButton, wrapper } =
      await setupComponent()

    await fromNodeSelect.setValue('A')
    await toNodeSelect.setValue('D')

    await findButton('Calculate')!.trigger('click')
    expect(wrapper.findComponent(ResultComponent).exists()).toBe(true)
  })

  it('hides the result component after clicking "Clear"', async () => {
    const { findButton, wrapper } = await setupComponent()

    await findButton('Calculate')!.trigger('click')
    await findButton('Clear')!.trigger('click')
    expect(wrapper.findComponent(ResultComponent).exists()).toBe(false)
  })
})
