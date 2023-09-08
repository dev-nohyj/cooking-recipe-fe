interface Props {
    color: string;
}

const HamburgerIcon = ({ color }: Props) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                // class="h-5 w-5 stroke-gray-500"
            >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
        </>
    );
};

export default HamburgerIcon;
