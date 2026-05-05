import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ElNotification } from 'element-plus'
import { useNotification } from '../useNotification'

// Mock da função ElNotification
vi.mock('element-plus', () => ({
  ElNotification: vi.fn(() => ({
    close: vi.fn()
  }))
}))

describe('useNotification', () => {
  const notifications = useNotification()

  const defaultOptions = {
    position: 'top-right',
    duration: 5000,
    offset: 110,
    showClose: true
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Sucesso', () => {
    it('deve chamar notificação de sucesso com mensagens padrão', () => {
      notifications.success()

      expect(ElNotification).toHaveBeenCalledWith(expect.objectContaining({
        type: 'success',
        title: 'Yay!',
        message: 'Realizado com sucesso!',
        ...defaultOptions
      }))
    })

    it('deve permitir sobrescrever a mensagem e o título', () => {
      notifications.success('Nova Mensagem', { title: 'Novo Título' })

      expect(ElNotification).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Novo Título',
        message: 'Nova Mensagem'
      }))
    })
  })

  describe('Erro', () => {
    it('deve exibir a mensagem de erro padrão do sistema', () => {
      notifications.error()

      expect(ElNotification).toHaveBeenCalledWith(expect.objectContaining({
        type: 'error',
        title: 'Ops!',
        message: 'Tente novamente ou entre em contato com o administrador do sistema.'
      }))
    })
  })

  describe('Handle de Retorno', () => {
    it('deve retornar um objeto que permite fechar a notificação', () => {
      const mockClose = vi.fn()
      vi.mocked(ElNotification).mockReturnValueOnce({ close: mockClose } as any)

      const handle = notifications.info('Teste')
      handle.close()

      expect(mockClose).toHaveBeenCalled()
    })
  })

  describe('Prioridade de Opções', () => {
    it('deve garantir que as opções passadas pelo usuário tenham prioridade sobre as defaults', () => {
      notifications.warning('Cuidado', { duration: 1000, position: 'bottom-left' })

      expect(ElNotification).toHaveBeenCalledWith(expect.objectContaining({
        duration: 1000,
        position: 'bottom-left'
      }))
    })
  })
})
