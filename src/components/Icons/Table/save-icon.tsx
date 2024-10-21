export const SaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
    style={{ filter: 'brightness(1.5=10)' }}
    >
    <path
        d="M2 2V18H18V6L12 2H2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <path
        d="M12 2V6H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <rect
        x="5"
        y="10"
        width="10"
        height="7"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <path
        d="M7 2H13V6H7V2Z"
        fill="currentColor"
    />
    </svg>
);