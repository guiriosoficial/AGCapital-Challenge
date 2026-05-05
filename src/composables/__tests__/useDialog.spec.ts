import { describe, it, expect } from 'vitest'
import { useDialog } from '../useDialog'

describe('useDialog Composable', () => {
  it('deve inicializar com valores padrão', () => {
    const { isOpen, props } = useDialog()

    expect(isOpen.value).toBe(false)
    expect(props.value).toBe(null)
  })

  it('deve abrir o dialog e definir as props corretamente', () => {
    const { isOpen, props, open } = useDialog<{ name: string }>()
    const mockData = { name: 'Teste' }

    open(mockData)

    expect(isOpen.value).toBe(true)
    expect(props.value).toEqual(mockData)
  })

  it('deve fechar o dialog e resetar as props', () => {
    const { isOpen, props, open, close } = useDialog()

    open({ id: 1 })
    close()

    expect(isOpen.value).toBe(false)
    expect(props.value).toBe(null)
  })

  describe('toggle', () => {
    it('deve abrir se estiver fechado', () => {
      const { isOpen, toggle } = useDialog()

      toggle()
      expect(isOpen.value).toBe(true)
    })

    it('deve fechar se estiver aberto', () => {
      const { isOpen, open, toggle } = useDialog()

      open()
      toggle()
      expect(isOpen.value).toBe(false)
    })

    it('deve passar parâmetros ao abrir via toggle', () => {
      const { props, toggle } = useDialog<string>()

      toggle('meu-parametro')
      expect(props.value).toBe('meu-parametro')
    })
  })

  it('deve manter a reatividade', () => {
    // Garante que o objeto retornado contém refs reais
    const dialog = useDialog()
    expect(dialog.isOpen.value).toBe(false)

    dialog.open()
    expect(dialog.isOpen.value).toBe(true)
  })
})
