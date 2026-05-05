import { describe, it, expect } from 'vitest'
import { filterByTerm } from '@/utils' // ajuste o caminho

describe('filterByTerm', () => {
  const mockData = [
    { id: 1, name: 'João Silva', role: 'Developer', projects: [] },
    { id: 2, name: 'Maria Souza', role: 'Designer', projects: ['Web', 'Mobile'] },
    { id: 3, name: 'Renato Garcia', role: 'Manager', projects: [] },
  ]

  it('deve retornar o array completo se o termo estiver vazio', () => {
    const result = filterByTerm(mockData, '', ['name'])
    expect(result).toHaveLength(3)
  })

  it('deve filtrar ignorando acentos e case', () => {
    const result = filterByTerm(mockData, 'joao', ['name'])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('João Silva')
  })

  it('deve funcionar com múltiplas chaves', () => {
    const result = filterByTerm(mockData, 'man', ['name', 'role'])
    expect(result).toHaveLength(1)
    expect(result[0].role).toBe('Manager')
  })

  describe('ignoreCondition', () => {
    it('deve manter o item se a condição for verdadeira, mesmo que o termo não bata', () => {
      // Procurando por "Xyz" (que ninguém tem),
      // mas ignorando o filtro se o objeto tiver projetos
      const result = filterByTerm(
        mockData,
        'Xyz',
        ['name'],
        (item) => item.projects.length > 0
      )

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(2) // Maria Souza foi mantida pela regra de exceção
    })

    it('deve aplicar o filtro normalmente se a condição for falsa', () => {
      // Procurando por "Maria"
      // Condição de ignorar: id ser 1 (João)
      const result = filterByTerm(
        mockData,
        'Maria',
        ['name'],
        (item) => item.id === 1
      )

      expect(result).toHaveLength(2)
      // Resulta em João (pela exceção) e Maria (pelo filtro padrão)
      expect(result.map(i => i.id)).toContain(1)
      expect(result.map(i => i.id)).toContain(2)
    })

    it('não deve quebrar se ignoreCondition não for fornecido', () => {
      const result = filterByTerm(mockData, 'Renato', ['name'])
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(3)
    })
  })

  it('deve lidar com propriedades nulas ou indefinidas', () => {
    const dataWithNull = [{ id: 1, desc: null }, { id: 2, desc: 'Ok' }]
    const result = filterByTerm(dataWithNull, 'ok', ['desc'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('deve filtrar o item diretamente se nenhuma chave for fornecida', () => {
    const list = ['Cachaça', 'Suco', 'Água']
    expect(filterByTerm(list, 'cachaca')).toHaveLength(1)
    expect(filterByTerm(list, 'agua')).toHaveLength(1)
  })
})
