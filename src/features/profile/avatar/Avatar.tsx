import React, {useState} from 'react';
import styles from "features/profile/Profile.module.css";
import defaultUserAvatar from "assets/images/defaultUserAvatar.png";
import {appActions} from "app/appSlice";
import {useAppDispatch, useAppSelector} from "app/store";
import ChangeAvaModal from "features/profile/avatar/ChangeAvaModal";

const Avatar = () => {
    const [avaIsBroken, setAvaIsBroken] = useState(false)

    const userAvatar = useAppSelector(state => state.profile.data.avatar)

    const dispatch = useAppDispatch()

    const errorHandler = () => {
        setAvaIsBroken(true)
        dispatch(appActions.setError({error: 'Изображение неверного формата либо файл повреждён.'}))
    }


    return (
        <div>
            <img
                className={styles.mainPhoto}
                src={avaIsBroken ? defaultUserAvatar : userAvatar}
                onError={errorHandler}
                alt="ava"/>
            <ChangeAvaModal/>
        </div>
    );
};

export default Avatar;