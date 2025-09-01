import Play from "@/components/game/Play";
import DefaultLayout from "@/layouts/default";

const PlayPage = () => {
    return (
        <DefaultLayout>
            <div className="flex justify-center items-center ">
                <Play />
            </div>
        </DefaultLayout>
    );
};

export default PlayPage;
