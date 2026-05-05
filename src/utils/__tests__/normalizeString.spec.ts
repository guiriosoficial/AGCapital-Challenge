import { describe, it, expect } from 'vitest'
import { normalizeString } from '@/utils' // ajuste o caminho

describe('normalizeString', () => {
  it('deve converter para string e transformar em minúsculas', () => {
    expect(normalizeString('TESTE')).toBe('teste')
    expect(normalizeString('VueJS')).toBe('vuejs')
  })

  it('deve remover espaços em branco nas extremidades (trim)', () => {
    expect(normalizeString('  espaço  ')).toBe('espaco')
    expect(normalizeString('\n quebra de linha \t')).toBe('quebra de linha')
  })

  it('deve remover acentuação e caracteres especiais (normalization)', () => {
    const input = 'Olá, Água, Café, Início, Coração'
    const expected = 'ola, agua, cafe, inicio, coracao'

    expect(normalizeString(input)).toBe(expected)
  })

  it('deve lidar com números corretamente', () => {
    // Como a função aceita string | number
    expect(normalizeString(123)).toBe('123')
  })

  it('deve retornar uma string vazia para valores nulos ou vazios por padrão', () => {
    // Testando o default value do parâmetro
    expect(normalizeString(undefined)).toBe('')
    expect(normalizeString('')).toBe('')
  })

  it('deve remover diacríticos complexos', () => {
    expect(normalizeString('ñ')).toBe('n')
    expect(normalizeString('ç')).toBe('c')
    expect(normalizeString('ü')).toBe('u')
  })

  it('deve manter caracteres que não são letras ou números', () => {
    expect(normalizeString('oi-mundo!')).toBe('oi-mundo!')
    expect(normalizeString('100%')).toBe('100%')
  })
})
