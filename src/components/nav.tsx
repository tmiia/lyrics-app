import Spotlight from "./spotlight";

const Nav = () => {
    return (
        <nav className="fixed top-8 left-0 px-8 w-full z-50">
            <ul className="flex items-center justify-between w-full">
                <li><Spotlight /></li>
                <li className="text-sm text-zinc-700 font-maghfirea cursor-pointer"><a href="https://www.tiktok.com/@ici_miiadev" target="_blank">[@ici_miiadev]</a></li>
            </ul>
        </nav>
    )
}

export default Nav;