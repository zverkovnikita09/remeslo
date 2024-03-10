import {createContext, PropsWithChildren, useEffect} from "react";
import {NotificationsContext} from "@providers/NotificationsProvider";
import {pusher} from "@/config/Pusher";

interface WSContextProps {

}

export const WebsocketContext = createContext<WSContextProps>('');

export const WebsocketProvider = ({children}: PropsWithChildren) => {

  // useEffect(() => {
  //   let channel = pusher.bind_global(callback);
  // }, []);

  return (
    <WebsocketContext.Provider value={{}}>
      {children}
    </WebsocketContext.Provider>
  );
};
