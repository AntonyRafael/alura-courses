import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    produto: 'Stilo BlackMotion 2010',
    lanceInicial: 5000,
    descricao: 'Carro completo sem defeitos'
  },
  {
    produto: 'Punto BlackMotion 2010',
    lanceInicial: 7000,
    descricao: 'Carro completo sem defeitos'
  }
]

describe('Um avaliador que se conecta com a API', () => {
  test('mostra todos os leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    await flushPromises()
    const totalDeLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalDeLeiloesExibidos).toBe(leiloes.length)
  })
  test('Nenhum leilao é retornado na API', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    await flushPromises()
    const totalDeLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalDeLeiloesExibidos).toBe(0)
  })
})
