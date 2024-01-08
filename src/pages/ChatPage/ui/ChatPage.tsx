import { Container } from "src/shared/ui/Container/Container"
import style from './ChatPage.module.scss'
import { Title } from "src/shared/ui/Title/TItle"
import { VendorProduct } from "src/shared/ui/VendorProduct/VendorProduct"
import { VendorDialogList } from "src/widgets/VendorDialogsList/ui/VendorDialogsList"
import { MessagePanel } from "src/features/MessagePanel"


export const ChatPage = () => {
    return (
        <Container className={style.chatPage}>
            <div className={style.chatPage__dialogs}>
                <div className={style.chatPage__dialogsHeading}>
                    <Title>Чаты</Title>
                    <div className={style.chatPage__chatCount}>(5 чатов)</div>
                </div>
                <div className={style.chatPage__dialogsWrapper}>
                    <VendorDialogList />
                    <VendorDialogList />
                    <VendorDialogList />
                    <VendorDialogList />
                    <VendorDialogList />

                </div>
            </div>
            <div className={style.chatPage__chat}>
                <div className={style.chatPage__chatHeading}>
                    <VendorProduct />
                </div>
                <div className={style.chatPage__chatBody}>

                </div>
                <MessagePanel />
            </div>
        </Container>
    )
}