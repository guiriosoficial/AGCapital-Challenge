import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useFormDialogActions } from '../useFormDialog'

describe('useFormDialogActions', () => {
  // Setup de Mocks e Refs
  const isOpen = ref(true)
  const entity = ref<{ id?: string; name: string } | null>(null)

  // Mock do AgcFormInstance
  const formRef = ref({
    resetFields: vi.fn(),
    resetValidation: vi.fn(),
    validate: vi.fn((callback) => callback(true)) // Simula validação passando por padrão
  } as any)

  const form = { name: 'Novo Nome' }

  const options = {
    isOpen,
    entity,
    formRef,
    form,
    onCreate: vi.fn((f) => ({ ...f, type: 'create' })),
    onUpdate: vi.fn((f, e) => ({ ...f, id: e.id, type: 'update' })),
    emitCreate: vi.fn(),
    emitUpdate: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    isOpen.value = true
    entity.value = null
  })

  it('deve identificar quando é edição baseado no ID da entidade', () => {
    const { isEditing } = useFormDialogActions(options)

    expect(isEditing.value).toBe(false)

    entity.value = { id: '123', name: 'Original' }
    expect(isEditing.value).toBe(true)
  })

  describe('close', () => {
    it('deve resetar o formulário e fechar o dialog', () => {
      const { close } = useFormDialogActions(options)

      close()

      expect(formRef.value.resetFields).toHaveBeenCalled()
      expect(formRef.value.resetValidation).toHaveBeenCalled()
      expect(isOpen.value).toBe(false)
    })
  })

  describe('submit', () => {
    it('não deve emitir nada se a validação falhar', () => {
      // Mockando falha na validação
      formRef.value.validate.mockImplementationOnce((cb) => cb(false))
      const { submit } = useFormDialogActions(options)

      submit()

      expect(options.emitCreate).not.toHaveBeenCalled()
      expect(options.emitUpdate).not.toHaveBeenCalled()
      expect(isOpen.value).toBe(true) // Não fecha
    })

    it('deve chamar onCreate e emitCreate quando for uma nova entidade', () => {
      const { submit } = useFormDialogActions(options)
      entity.value = null // Garante que não é edição

      submit()

      expect(options.onCreate).toHaveBeenCalledWith(form, null)
      expect(options.emitCreate).toHaveBeenCalledWith({ ...form, type: 'create' })
      expect(isOpen.value).toBe(false)
    })

    it('deve chamar onUpdate e emitUpdate quando for edição', () => {
      const { submit } = useFormDialogActions(options)
      const mockEntity = { id: '1', name: 'Old' }
      entity.value = mockEntity

      submit()

      expect(options.onUpdate).toHaveBeenCalledWith(form, mockEntity)
      expect(options.emitUpdate).toHaveBeenCalledWith({ ...form, id: '1', type: 'update' })
      expect(isOpen.value).toBe(false)
    })
  })
})
