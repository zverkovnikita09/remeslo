'use client'
import { VendorProduct } from "@entities/VendorProduct"
import { MessagePanel } from "@features/MessagePanel"
import style from './ChatBlock.module.scss'
import {useEffect} from "react";
import {pusher} from "@/config/Pusher";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";

export const ChatBlock = () => {
  const {slug: seller_id} = useParams();
  const {data} = useSession();

  useEffect(() => {
    let channel = pusher.subscribe(`remeslo-chat_${seller_id}_${data?.user?.user?.id}`);
  }, []);

  return (
    <div className={style.chatBlock}>
      <div className={style.heading}>
        <VendorProduct />
      </div>
      <div className={style.body}>

      </div>
      <MessagePanel />
    </div>
  )
}