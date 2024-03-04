import { Container } from '@shared/ui/Container'
import style from './ChatLayout.module.scss'
import { Title } from '@shared/ui/Title'
import { PropsWithChildren } from 'react'
import { VendorDialog } from '@entities/VendorDialog'

interface ChatLayoutProps {

}

export const ChatLayout = ({ children }: PropsWithChildren<ChatLayoutProps>) => {
  return (
    <Container className={style.chatLayout}>
      <div className={style.dialogs}>
        <div className={style.dialogsHeading}>
          <Title>Чаты</Title>
          <div className={style.chatCount}>(5 чатов)</div>
        </div>
        <div className={style.dialogsWrapper}>
          <VendorDialog />
          <VendorDialog />
          <VendorDialog />
          <VendorDialog />
          <VendorDialog />
        </div>
      </div>
      {children}
    </Container>
  )
}