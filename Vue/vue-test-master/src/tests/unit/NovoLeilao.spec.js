import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'
// import flushPromises from 'flush-promises'

jest.mock('@/http')
const $router = {
  push: jest.fn()
}

describe('Um novo leilão deve ser criado', () => {
  test('dado o formulario preenchido, um leilão deve ser criado', () => {
    createLeilao.mockResolvedValueOnce()

    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    })
    wrapper.find('.produto').setValue('Stilo BlackMotion 2010')
    wrapper.find('.descricao').setValue('Carro completo sem defeitos')
    wrapper.find('.valor').setValue(5000)
    wrapper.find('form').trigger('submit')

    expect(createLeilao).toHaveBeenCalled()
  })
})
