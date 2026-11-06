import StackedLogo from "../../assets/logo-stacked.svg?react";
import HorizontalLogo from "../../assets/logo-horizontal.svg?react";

type LogoProps = {
    variant?: "stacked" | "horizontal";
    className?: string;
};

const Logo = ({ variant = "stacked", className }: LogoProps) => {
    const LogoSvg = variant === "horizontal" ? HorizontalLogo : StackedLogo;

    return (
        <LogoSvg
            className={className}
            role="img"
            aria-label="Teknikhögskolan"
        />
    );
};

export default Logo;
