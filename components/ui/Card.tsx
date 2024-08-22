interface Props {
    item: {
        backgroundColor?: string;
        tagline?: string;
        title?: string;
        description?: string;
        image?: string;
        placement?: "left" | "right";
        button?: {
            id?: string;
            href: string;
            text: string;
        }[];
    };
    cardId: string;
    hidden: boolean;
    activate: () => void;
    tabIndex: number;
}


const Card = ({ item, cardId, hidden, activate, tabIndex }) => {
    const {title} = item;
    console.log(title)
    return (
        // <div id={cardId} hidden={hidden} onClick={activate} tabIndex={tabIndex} class="flex flex-col p-6 rounded-xl">
        //     {/* <figure class="pb-7">
        //         <img src={image} alt={image} />
        //     </figure>
        //     <h1 class="text-3xl md:text-5xl font-semibold text-white pb-7">{title}</h1>
        //     <p class="text-white pb-7">{description}</p>
        //     <div class="flex space-x-4">
        //         {button?.map((button) => (
        //             <button key={button.id} href={
        //                 button.href
        //             }>{button.text}</button>
        //         ))}
        //     </div> */}
        // </div>
        <></> 
    );
};

export default Card;