"use client"
import { Container } from "@shared/ui/Container";
import { PropsWithChildren } from "react";
import style from './ProfileLayout.module.scss'
import { VendorProfile } from "@entities/VendorProfile";
import { UserPhotoSize } from "@shared/ui/UserPhoto";
import { ProfileInfo } from "@shared/models/user.model";

interface ProfileLayoutProps {
  profile?: ProfileInfo
  registered_at?: string
  rating?: number
}

export const ProfileLayout = ({ children, profile, registered_at, rating }: PropsWithChildren<ProfileLayoutProps>) => {
  return (
    <Container className={style.profileLayout}>
      <div className={style.content}>
        <div className={style.vendorProfile}>
          <VendorProfile
            profile={profile}
            registered_at={registered_at}
            photoSize={UserPhotoSize.L}
            withRating={typeof rating === 'number'}
            overallRating={5}
            marks={0}
            column
          />
        </div>
        {children}
      </div>
    </Container>
  )
}