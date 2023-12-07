import { Button } from "src/shared/ui/Button/Button"
import { ShareIcon } from "src/shared/ui/ShareIcon/ShareIcon"
import style from './ShareButton.module.scss'

export const ShareButton = () => {
    return (
        <Button className={style.shareButton}>
            <ShareIcon />
        </Button>
    )
}