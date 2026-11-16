interface GreetingProps {
    firstName?: string;
    currentTime: Date;
    isPublic?: boolean;
}

const Greeting = ({
    firstName,
    currentTime,
    isPublic = false,
}: GreetingProps) => {
    const hour = currentTime.getHours();

    let greeting: string;

    if (hour >= 4 && hour < 11) {
        greeting = "God morgon";
    } else if (hour >= 11 && hour < 13) {
        greeting = "God dag";
    } else if (hour >= 13 && hour < 17) {
        greeting = "God eftermiddag";
    } else {
        greeting = "God kväll";
    }

    return (
        <div>
            <h1>
                {isPublic
                    ? `${greeting}, välkommen!`
                    : `${greeting}, ${firstName}!`}
            </h1>

            <p>
                {isPublic
                    ? "Här hittar du aktuell information om skolan."
                    : "Här är din överblick för idag."}
            </p>
        </div>
    );
};

export default Greeting;
