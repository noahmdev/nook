import type { Ref, InjectionKey } from 'vue'

export const modalDisplayKey: InjectionKey<Ref<boolean>> = Symbol('modalDisplay')
