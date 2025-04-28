import { useNavigate } from "react-router-dom";

const VueDetailArrow = ({direction, catalogId, prevNextVueDetail}) => {

    const navigate = useNavigate();
    
    const arrowIcon = {
        height: "10%",
        position: "absolute",
        top: "40%",
        width: "10%",
        fill: "#333",
        zIndex : 1,
        cursor: "pointer",
        ...(direction === "previous" ? { left: "2%" } : { right: "2%" })
    };

    const handleClick = () => {
        if(direction === "previous") {
            navigate(`/product/${catalogId}/${prevNextVueDetail.previous.viewOrder}/${prevNextVueDetail.previous.categoryId}/${prevNextVueDetail.previous.productResumeId}`);
        } else {
            navigate(`/product/${catalogId}/${prevNextVueDetail.next.viewOrder}/${prevNextVueDetail.next.categoryId}/${prevNextVueDetail.next.productResumeId}`);
        }
    }
    
    return (
        <>
            <svg style={arrowIcon} viewBox="0 0 100 100" onClick={handleClick}>
                <path
                    d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"
                    className="arrow"
                    transform={direction === "previous" ? "" : "translate(100, 100) rotate(180) "}
                ></path>
            </svg>
        </>
    );
};
export default VueDetailArrow;
