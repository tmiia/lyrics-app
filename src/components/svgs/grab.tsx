interface GrabSvgProps {
    className?: string
    color?: string
}

const GrabSvg = ({ className, color }: GrabSvgProps) => {
    return (
        <svg width="12" height="19" viewBox="0 0 12 19" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M5 2.5C5 3.88071 3.88071 5 2.5 5C1.11929 5 0 3.88071 0 2.5C0 1.11929 1.11929 0 2.5 0C3.88071 0 5 1.11929 5 2.5Z" fill={color}/>
            <path d="M5 9.5C5 10.8807 3.88071 12 2.5 12C1.11929 12 0 10.8807 0 9.5C0 8.11929 1.11929 7 2.5 7C3.88071 7 5 8.11929 5 9.5Z" fill={color}/>
            <path d="M5 16.5C5 17.8807 3.88071 19 2.5 19C1.11929 19 0 17.8807 0 16.5C0 15.1193 1.11929 14 2.5 14C3.88071 14 5 15.1193 5 16.5Z" fill={color}/>
            <path d="M12 2.5C12 3.88071 10.8807 5 9.5 5C8.11929 5 7 3.88071 7 2.5C7 1.11929 8.11929 0 9.5 0C10.8807 0 12 1.11929 12 2.5Z" fill={color}/>
            <path d="M12 9.5C12 10.8807 10.8807 12 9.5 12C8.11929 12 7 10.8807 7 9.5C7 8.11929 8.11929 7 9.5 7C10.8807 7 12 8.11929 12 9.5Z" fill={color}/>
            <path d="M12 16.5C12 17.8807 10.8807 19 9.5 19C8.11929 19 7 17.8807 7 16.5C7 15.1193 8.11929 14 9.5 14C10.8807 14 12 15.1193 12 16.5Z" fill={color}/>
        </svg>

    )
}

export default GrabSvg