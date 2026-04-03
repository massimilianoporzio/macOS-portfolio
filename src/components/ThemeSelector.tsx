import { useState, useEffect, useRef } from 'react';
import { navIcons, themeOptions } from '#constants';

type Theme = 'light' | 'dark' | 'system';

const ThemeSelector = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as Theme;
            return saved || 'system';
        }
        return 'system';
    });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const applyTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        setIsOpen(false);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

        const updateTheme = () => {
            const isDark = theme === 'dark' || (theme === 'system' && systemDark.matches);
            
            const modifyDOM = () => {
                if (isDark) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            };

            modifyDOM();
        };

        updateTheme();

        systemDark.addEventListener('change', updateTheme);
        return () => systemDark.removeEventListener('change', updateTheme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const modeIcon = navIcons.find(icon => icon.id === 4)?.img || "/icons/mode.svg";

    return (
        <li className="relative flex items-center" ref={dropdownRef}>
            <img 
                src={modeIcon} 
                className="icon-hover size-6" 
                alt="theme-selector" 
                onClick={toggleDropdown}
            />
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 flex flex-col theme-selector-dropdown backdrop-blur-xl border rounded-lg py-1 z-50">
                    {themeOptions.map(({ id, name, icon, value }) => (
                        <button
                            key={id}
                            onClick={() => applyTheme(value)}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${theme === value ? 'active' : ''}`}
                        >
                            <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </li>
    );
};

export default ThemeSelector;
