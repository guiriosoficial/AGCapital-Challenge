import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ElMessageBox } from 'element-plus'
import { useMessageBox } from '../useMessageBox'

// Mock do Element Plus
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn(),
    prompt: vi.fn()
  }
}))

describe('useMessageBox', () => {
  const { alert, confirm, prompt } = useMessageBox()

  const title = 'Título'
  const message = 'Mensagem de teste'
  const defaultOptions = {
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancel',
    showClose: true
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('alert', () => {
    it('deve chamar ElMessageBox.alert com as opções padrão', async () => {
      await alert(title, message)

      expect(ElMessageBox.alert).toHaveBeenCalledWith(
        message,
        title,
        defaultOptions
      )
    })

    it('deve sobrescrever opções padrão quando fornecidas', async () => {
      await alert(title, message, { confirmButtonText: 'Entendi' })

      expect(ElMessageBox.alert).toHaveBeenCalledWith(
        message,
        title,
        expect.objectContaining({ confirmButtonText: 'Entendi', showClose: true })
      )
    })
  })

  describe('confirm', () => {
    it('deve resolver com sucesso quando confirmado', async () => {
      vi.mocked(ElMessageBox.confirm).mockResolvedValue('confirm' as any)

      await expect(confirm(title, message)).resolves.toBeUndefined()
    })

    it('deve rejeitar a promise quando cancelado', async () => {
      vi.mocked(ElMessageBox.confirm).mockRejectedValue('cancel')

      await expect(confirm(title, message)).rejects.toBeUndefined()
    })
  })

  describe('prompt', () => {
    it('deve retornar o valor digitado quando confirmado', async () => {
      vi.mocked(ElMessageBox.prompt).mockResolvedValue({ value: 'meu input' } as any)

      const result = await prompt(title, message)
      expect(result).toBe('meu input')
    })

    it('deve retornar null quando o prompt é cancelado ou fechado', async () => {
      vi.mocked(ElMessageBox.prompt).mockRejectedValue('cancel')

      const result = await prompt(title, message)
      expect(result).toBeNull()
    })
  })
})
