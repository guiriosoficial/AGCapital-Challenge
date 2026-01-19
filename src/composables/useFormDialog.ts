import { computed, type Ref } from 'vue'
import type { AgcFormInstance } from '@/components/atoms/AgcForm'

interface UseFormDialogActionsOptions<TEntity, TForm, TCreatePayload, TUpdatePayload> {
  isOpen: Ref<boolean>
  entity: Ref<TEntity | null>
  formRef: Ref<AgcFormInstance | null>
  form: TForm

  onCreate: (form: TForm, entity: TEntity | null) => TCreatePayload
  onUpdate: (form: TForm, entity: TEntity) => TUpdatePayload

  emitCreate: (payload: TCreatePayload) => void
  emitUpdate: (payload: TUpdatePayload) => void
}

export function useFormDialogActions<
  TEntity extends { id?: string },
  TForm extends object,
  TCreatePayload,
  TUpdatePayload
> (options: UseFormDialogActionsOptions<
  TEntity,
  TForm,
  TCreatePayload,
  TUpdatePayload
>) {
  const {
    isOpen,
    entity,
    formRef,
    form,
    onCreate,
    onUpdate,
    emitCreate,
    emitUpdate
  } = options

  const isEditing = computed(() => Boolean(entity.value?.id))

  function close () {
    formRef.value?.resetFields()
    formRef.value?.resetValidation()
    isOpen.value = false
  }

  function submit () {
    formRef.value?.validate((valid: boolean) => {
      if (!valid) return

      if (isEditing.value && entity.value) {
        emitUpdate(onUpdate(form, entity.value))
      } else {
        emitCreate(onCreate(form, entity.value))
      }

      close()
    })
  }

  return {
    isEditing,
    submit,
    close
  }
}
