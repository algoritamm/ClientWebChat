'use client'

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import '@/services/resources';
import Login from '@/components/Login'
import Layout from '@/components/Layout';
import Error from '@/components/Error';
import _settings from '../../appsettings.json'

export default function App() {
    const {t, i18n} = useTranslation();
    const [isReady, setIsReady] = useState(false);
    const [userData, setUserData] = useState({username: "", role: ""});

    useEffect(() => {
        const onInit = () => {
            i18n.changeLanguage(_settings?.LanguageResources ?? 'en');
            setIsReady(true);
            i18n.off('initialized', onInit);
        };

        if (i18n.isInitialized) {
            i18n.changeLanguage(_settings?.LanguageResources ?? 'en');
            setIsReady(true);
        } else {
            i18n.on('initialized', onInit);
        }
    }, [i18n]);

    if (!isReady) return <div></div>;

    return userData.username ? (
        <Error fallback={t("An error occurred while opening web chat.")}>
            <Layout username={userData.username} role={userData.role}/>
        </Error>) :
        ( <Error fallback={t("An error occurred while logging.")}>
            <Login onSubmit={(role, username) => setUserData({ username, role })}/>
        </Error>)
}