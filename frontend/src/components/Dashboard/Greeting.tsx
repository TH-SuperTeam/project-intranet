interface GreetingProps {
    firstName: string;
    currentTime: Date;
}

const Greeting = ({ firstName, currentTime }: GreetingProps) => {
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
                {greeting}, {firstName}!
            </h1>
            <p>Här är din överblick för idag.</p>
        </div>
    );
};

export default Greeting;
