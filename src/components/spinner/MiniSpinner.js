import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
};

function MiniSpinner() {
    let loading = true;
    let color = "#ffffff";

    return (
        <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default MiniSpinner;