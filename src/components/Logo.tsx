import clsx from "clsx";

type Props = {
    className?: string;
};

const Logo = ({ className }: Props) => {
    return (
        <img
            className={clsx("w-32", className)}
            src="images/ttt-logo-c.png"
            alt=""
        />
    );
};

export default Logo;
