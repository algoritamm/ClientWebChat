'use client'

import { useTranslation } from "react-i18next"
import { useState, useRef } from "react"

export default function Login({ onSubmit }) {
    const {t} = useTranslation();
    const [username, setUsername] = useState("");
    const isAgent = useRef(null);

    return (
        <div className="page-wraper">
            <div className="content">
		        <img src="/img/Logo.png" alt="Logo page" />
	        </div>
            <div className="login-content">
                    <h1>{t("User login")}</h1>
                    <p>{t("Enter your username:")}</p>
                <form
                        onSubmit={(e) => {
                        e.preventDefault();
                        const role = isAgent.current.checked ? "agent" : "user"
                        onSubmit(role, username);
                        }}
                    >
                    <div>
                        <input
                            type="text"
                            value={username}
                            placeholder={t("Username")}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <input type="submit" value={t("Login")}/>
                    </div>
                    <div className="row">
                        <label className="switch">
                            <input type="checkbox" ref={isAgent}/>
                            <span className="slider round"></span>
                            <span>{t("Agent login")}</span>
                        </label>
                    </div>
                </form>             
            </div>
        </div>
    );
}