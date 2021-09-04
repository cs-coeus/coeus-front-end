import { computed, ref, Ref } from 'vue'
import { scaleExtent, zoomTransform } from './index'

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
export const collapseItem: Ref<MenuItem> = ref({ title: '折叠节点', name: 'collapse', disabled: true })
export const expandItem: Ref<MenuItem> = ref({ title: '展开节点', name: 'expand', disabled: true })
export const deleteItem: Ref<MenuItem> = ref({ title: '删除节点', name: 'delete', disabled: false })
export const addItem: Ref<MenuItem> = ref({ title: '新建子节点', name: 'add', disabled: false })
export const addParentItem: Ref<MenuItem> = ref({ title: '新建父节点', name: 'add-parent', disabled: false })
export const addSiblingItem: Ref<MenuItem> = ref({ title: '新建兄弟节点', name: 'add-sibling', disabled: false })
export const addSiblingBeforeItem: Ref<MenuItem> = ref({ title: '在此之前新建兄弟节点', name: 'add-sibling-before', disabled: true })
export const cutItem: Ref<MenuItem> = ref({ title: '剪切', name: 'cut', disabled: false })
export const copyItem: Ref<MenuItem> = ref({ title: '拷贝', name: 'copy', disabled: false })
export const pasteItem: Ref<MenuItem> = ref({ title: '粘贴', name: 'paste', disabled: false })
export const deleteOneItem: Ref<MenuItem> = ref({ title: '删除单个节点', name: 'delete-one', disabled: false })


const nodeMenu = computed<MenuItem[][]>(() => [
  [ addItem.value, addParentItem.value, addSiblingItem.value, addSiblingBeforeItem.value ],
  [ cutItem.value, copyItem.value, pasteItem.value, deleteItem.value, deleteOneItem.value ],
  [ { title: '全选', name: 'selectall', disabled: true } ],
  [ collapseItem.value, expandItem.value ]
])

const viewMenu = computed(() => [
  [
    {
      title: '放大',
      name: 'zoomin',
      disabled: zoomTransform.value.k >= scaleExtent[1]
    },
    {
      title: '缩小',
      name: 'zoomout',
      disabled: zoomTransform.value.k <= scaleExtent[0]
    },
    { title: '缩放至合适大小', name: 'zoomfit', disabled: false }
  ],
  [
    { title: '全选', name: 'selectall', disabled: true }
  ]
])

export const menu = computed(() => showViewMenu.value ? viewMenu.value : nodeMenu.value)