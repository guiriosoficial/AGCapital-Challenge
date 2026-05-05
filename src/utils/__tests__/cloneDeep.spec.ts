import { describe, it, expect } from 'vitest'
import { cloneDeep } from '@/utils' // ajuste o caminho

describe('cloneDeep', () => {
  it('deve criar uma cópia exata de um objeto simples', () => {
    const original = { a: 1, b: 'teste', c: true }
    const copy = cloneDeep(original)

    expect(copy).toEqual(original)
    expect(copy).not.toBe(original) // Garante que são instâncias diferentes na memória
  })

  it('deve clonar objetos aninhados (deep clone)', () => {
    const original = {
      user: {
        name: 'John',
        address: { city: 'SJm' }
      },
      tags: [1, 2, 3]
    }
    const copy = cloneDeep(original)

    expect(copy).toEqual(original)
    // Verifica se a alteração na cópia não afeta o original
    copy.user.address.city = 'SJC'
    expect(original.user.address.city).toBe('SJm')
  })

  it('deve lidar com arrays corretamente', () => {
    const original = [{ id: 1 }, { id: 2 }]
    const copy = cloneDeep(original)

    expect(copy).toEqual(original)
    expect(copy[0]).not.toBe(original[0])
  })

  it('deve lidar com valores primitivos', () => {
    expect(cloneDeep(123)).toBe(123)
    expect(cloneDeep('string')).toBe('string')
    expect(cloneDeep(null)).toBe(null)
  })

  describe('Limitações (Comportamento JSON)', () => {
    it('deve converter datas para string (comportamento padrão do JSON.stringify)', () => {
      const date = new Date('2023-01-01T00:00:00Z')
      const original = { date }

      const copy = cloneDeep(original)

      // O cloneFnJSON transforma Date em string ISO
      expect(typeof copy.date).toBe('string')
      expect(copy.date).toBe(date.toISOString())
    })

    it('deve ignorar funções ao clonar', () => {
      const original = {
        name: 'Vue',
        run: () => console.log('running')
      }

      const copy = cloneDeep(original) as any

      expect(copy.name).toBe('Vue')
      expect(copy.run).toBeUndefined() // Funções são perdidas no JSON.stringify
    })
  })
})
