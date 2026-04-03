
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/it"; // Importiamo il locale italiano per sicurezza
import localizedFormat from "dayjs/plugin/localizedFormat";

import {navIcons, navLinks} from "#constants";
import ThemeSelector from "./ThemeSelector";

// Estendiamo dayjs con il plugin per i formati localizzati
dayjs.extend(localizedFormat);

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState(dayjs());

    useEffect(() => {
        // Impostiamo il locale in base alla lingua del browser al caricamento
        const browserLocale = navigator.language.split('-')[0];
        try {
            // Proviamo a caricare il locale dinamicamente (se disponibile)
            dayjs.locale(browserLocale);
        } catch (e) {
            dayjs.locale('it'); // Fallback su italiano
        }

        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Formattazione localizzata con Day.js
    // "ddd D MMM h:mm A" produce un risultato simile a Intl.DateTimeFormat
    const formattedTime = currentTime.format('ddd D MMM h:mm A');

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" className="icon-hover" />
                <p className="font-bold">Massimiliano's Portfolio</p>

                <ul>
                    {navLinks.map(({id,name}) => (
                        <li key={id}><p>
                            {name}
                        </p></li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.filter(icon => icon.id !== 4).map(({id,img}) => (
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={`icon-${id}`} />
                        </li>
                    ))}
                    <ThemeSelector />
                </ul>
                <time>{formattedTime}</time>
            </div>
        </nav>
    )
}
export default Navbar
