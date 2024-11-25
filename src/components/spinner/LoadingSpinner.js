import '../../assets/styles/LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="circle-container">
            <svg fill="none" className="circle-svg-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle className="circle" cx="50" cy="50" r="45" />
            </svg>
        </div>
    );
};
export default LoadingSpinner;
