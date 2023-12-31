import './ModalConfirm.css'


interface Modalprops {
    setIsModalOpen: () => void;
    bets: number;
    handleConfirm: () => void;
}

function ModalConfirm(props: Modalprops) {
    const { setIsModalOpen, bets, handleConfirm } = props
   

    return (
        <div className="container-modal">
            <div className="content-modal">
                <span className='text-3xl'>
                    Confirm to bet {bets} TOKENS ?
                </span>
                <div className='flex gap-8'>
                    <button 
                        className='w-[258px] rounded-[19px] button-cancel'
                        onClick={()=>{setIsModalOpen()}}
                        >
                        CANCEL
                    </button>
                    <button
                        className="w-[258px] btn-degrade rounded-[19px] py-3 px-8"
                        onClick={() => {
                            handleConfirm();
                            setIsModalOpen();
                        }}
                    >CONFIRM</button>

                </div>
            </div>
        </div>
    )
}

export default ModalConfirm
