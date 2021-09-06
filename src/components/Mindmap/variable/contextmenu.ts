import { computed, ref, Ref } from 'vue'
import { scaleExtent, zoomTransform } from '.'

export type MenuEvent = 'zoomin' | 'zoomout' | 'zoomfit' | 'add' | 'delete' |
  'selectall' | 'collapse' | 'expand' | 'add-sibling' | 'add-sibling-before' |
  'add-parent' | 'copy' | 'paste' | 'cut' | 'delete-one'
export interface MenuItem {
  title: string
  name: string
  disabled: boolean
}
export const showViewMenu = ref(true)
export const pos = ref({ left: 0, top: 0 })
export const collapseItem: Ref<MenuItem> = ref({ title: 'Collapse node', name: 'collapse', disabled: true })
export const expandItem: Ref<MenuItem> = ref({ title: 'Expand node', name: 'expand', disabled: true })
export const deleteItem: Ref<MenuItem> = ref({ title: 'Delete node ', name: 'delete', disabled: false })
export const addItem: Ref<MenuItem> = ref({ title: 'New child node', name: 'add', disabled: false })
export const addParentItem: Ref<MenuItem> = ref({ title: 'New parent node', name: 'add-parent', disabled: false })
export const addSiblingItem: Ref<MenuItem> = ref({ title: 'New sibling node', name: 'add-sibling', disabled: false })
export const addSiblingBeforeItem: Ref<MenuItem> = ref({ title: 'Create a new sibling node before this ', name: 'add-sibling-before', disabled: true })
export const cutItem: Ref<MenuItem> = ref({ title: 'Cut', name: 'cut', disabled: false })
export const copyItem: Ref<MenuItem> = ref({ title: 'Copy', name: 'copy', disabled: false })
export const pasteItem: Ref<MenuItem> = ref({ title: 'Paste', name: 'paste', disabled: false })
export const deleteOneItem: Ref<MenuItem> = ref({ title: 'Delete a single node', name: 'delete-one', disabled: false })


const nodeMenu = computed<MenuItem[][]>(() => [
  [ addItem.value, addParentItem.value, addSiblingItem.value, addSiblingBeforeItem.value ],
  [ cutItem.value, copyItem.value, pasteItem.value, deleteItem.value, deleteOneItem.value ],
  [ { title: 'Select all', name: 'selectall', disabled: true } ],
  [ collapseItem.value, expandItem.value ]
])

const viewMenu = computed(() => [
  [
    {
      title: 'Zoom in',
      name: 'zoomin',
      disabled: zoomTransform.value.k >= scaleExtent[1]
    },
    {
      title: 'Zoom out',
      name: 'zoomout',
      disabled: zoomTransform.value.k <= scaleExtent[0]
    },
    { title: 'Zoom fit', name: 'zoomfit', disabled: false }
  ],
  [
    { title: 'Select all', name: 'selectall', disabled: true }
  ]
])

export const menu = computed(() => showViewMenu.value ? viewMenu.value : nodeMenu.value)
