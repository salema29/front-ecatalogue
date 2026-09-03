import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
};

function MiniSpinner() {
    return (
        <ClipLoader
            color="#ffffff"
            loading={true}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default MiniSpinner;