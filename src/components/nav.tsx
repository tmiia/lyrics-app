import Spotlight from "./spotlight";

const Nav = () => {
    return (
        <nav className="fixed top-8 left-0 px-8 w-full z-50">
            <ul className="grid grid-cols-3 items-center justify-between w-full">
                <li></li>
                <li className="flex justify-center items-center text-xl text-zinc-700 font-maghfirea cursor-pointer self-center">Meryl Edition</li>
                <li className="flex justify-end items-center text-sm text-zinc-700 font-maghfirea cursor-pointer"><a href="https://www.tiktok.com/@ici_miiadev" target="_blank">[@ici_miiadev]</a></li>
            </ul>
        </nav>
    )
}

export default Nav;