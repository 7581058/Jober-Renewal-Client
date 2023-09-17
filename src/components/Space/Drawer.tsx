import SwtichActionBlock from '@/components/SwitchCase/SwitchActionBlock'
import { useDrawerFormType } from '@/store/formMode'
import { Drawer as AntdDrawer } from 'antd'

export function Drawer() {
  const { openDrawer, setOpenDrawer, mode } = useDrawerFormType()

  return (
    <AntdDrawer
      title={mode === 'create' ? '블록 추가' : '블록 수정'}
      placement="right"
      bodyStyle={{ padding: '0' }}
      onClose={() => {
        setOpenDrawer(false)
      }}
      open={openDrawer}
    >
      <SwtichActionBlock />
    </AntdDrawer>
  )
}
